import { Point } from "./point";

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

        console.log(`dx = ${dx}`)
        console.log(`dy = ${dy}`);
        console.log(`vector.from = ${vector.from}`);
        console.log(`new Point(dx * value, dy * value) = ${new Point(dx * value, dy * value)}`);
        console.log(`vector.from.add(new Point(dx * value, dy * value) = ${vector.from.add(new Point(dx * value, dy * value))}`);

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

        console.log(`length: dx = ${dx} dy = ${dy}`)

        return Math.sqrt(dx * dx + dy * dy);
    }

    clone(): Vector {
        return new Vector(this.from, this.to);
    }

    toString() {
        return `(${this.from}) -> (${this.to})`;
    }
}
