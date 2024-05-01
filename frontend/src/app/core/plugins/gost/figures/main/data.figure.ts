import * as paper from 'paper';
import { BaseGostFigure } from '../base.figure';

export class DataFigure extends BaseGostFigure<paper.Path.Rectangle> {
    constructor() {
        const item = new paper.Path();

        item.moveTo([20, 0]);
        item.lineBy([100, 0]);
        item.lineBy([-40, 100]);
        item.lineBy([-100, 0]);
        item.closePath();

        super(item);
    }
}
