import { Point } from "../../../shared/models/point.model";
import { Size } from "../../../shared/models/size.model";
import { CanvasMousePosition } from "../../../canvas/models/canvas-mouse-position.model";
import { CanvasService } from "../../../canvas/services/canvas.service";

export class MouseEventContext {
    constructor(
        public canvasService: CanvasService,
        public renderingContext: CanvasRenderingContext2D,
        public canvasSize: Size,
        public canvasOffset: Point,
        public mousePosition: CanvasMousePosition,
        public requireRedraw: () => void
    ) {
    }
}
