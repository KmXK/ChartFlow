import * as paper from 'paper';
import { BaseUseCaseFigure } from '../base.figure';

export class ActionFigure extends BaseUseCaseFigure<paper.Item> {
    constructor() {
        const item = new paper.Path.Ellipse([0, 0, 120, 70]);
        super(item);
    }
}
