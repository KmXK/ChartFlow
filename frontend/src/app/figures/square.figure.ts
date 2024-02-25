import * as paper from 'paper';
import { FigureEventHandlerRegistrationController } from '../project/controllers/figure-event-handler-registration.controller';
import { MoveEventHandler } from '../project/event-handlers/figure-event-handlers/move.event-handler';
import { Injector } from '../project/injector/injector';
import { Figure } from './base/figure';

export type SquareFigureOptions = {
    leftTopCornerPosition: paper.PointLike;
    size: paper.SizeLike;
};

export class SquareFigure implements Figure {
    private readonly rect: paper.Path.Rectangle;

    constructor(
        options: SquareFigureOptions,
        private readonly injector: Injector
    ) {
        const rect = new paper.Path.Rectangle(
            options.leftTopCornerPosition,
            options.size
        );
        rect.strokeColor = new paper.Color(0, 1);
        rect.fillColor = new paper.Color('red');
        this.rect = rect;

        rect.onFrame = this.onFrame.bind(this);

        this.injector
            .getController(FigureEventHandlerRegistrationController)
            .registerEventHandlersFor(this, MoveEventHandler);
    }

    public getItem(): paper.Item {
        return this.rect;
    }

    private onFrame(): void {
        this.rect.rotate(1);
        this.rect.fillColor!.hue += 1;
    }
}
