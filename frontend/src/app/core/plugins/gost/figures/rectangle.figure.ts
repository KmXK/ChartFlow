import * as paper from 'paper';
import { ControlPoint } from '../../../figures/control-points/control-point';
import { SizeControlPoint } from '../../../figures/control-points/size.control-point';
import { TextFigure } from '../../../figures/text-figures/text.figure';

export class RectangleFigure extends TextFigure<paper.Path.Rectangle> {
    constructor() {
        const rect = new paper.Path.Rectangle([0, 0], [1, 1]);
        rect.fillColor = new paper.Color('red');

        super(rect);
    }

    protected override createControlPoints(): ControlPoint[] {
        return [
            new SizeControlPoint(this, [0, 0]),
            new SizeControlPoint(this, [1, 0]),
            new SizeControlPoint(this, [0, 1]),
            new SizeControlPoint(this, [1, 1])
        ];
    }
}
