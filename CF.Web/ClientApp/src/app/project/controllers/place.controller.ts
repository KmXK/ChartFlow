import * as paper from 'paper';
import { SquareFigure } from '../../figures/square.figure';
import { Controller, ControllerOptions } from './controller.interface';

export class PlaceController implements Controller {
    constructor(private readonly project: paper.Project) {
    }

    onClick(event: paper.MouseEvent, options: ControllerOptions) {
        this.project.activeLayer.addChild(new SquareFigure({
            size: [50, 50],
            leftTopCornerPosition: event.point.subtract(25)
        }).getItem());
    }
}
