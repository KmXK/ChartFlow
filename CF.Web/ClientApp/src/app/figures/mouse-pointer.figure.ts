import { Figure } from "./base/figure.interface";
import { DrawingContext } from "./base/drawing-context.model";

export class MousePointerFigure implements Figure {
    zIndex = Number.MAX_VALUE;

    draw({ renderingContext: context, mousePos, canvasSize, canvasOffset }: DrawingContext): void {
        mousePos = mousePos.add(canvasOffset);
        context.strokeStyle = 'black';
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(0, mousePos.y);
        context.lineTo(canvasSize.width, mousePos.y);

        context.moveTo(mousePos.x, 0);
        context.lineTo(mousePos.x, canvasSize.height);
        context.stroke();
    }

    clone(): Figure {
        return new MousePointerFigure();
    }
}
