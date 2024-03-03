import paper from 'paper';
import { Figure } from './base/figure';

export type SquareFigureOptions = {
    leftTopCornerPosition: paper.PointLike;
    size: paper.SizeLike;
};

export class SquareFigure implements Figure {
    private readonly rect: paper.Path.Rectangle;

    constructor(options: SquareFigureOptions) {
        const rect = new paper.Path.Rectangle(
            options.leftTopCornerPosition,
            options.size
        );
        rect.strokeColor = new paper.Color(0, 1);
        rect.fillColor = new paper.Color('red');
        this.rect = rect;
    }

    public getItem(): paper.Item {
        return this.rect;
    }
}
