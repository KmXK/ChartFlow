import { ControlPoint } from '@core/figures/control-points/control-point';
import { SizeControlPoint } from '@core/figures/control-points/size.control-point';
import { TextFigure } from '@core/figures/text-figures/text.figure';
import paper from 'paper';
import { LineStartControlPoint } from './control-points/line-start.control-point';

export class BaseGostFigure<
    TItem extends paper.Item
> extends TextFigure<TItem> {
    constructor(item: TItem) {
        super(item);

        item.strokeColor = new paper.Color('black');
        item.fillColor = new paper.Color('white');
    }

    protected override createControlPoints(): ControlPoint[] {
        return [
            new SizeControlPoint(this, [0, 0]),
            new SizeControlPoint(this, [1, 0]),
            new SizeControlPoint(this, [0, 1]),
            new SizeControlPoint(this, [1, 1]),
            new LineStartControlPoint(this, [0.5, 0.5])
        ];
    }
}
