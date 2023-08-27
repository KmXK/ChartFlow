import { DrawingContext } from "./drawing-context.model";

export interface Figure {
    zIndex: number;

    draw(context: DrawingContext): void;

    clone(): Figure;
}
