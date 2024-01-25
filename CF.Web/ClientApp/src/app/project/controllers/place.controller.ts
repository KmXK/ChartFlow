import { SquareFigure } from '../../figures/square.figure';
import { FrameEvent } from '../../shared/events/frame.event';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';

export class PlaceController implements Controller {
    constructor(private readonly injector: Injector) {}

    init() {}

    onFrame(event: FrameEvent) {}

    public placeSquare(position: paper.PointLike, size: paper.SizeLike): void {
        this.injector.project.activeLayer.addChild(
            new SquareFigure({
                size: size,
                leftTopCornerPosition: position
            }).getItem()
        );
    }
}
