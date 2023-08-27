import { Inject, Injectable } from '@angular/core';
import { Vector } from "../shared/models/vector.model";
import { Point } from "../shared/models/point.model";
import { Size } from "../shared/models/size.model";
import { BehaviorSubject, combineLatest } from "rxjs";
import { Figure } from "../figures/base/figure.interface";
import { GridFigure } from "../figures/grid.figure";
import { DrawingContext } from "../figures/base/drawing-context.model";
import { WINDOW } from "../tokens/window.token";
import { MousePointerFigure } from "../figures/mouse-pointer.figure";

@Injectable()
export class CanvasService {
    public readonly scrollSensitivity = 12;
    public context: CanvasRenderingContext2D | null = null;

    private offset = new Point(0, 0);

    private size = new BehaviorSubject(new Size(0, 0));
    private mousePos = new BehaviorSubject(new Point(0, 0));
    private currentOffset = new BehaviorSubject(new Point(0, 0));
    private interval = -1;

    private figures: Figure[] = [
        new GridFigure(),
        new MousePointerFigure()
    ];

    constructor(@Inject(WINDOW) private window: Window) {
        combineLatest([
            this.size,
            this.mousePos,
            this.currentOffset
        ])
            .subscribe(([size, mousePos, currentOffset]) => {
                window.requestAnimationFrame(() => this.draw(size, mousePos, currentOffset));
            });
    }

    public setSize(size: Size) {
        this.size.next(new Size(size.width, size.height));
    }

    public moveMouse(x: number, y: number) {
        this.mousePos.next(new Point(x, y).subtract(this.currentOffset.value));
    }

    public changeOffset(dx: number, dy: number) {
        if (this.interval !== -1) this.window.clearInterval(this.interval);

        this.offset.x -= dx;
        this.offset.y -= dy;

        if (new Vector(this.currentOffset.value, this.offset).length < this.scrollSensitivity) {
            this.currentOffset.next(this.offset);
            return;
        }

        const calculateOffset = () => {
            const currentOffset = this.currentOffset.value;

            if (this.offset.x === currentOffset.x &&
                this.offset.y === currentOffset.y &&
                this.interval > 0) {
                clearInterval(this.interval);
                this.interval = -1;
                return;
            }

            const movementVector = new Vector(currentOffset, this.offset);

            const direction = movementVector.normalize();

            const distance = movementVector.length < 1
                ? movementVector.length
                : movementVector.length / this.scrollSensitivity * 4;

            this.currentOffset.next(currentOffset.translate(direction.multiply(distance)));
        };

        calculateOffset();
        if (this.interval > 0) {
            this.interval = this.window.setInterval(calculateOffset, 10);
        }
    }

    public draw(size: Size, mousePos: Point, currentOffset: Point) {
        if (!this.context) {
            return;
        }

        // TODO: Current logic calls little offset for grid while resizing window
        this.context.canvas.width = size.width;
        this.context.canvas.height = size.height;

        this.context.clearRect(0, 0, size.width, size.height);

        const context = new DrawingContext(
            this.context,
            size,
            currentOffset,
            mousePos
        );

        this.figures.forEach(figure => {
            this.context!.save();
            figure.draw(context);
            this.context!.restore();
        });
    }
}
