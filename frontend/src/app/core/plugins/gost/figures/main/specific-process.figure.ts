import * as paper from 'paper';
import { BaseGostFigure } from '../base.figure';

export class SpecificProcessFigure extends BaseGostFigure<paper.Group> {
    constructor() {
        const rect = new paper.Path.Rectangle([0, 0], [100, 100]);
        rect.fillColor = new paper.Color('white');
        rect.strokeColor = new paper.Color('black');

        const line1 = new paper.Path.Line([10, 0], [10, 100]);
        const line2 = new paper.Path.Line([90, 0], [90, 100]);

        const group = new paper.Group([rect, line1, line2]);

        super(group);
    }
}
