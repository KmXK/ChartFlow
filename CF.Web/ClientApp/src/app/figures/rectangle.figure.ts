import { Figure } from "./base/figure";
import { Point } from "../shared/models/point.model";
import { Size } from "../shared/models/size.model";
import { DrawingContext } from "./base/contexts/drawing-context.model";
import { MouseEventContext } from "./base/contexts/mouse-event-context.model";

export class RectangleFigure extends Figure {
    private color = 'white';

    zIndex = 0;

    constructor(
        private topLeftPoint: Point,
        private size: Size
    ) {
        super();
    }

    draw(context: DrawingContext): void {
        context.renderingContext.fillStyle = this.color;
        context.renderingContext.strokeStyle = 'black';
        context.renderingContext.lineWidth = 2;

        const topLeft = this.topLeftPoint.add(context.canvasOffset);

        context.renderingContext.beginPath();
        context.renderingContext.fillRect(
            topLeft.x,
            topLeft.y,
            this.size.width,
            this.size.height);
        context.renderingContext.strokeRect(
            topLeft.x,
            topLeft.y,
            this.size.width,
            this.size.height);

        context.renderingContext.closePath();
    }

    mouseDown(context: MouseEventContext) {
        this.color = 'yellow';
        context.requireRedraw();
    }

    mouseUp(context: MouseEventContext) {
        this.color = 'white';
        context.requireRedraw();
    }

    containsPoint(position: Point): boolean {
        return position.x >= this.topLeftPoint.x
            && position.y >= this.topLeftPoint.y
            && position.x <= this.topLeftPoint.x + this.size.width
            && position.y <= this.topLeftPoint.y + this.size.height;
    }

    clone(): Figure {
        return new RectangleFigure(this.topLeftPoint, this.size);
    }
}
