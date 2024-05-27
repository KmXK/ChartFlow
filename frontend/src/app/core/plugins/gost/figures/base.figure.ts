import { FigureSettings } from '@core/figure-settings';
import { strokeWidthSetting } from '@core/figure-settings/settings';
import { ControlPoint } from '@core/figures/control-points/control-point';
import { SizeControlPoint } from '@core/figures/control-points/size.control-point';
import { TextFigure } from '@core/figures/text-figures/text.figure';
import paper from 'paper';
import { AnchorControlPoint } from './control-points/anchor.control-point';
import {
    LineStartControlPoint,
    LineStartDirection
} from './control-points/line-start.control-point';

export class BaseGostFigure<
    TItem extends paper.Item = paper.Item
> extends TextFigure<TItem> {
    constructor(item: TItem) {
        super(item);

        item.strokeColor = new paper.Color('black');
        item.fillColor = new paper.Color('white');
    }

    protected override createControlPoints(): ControlPoint[] {
        const result = [
            new SizeControlPoint(this, [0, 0]),
            new SizeControlPoint(this, [1, 0]),
            new SizeControlPoint(this, [0, 1]),
            new SizeControlPoint(this, [1, 1])
        ];

        const addPair = (
            delta: paper.PointLike,
            direction: LineStartDirection
        ): void => {
            const vector = new paper.Point(1, 0).rotate(direction, [0, 0]);
            console.log(direction, vector);

            const anchor = new AnchorControlPoint(this, delta, vector);
            result.push(anchor);
            result.push(
                new LineStartControlPoint(this, delta, direction, anchor)
            );
        };

        addPair([0.5, 0], LineStartDirection.Top);
        addPair([1, 0.5], LineStartDirection.Right);
        addPair([0.5, 1], LineStartDirection.Bottom);
        addPair([0, 0.5], LineStartDirection.Left);

        return result;
    }

    public createSettings(): FigureSettings[] {
        return [
            ...super.createSettings(),
            strokeWidthSetting(this.baseItem.strokeWidth, value => {
                this.baseItem.strokeWidth = value;
            })
        ];
    }
}
