import { Figure } from "./base/figure";
import { Point } from "../shared/models/point.model";
import { Vector } from "../shared/models/vector.model";
import { DrawingContext } from "./base/contexts/drawing-context.model";
import { MouseEventContext } from "./base/contexts/mouse-event-context.model";

export class BasePointFigure extends Figure {
    isHovered = false;

    constructor(
        public position: Point
    ) {
        super(position);
    }

    draw({ renderingContext: context }: DrawingContext): void {
        context.fillStyle = this.isHovered ? 'yellow' : 'white';
        context.strokeStyle = 'black';
        context.lineWidth = 1;

        context.beginPath();

        context.ellipse(
            this.position.x,
            this.position.y,
            5,
            5,
            0,
            0,
            Math.PI * 2
        );

        context.fill();
        context.stroke();

        if (this.isHovered) {
            context.strokeStyle = 'transparent';
            context.fillStyle = 'rgba(0,255,0,0.36)'

            context.ellipse(
                this.position.x,
                this.position.y,
                15,
                15,
                0,
                0,
                Math.PI * 2
            );

            context.fill();
            context.stroke();
        }
    }

    mouseMove(context: MouseEventContext) {
        this.isHovered = true;
        context.requireRedraw();
    }

    mouseOut(context: MouseEventContext) {
        this.isHovered = false;
        context.requireRedraw();
    }

    containsPoint(position: Point): boolean {
        console.log(new Vector(position, this.position).from);
        return new Vector(position, this.position).length < 15;
    }
}
