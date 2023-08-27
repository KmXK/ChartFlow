import { Size } from "../../shared/models/size.model";
import { Point } from "../../shared/models/point.model";
import { Figure } from "./figure.interface";

export class DrawingContext {
    constructor(
        public renderingContext: CanvasRenderingContext2D,
        public canvasSize: Size,
        public canvasOffset: Point,
        public mousePos: Point,
        public figures: Figure[]
    ) {
    }
}
