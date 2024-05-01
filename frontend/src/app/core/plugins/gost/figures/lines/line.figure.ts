import { Figure } from '@core/figures/base/figure';
import paper from 'paper';

export class LineFigure extends Figure<paper.Path> {
    constructor() {
        const line = new paper.Path();
        line.moveTo([0, 0]);
        line.lineBy([0, 0]);

        line.strokeColor = new paper.Color('black');
        line.strokeWidth = 1;

        super(line);

        this.transparent = true;
    }

    public setStartTo(point: paper.PointLike): void {
        this.item.segments[0].point = new paper.Point(point);
    }

    public setEndTo(point: paper.PointLike): void {
        this.item.segments[1].point = new paper.Point(point);
    }
}
