import { Figure } from '@core/figures/base/figure';
import paper from 'paper';

export class LineFigure extends Figure<paper.Path> {
    private readonly points = {
        start: new paper.Point(0, 0),
        end: new paper.Point(0, 0)
    };

    private readonly startVector: paper.Point;
    private endVector?: paper.Point;

    public readonly transparent = true;

    constructor(_startVector: paper.PointLike, _endVector?: paper.PointLike) {
        const line = new paper.Path();

        line.strokeColor = new paper.Color('black');
        line.strokeWidth = 1;

        super(line);

        this.startVector = new paper.Point(_startVector).multiply(20);

        if (_endVector) {
            this.endVector = new paper.Point(_endVector).multiply(20);
        }
    }

    public setStartTo(point: paper.PointLike): void {
        this.points.start = new paper.Point(point);
        this.redraw();
    }

    public setEndTo(point: paper.PointLike, vector?: paper.PointLike): void {
        this.points.end = new paper.Point(point);

        if (vector) {
            this.endVector = new paper.Point(vector).multiply(20);
        } else {
            this.endVector = undefined;
        }

        this.redraw();
    }

    private redraw(): void {
        console.log(this.endVector);

        let offsetEnd = this.points.end;
        if (this.endVector) offsetEnd = offsetEnd.add(this.endVector);

        const offsetStart = this.points.start.add(this.startVector);

        this.item.removeSegments();

        this.item.moveTo(this.points.start);
        this.item.lineBy(this.startVector);

        this.item.lineTo([offsetEnd.x, offsetStart.y]);

        this.item.lineTo(offsetEnd);

        if (this.endVector) {
            this.item.lineTo(this.points.end);
        }
    }
}
