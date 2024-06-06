import * as paper from 'paper';
import { BaseGostFigure } from '../base.figure';

export class LoopStartFigure extends BaseGostFigure<paper.Path.Rectangle> {
    constructor() {
        const item = new paper.Path();

        item.moveTo([20, 0]);
        item.lineBy([40, 0]);
        item.lineBy([20, 30]);
        item.lineBy([0, 50]);
        item.lineBy([-80, 0]);
        item.lineBy([0, -50]);
        item.lineBy([20, -30]);
        item.closePath();

        super(item);
    }
}
