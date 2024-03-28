import paper from 'paper';
import { Figure } from '../base/figure';
import { ControlPoint } from './control-point';

export class SizeControlPoint extends ControlPoint {
    private readonly _delta: paper.Point;

    constructor(
        _target: Figure,
        delta: paper.PointLike // relative: [0, 0] - topLeft, [1, 1] - bottomRight
    ) {
        const item = new paper.Path.Circle([0, 0], 3);

        item.fillColor = new paper.Color('#00dd00');

        super(_target, item);

        this._delta = new paper.Point(delta);

        this.updatePosition();
    }

    get delta(): paper.Point {
        return this._delta;
    }

    public override updatePosition(): void {
        const size = this.target.item.bounds.size;
        const delta: paper.SizeLike = [
            size.width * this._delta.x,
            size.height * this._delta.y
        ];

        const point = new paper.Point(this._target.item.bounds.topLeft).add(
            delta
        );

        this.item.position = point;
    }
}
