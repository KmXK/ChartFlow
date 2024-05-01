import paper from 'paper';
import { Figure } from '../base/figure';
import { RelativePositionControlPoint } from './relative-position.control-point';

export class SizeControlPoint extends RelativePositionControlPoint {
    constructor(
        _target: Figure,
        delta: paper.PointLike // relative: [0, 0] - topLeft, [1, 1] - bottomRight
    ) {
        const item = new paper.Path.Circle([0, 0], 3);

        item.fillColor = new paper.Color('#00dd00');

        super(_target, item, delta);
    }
}
