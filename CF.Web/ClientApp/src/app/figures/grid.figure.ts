import { Figure } from "./base/figure.interface";
import { DrawingContext } from "./base/drawing-context.model";

export class GridFigure implements Figure {
    private readonly gap = 20;

    draw({ renderingContext: context, canvasOffset, mousePos, canvasSize }: DrawingContext): void {
        context.strokeStyle = '#000000';
        context.fillStyle = '#000000';
        context.lineWidth = 0.2;

        mousePos = mousePos.subtract(canvasOffset);

        context.save();
        context.strokeStyle = 'red';
        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(0, mousePos.y);
        context.lineTo(canvasSize.width, mousePos.y);

        context.moveTo(mousePos.x, 0);
        context.lineTo(mousePos.x, canvasSize.height);
        context.stroke();
        context.restore();

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
