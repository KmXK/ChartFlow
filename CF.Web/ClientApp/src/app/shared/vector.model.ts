import { Point } from "./point.model";

export class Vector {
    from: Point;
    to: Point;

    constructor(from: Point, to: Point) {
        this.from = from.clone();
        this.to = to.clone()
    }

    add(delta: Point): Vector {
        const vector = this.clone();
        vector.from = vector.from.add(delta);
        vector.to = vector.to.add(delta);

        return vector;
    }

    multiply(value: number): Vector {
        const vector = this.clone();
        const dx = this.to.x - this.from.x;
        const dy = this.to.y - this.from.y;

        vector.to = vector.from.add(new Point(dx * value, dy * value));
        return vector;
    }

    reverse(): Vector {
        return this.multiply(-1);
    }

    normalize(): Vector {
        if (this.length === 0) {
            throw new Error('Vector has 0 length');
        }

        return this.multiply(1 / this.length);
    }

    get length(): number {
        const dx = this.to.x - this.from.x;
        const dy = this.to.y - this.from.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    clone(): Vector {
        return new Vector(this.from, this.to);
    }

    toString() {
        return `(${this.from}) -> (${this.to})`;
    }
}
