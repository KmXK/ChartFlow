import { Figure } from '@core/figures/base/figure';
import paper from 'paper';

export class LineFigure extends Figure<paper.Path> {
    private readonly points = {
        start: new paper.Point(0, 0),
        end: new paper.Point(0, 0)
    };

    public readonly transparent = true;

    constructor() {
        const line = new paper.Path();

        line.strokeColor = new paper.Color('black');
        line.strokeWidth = 1;

        super(line);
    }

    public setStartTo(point: paper.PointLike): void {
        this.points.start = new paper.Point(point);
        this.redraw();
    }

    public setEndTo(point: paper.PointLike, vector?: paper.PointLike): void {
        this.points.end = new paper.Point(point);

        this.redraw();
    }

    private redraw(): void {
        this.item.removeSegments();

        this.item.moveTo(this.points.start);

        this.item.lineTo(this.points.end);
    }
}
