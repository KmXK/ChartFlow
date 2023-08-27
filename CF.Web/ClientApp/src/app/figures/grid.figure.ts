import { Figure } from "./base/figure.interface";
import { DrawingContext } from "./base/drawing-context.model";

export class GridFigure implements Figure {
    private readonly gap = 20;

    draw({ renderingContext: context, canvasOffset, mousePos, canvasSize }: DrawingContext): void {
        context.strokeStyle = '#000000';
        context.fillStyle = '#000000';
        context.lineWidth = 0.2;

        for (let x = canvasOffset.x % this.gap; x < canvasSize.width; x += 20) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvasSize.height);
            context.stroke();
        }

        for (let y = canvasOffset.y % this.gap; y < canvasSize.height; y += 20) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvasSize.width, y);
            context.stroke();
        }
    }
}
