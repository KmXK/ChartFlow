import * as paper from 'paper';
import { BaseGostFigure } from '../base.figure';

export class ProcessFigure extends BaseGostFigure<paper.Path.Rectangle> {
    constructor() {
        const rect = new paper.Path.Rectangle([0, 0], [1, 1]);
        rect.fillColor = new paper.Color('white');
        rect.strokeColor = new paper.Color('black');

        super(rect);
    }
}
