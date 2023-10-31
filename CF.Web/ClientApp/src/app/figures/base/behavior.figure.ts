import { Figure } from "./figure";
import { Point } from "../../shared/models/point.model";
import { Size } from "../../shared/models/size.model";
import { MouseEventContext } from "./contexts/mouse-event-context.model";

export abstract class BehaviorFigure extends Figure {
    private previousPoint: Point | null = null;

    protected constructor(
        protected topLeftPoint: Point,
        protected size: Size
    ) {
        super(topLeftPoint);
    }

    mouseDown(context: MouseEventContext) {
        this.previousPoint = context.mousePosition.global;
    }

    mouseUp(context: MouseEventContext) {
        this.previousPoint = null
    }

    mouseMove(context: MouseEventContext) {
        if (this.previousPoint) {
            const delta = context.mousePosition.global.subtract(this.previousPoint);
            this.previousPoint = context.mousePosition.global;
            this.topLeftPoint = this.topLeftPoint.add(delta);
            
            context.requireRedraw();
        }
    }

    mouseOut(context: MouseEventContext) {
    }

    containsPoint(position: Point): boolean {
        return position.x >= this.topLeftPoint.x
            && position.y >= this.topLeftPoint.y
            && position.x <= this.topLeftPoint.x + this.size.width
            && position.y <= this.topLeftPoint.y + this.size.height;
    }
}
