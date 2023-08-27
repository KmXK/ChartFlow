import { Size } from "../../shared/models/size.model";
import { Point } from "../../shared/models/point.model";

export class DrawingContext {
    constructor(
        public renderingContext: CanvasRenderingContext2D,
        public canvasSize: Size,
        public canvasOffset: Point,
        public mousePos: Point
    ) {
    }
}
