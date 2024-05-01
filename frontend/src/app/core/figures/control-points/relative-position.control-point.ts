import * as paper from 'paper';
import { Figure } from '../base/figure';
import { ControlPoint } from './control-point';

export class RelativePositionControlPoint extends ControlPoint {
    private readonly _delta: paper.Point;

    constructor(
        _target: Figure,
        item: paper.Item,
        delta: paper.PointLike // relative: [0, 0] - topLeft, [1, 1] - bottomRight
    ) {
        super(_target, item);

        this._delta = new paper.Point(delta);
    }

    get delta(): paper.Point {
        return this._delta;
    }

    public override updatePosition(): void {
        this.setPosition(this.getRelativePosition());
    }

    public getRelativePosition(): paper.Point {
        const size = this.target.item.bounds.size;
        const delta = size.multiply(this.delta);

        return this.target.item.bounds.topLeft
            .add(delta)
            .multiply(100)
            .round()
            .divide(100);
    }
}
