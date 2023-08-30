import { Vector } from "./vector.model";

export class Point {
    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    add(delta: Point): Point {
        return new Point(this.x + delta.x, this.y + delta.y);
    }

    subtract(delta: Point): Point {
        return new Point(this.x - delta.x, this.y - delta.y);
    }

    translate(vector: Vector): Point {
        const dx = vector.to.x - vector.from.x;
        const dy = vector.to.y - vector.from.y;
        return new Point(this.x + dx, this.y + dy);
    }

    toString() {
        return `X: ${this.x} | Y: ${this.y}`;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }
}
