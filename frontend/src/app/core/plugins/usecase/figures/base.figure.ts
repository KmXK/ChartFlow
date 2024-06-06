import { FigureSettings } from '@core/figure-settings';
import { strokeWidthSetting } from '@core/figure-settings/settings';
import { ControlPoint } from '@core/figures/control-points/control-point';
import { SizeControlPoint } from '@core/figures/control-points/size.control-point';
import { TextFigure } from '@core/figures/text-figures/text.figure';
import paper from 'paper';
import { LineControlPoint } from './control-points/line.control-point';

export class BaseUseCaseFigure<
    TItem extends paper.Item = paper.Item
> extends TextFigure<TItem> {
    constructor(item: TItem) {
        super(item);

        item.strokeColor = new paper.Color('black');
        item.fillColor = new paper.Color('white');
    }

    public createSettings(): FigureSettings[] {
        return [
            ...super.createSettings(),
            strokeWidthSetting(this.baseItem.strokeWidth, value => {
                this.baseItem.strokeWidth = value;
            })
        ];
    }

    protected override createControlPoints(): ControlPoint[] {
        const result = [
            new SizeControlPoint(this, [0, 0]),
            new SizeControlPoint(this, [1, 0]),
            new SizeControlPoint(this, [0, 1]),
            new SizeControlPoint(this, [1, 1]),
            new LineControlPoint(this, [0.5, 0.5])
        ];

        return result;
    }
}
