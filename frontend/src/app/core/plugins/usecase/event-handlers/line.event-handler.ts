import { inject } from '@core/di';
import { EventHandler } from '@core/project/event-handlers';
import { EventHandlerOptions } from '@core/project/event-handlers/event-handler';
import {
    MouseButton,
    MouseEvent
} from '@core/project/shared/events/mouse.event';
import { LineController } from '../controllers/line.controller';
import { BaseUseCaseFigure } from '../figures/base.figure';
import { LineControlPoint } from '../figures/control-points/line.control-point';

export class LineEventHandler extends EventHandler {
    private readonly lineController = inject(LineController);

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (
            event.button === MouseButton.Left &&
            options.plainFigures.length > 0 &&
            options.plainFigures[0] instanceof LineControlPoint
        ) {
            const point = options.plainFigures[0] as LineControlPoint;

            this.lineController.startLinePreview(point);
        }
    }

    public onDrag(event: MouseEvent, options: EventHandlerOptions): void {
        if (
            options.plainFigures.length > 0 &&
            options.plainFigures[0] instanceof BaseUseCaseFigure
        ) {
            const figure = options.plainFigures[0] as BaseUseCaseFigure;
            this.lineController.moveLinePreview(event.point, figure);
        } else {
            this.lineController.moveLinePreview(event.point);
        }
    }

    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        this.lineController.stopLinePreview();
    }
}
