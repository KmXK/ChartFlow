import * as paper from 'paper';
import { BaseUseCaseFigure } from '../base.figure';

export class ActorFigure extends BaseUseCaseFigure<paper.Group> {
    constructor() {
        const item = new paper.Group();

        item.addChildren([
            new paper.Path.Circle([10, 10], 10),
            new paper.Path.Line([10, 20], [10, 50]),
            new paper.Path.Line([-10, 30], [30, 30]),
            new paper.Path.Line([-10, 80], [10, 50]),
            new paper.Path.Line([30, 80], [10, 50])
        ]);

        super(item);

        item.scale(1.7);
    }

    protected setSizeImpl(size: paper.SizeLike): void {
        super.setSizeImpl(size);

        this._text.bounds.top = this.item.bounds.bottom;
    }
}
