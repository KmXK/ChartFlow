import { Point } from "./point.model";

export class Vector {
    constructor(
        public readonly from: Point,
        public readonly to: Point) {
    }

    get length(): number {
        const dx = this.to.x - this.from.x;
        const dy = this.to.y - this.from.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    add(delta: Point): Vector {
        return new Vector(this.from.add(delta), this.to.add(delta));
    }

    multiply(value: number): Vector {
        const dx = this.to.x - this.from.x;
        const dy = this.to.y - this.from.y;

        return new Vector(this.from, this.to.add(new Point(dx * value, dy * value)));
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

    clone(): Vector {
        return new Vector(this.from, this.to);
    }

    toString() {
        return `(${this.from}) -> (${this.to})`;
    }
}
