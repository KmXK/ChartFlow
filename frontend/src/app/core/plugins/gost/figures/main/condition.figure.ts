import * as paper from 'paper';
import { BaseGostFigure } from '../base.figure';

export class ConditionFigure extends BaseGostFigure<paper.Path> {
    constructor() {
        const item = new paper.Path();

        item.moveTo([0, 50]);
        item.lineBy([50, 50]);
        item.lineBy([-50, 50]);
        item.lineBy([-50, -50]);
        item.closePath();

        super(item);
    }
}
