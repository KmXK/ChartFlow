import { DrawingContext } from "./contexts/drawing-context.model";
import { MouseEventContext } from "./contexts/mouse-event-context.model";
import { Point } from "../../shared/models/point.model";

export abstract class Figure {
    figures: Figure[] = [];

    zIndex: number = 0;

    constructor(
        public position: Point | null = null            // anchor
    ) {
    }

    draw(context: DrawingContext): void {
    }

    mouseDown(context: MouseEventContext) {
    }

    mouseUp(context: MouseEventContext) {
    }

    mouseMove(context: MouseEventContext) {
    }

    mouseOut(context: MouseEventContext) {
    }

    containsPoint(position: Point): boolean {
        return false;
    }

    clone(): Figure {
        return JSON.parse(JSON.stringify(this));
    }
}
