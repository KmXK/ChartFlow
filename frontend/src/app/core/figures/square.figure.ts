import paper from 'paper';
import { Figure } from './base/figure';
import { ControlPoint } from './control-points/control-point';
import { SizeControlPoint } from './control-points/size.control-point';

export type SquareFigureOptions = {
    leftTopCornerPosition: paper.PointLike;
    size: paper.SizeLike;
};

let a = 0;

export class SquareFigure extends Figure<paper.Path.Rectangle> {
    constructor(private readonly options: SquareFigureOptions) {
        const rect = new paper.Path.Rectangle(
            options.leftTopCornerPosition,
            options.size
        );
        rect.strokeColor = new paper.Color(0, 1);
        rect.fillColor = new paper.Color(a++ % 3 > 0 ? 'white' : 'red');

        super(rect);
    }

    public createControlPoints(): ControlPoint[] {
        const size = new paper.Size(this.options.size);
        return [
            new SizeControlPoint(this, [0, 0]),
            new SizeControlPoint(this, [1, 0]),
            new SizeControlPoint(this, [0, 1]),
            new SizeControlPoint(this, [1, 1])
        ];
    }
}
