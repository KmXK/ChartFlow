import { DrawingContext } from "./drawing-context.model";

export interface Figure {
    draw(context: DrawingContext): void;

    clone(): Figure;
}
