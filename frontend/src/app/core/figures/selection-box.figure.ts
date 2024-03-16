import paper from 'paper';
import { Figure } from './base/figure';

export class SelectionBoxFigure extends Figure<paper.Path.Rectangle> {
    private readonly startPoint: paper.Point;

    constructor(startPoint: paper.PointLike) {
        const rect = new paper.Path.Rectangle(startPoint, [1, 1]);
        rect.fillColor = new paper.Color(0, 0, 1, 0.5);

        super(rect);

        this.startPoint = new paper.Point(startPoint);
    }

    public selectTo(point: paper.PointLike): void {
        const p = new paper.Point(point);

        const x_from = Math.min(p.x, this.startPoint.x);
        const x_to = Math.max(p.x, this.startPoint.x);
        const y_from = Math.min(p.y, this.startPoint.y);
        const y_to = Math.max(p.y, this.startPoint.y);

        const width = x_to - x_from;
        const height = y_to - y_from;

        // TODO: после присваивания ширине значения 0 paperjs перестаёт работать 0_0
        if (width === 0 || height === 0) {
            this.item.visible = false;
        } else {
            this.item.visible = true;
            this.item.bounds.topLeft = new paper.Point(x_from, y_from);
            this.item.bounds.width = x_to - x_from;
            this.item.bounds.height = y_to - y_from;
        }
    }
}
