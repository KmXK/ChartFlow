import { Point } from "../shared/models/point.model";
import { Size } from "../shared/models/size.model";
import { DrawingContext } from "./base/contexts/drawing-context.model";
import { MouseEventContext } from "./base/contexts/mouse-event-context.model";
import { BehaviorFigure } from "./base/behavior.figure";

export class RectangleFigure extends BehaviorFigure {
    private color = 'white';

    constructor(
        topLeftPoint: Point,
        size: Size
    ) {
        super(topLeftPoint, size);
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
        super.mouseDown(context);

        this.color = 'yellow';
        context.requireRedraw();
    }

    mouseUp(context: MouseEventContext) {
        super.mouseUp(context);

        this.color = 'white';
        context.requireRedraw();
    }

    mouseMove(context: MouseEventContext) {
        super.mouseMove(context);

        if (this.color !== 'white') {
            return;
        }

        this.color = 'red';
        context.requireRedraw();
    }

    mouseOut(context: MouseEventContext) {
        super.mouseOut(context);

        this.color = 'white';
        context.requireRedraw();
    }
}
