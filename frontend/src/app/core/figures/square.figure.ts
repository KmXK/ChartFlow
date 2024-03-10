import paper from 'paper';
import { Figure } from './base/figure';

export type SquareFigureOptions = {
    leftTopCornerPosition: paper.PointLike;
    size: paper.SizeLike;
};

let a = 0;

export class SquareFigure extends Figure<paper.Path.Rectangle> {
    constructor(options: SquareFigureOptions) {
        const rect = new paper.Path.Rectangle(
            options.leftTopCornerPosition,
            options.size
        );
        rect.strokeColor = new paper.Color(0, 1);
        rect.fillColor = new paper.Color(a++ % 3 > 0 ? 'white' : 'red');

        super(rect);
    }
}
