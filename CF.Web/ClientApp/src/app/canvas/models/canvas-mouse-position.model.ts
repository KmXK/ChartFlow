import { Point } from "../../shared/models/point.model";

export class CanvasMousePosition {
    constructor(
        public local: Point,
        public global: Point
    ) {
    }
}
