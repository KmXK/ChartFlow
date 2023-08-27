import { Figure } from "./base/figure.interface";
import { DrawingContext } from "./base/drawing-context.model";
import { Point } from "../shared/models/point.model";
import { Size } from "../shared/models/size.model";

export class RectangleFigure implements Figure {

    zIndex = 0;

    constructor(
        private topLeftPoint: Point,
        private size: Size
    ) {
    }

    draw(context: DrawingContext): void {
        context.renderingContext.fillStyle = 'white';
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

    clone(): Figure {
        return new RectangleFigure(this.topLeftPoint, this.size);
    }
}
