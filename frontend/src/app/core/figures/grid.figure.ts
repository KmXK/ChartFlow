import paper from 'paper';
import { Figure } from './base/figure';

export class GridFigure extends Figure<paper.Group> {
    public readonly transparent = true;

    constructor() {
        const group = new paper.Group();

        super(group);

        this.makeLines(new paper.Point(0, 0), new paper.Point(1000, 1000), 10);
    }

    public redraw(topLeft: paper.Point, zoom: number, size: paper.Size): void {
        this.makeLines(topLeft, topLeft.add(size.divide(zoom)), 10);
        this.item.strokeWidth = 0.5 / zoom;
    }

    private makeLines(
        start: paper.Point,
        end: paper.Point,
        step: number
    ): void {
        const strokeWidth = this.item.strokeWidth;

        // TODO: Dont remove lines but move them
        this.item.removeChildren();

        const startX = Math.floor(start.x / step) * step;
        const startY = Math.floor(start.y / step) * step;
        const endX = Math.ceil(end.x / step) * step;
        const endY = Math.ceil(end.y / step) * step;

        for (let x = startX; x <= endX; x += step) {
            const line = new paper.Path();
            line.moveTo([x, start.y]);
            line.lineTo([x, end.y]);

            this.item.addChild(line);
        }

        for (let y = startY; y <= endY; y += step) {
            const line = new paper.Path();
            line.moveTo([start.x, y]);
            line.lineTo([end.x, y]);

            this.item.addChild(line);
        }

        this.item.strokeColor = new paper.Color('#808080');
        this.item.strokeWidth = strokeWidth;
    }

    public updateZoom(zoom: number): void {}
}
