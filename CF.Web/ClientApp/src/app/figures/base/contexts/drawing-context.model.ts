import { Size } from "../../../shared/models/size.model";
import { Point } from "../../../shared/models/point.model";
import { Figure } from "../figure";

export class DrawingContext {
    constructor(
        public renderingContext: CanvasRenderingContext2D,
        public canvasSize: Size,
        public canvasOffset: Point,
        public mousePos: Point,
        public figures: Figure[],
        private baseFigure: Figure | null
    ) {
    }

    public getGlobalPoint(point: Point): Point {
        if (this.baseFigure?.position) {
            return point.add(this.baseFigure.position);
        } else {
            return point;
        }
    }
}
