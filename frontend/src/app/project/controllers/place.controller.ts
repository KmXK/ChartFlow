import { SquareFigure } from '../../figures/square.figure';
import { FrameEvent } from '../../shared/events/frame.event';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';
import { SelectionController } from './selection.controller';

export class PlaceController implements Controller {
    private selectionController!: SelectionController;

    constructor(private readonly injector: Injector) {}

    public init(): void {
        this.selectionController =
            this.injector.getController(SelectionController);
    }

    public onFrame(event: FrameEvent): void {}

    public placeSquare(position: paper.PointLike, size: paper.SizeLike): void {
        const figure = new SquareFigure(
            {
                size: size,
                leftTopCornerPosition: position
            },
            this.injector
        );

        this.injector.project.activeLayer.addChild(figure.getItem());
        this.selectionController.selectFigure(figure);
    }
}
