import { Injectable } from '@angular/core';
import { Vector } from "../shared/vector.model";
import { Point } from "../shared/point.model";
import { Size } from "../shared/size.model";
import { ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CanvasService {
    public readonly scrollSensitivity = 12;
    public context: CanvasRenderingContext2D | null = null;

    private size = new Size(0, 0);
    private sizeChanged = new ReplaySubject<Size>(1);
    private offsetChanged = new ReplaySubject<Point>(1);
    private mouseMoved = new ReplaySubject<Point>(1);

    private offset = new Point(0, 0);
    private currentOffset = new Point(0, 0);
    private interval = -1;

    public offsetChanged$ = this.offsetChanged.asObservable();
    public sizeChanged$ = this.sizeChanged.asObservable();
    public mouseMoved$ = this.mouseMoved.asObservable();

    constructor() {
        this.sizeChanged.next(this.size);
        this.offsetChanged.next(this.offset);
    }

    public setSize(size: Size) {
        this.size = { width: size.width, height: size.height };
        this.sizeChanged.next(this.size);
    }

    public moveMouse(x: number, y: number) {
        this.mouseMoved.next(new Point(x, y).add(this.currentOffset));
    }

    public move(dx: number, dy: number) {
        if (this.interval !== -1) clearInterval(this.interval);

        this.offset.x -= dx;
        this.offset.y -= dy;

        this.interval = setInterval(() => {
            if (this.offset.x === this.currentOffset.x && this.offset.y === this.currentOffset.y) {
                clearInterval(this.interval);
                this.interval = -1;
                return;
            }

            const movementVector = new Vector(this.currentOffset, this.offset);

            const direction = movementVector.normalize();

            const distance = movementVector.length < 1
                ? movementVector.length
                : movementVector.length / this.scrollSensitivity * 4;

            this.currentOffset = this.currentOffset.translate(direction.multiply(distance));

            this.offsetChanged.next(this.currentOffset);
        }, 10);
    }

    public draw(func: (context: CanvasRenderingContext2D) => void) {
        if (this.context) {
            func(this.context);
        }
    }
}
