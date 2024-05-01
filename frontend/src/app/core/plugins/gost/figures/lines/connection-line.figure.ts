import { Figure } from '@core/figures/base/figure';
import paper from 'paper';

export class ConnectionLineFigure extends Figure<paper.Path> {
    constructor(private readonly _figures: [Figure, Figure]) {
        const line = new paper.Path();
        line.moveTo([0, 0]);
        line.lineBy([0, 0]);

        line.strokeColor = new paper.Color('black');
        line.strokeWidth = 1;

        super(line);
    }

    public update(): void {
        this.item.bringToFront();
        this.item.segments[0].point = this._figures[0].item.position;
        this.item.segments[1].point = this._figures[1].item.position;
    }

    get figures(): [Figure, Figure] {
        return [...this._figures];
    }
}
