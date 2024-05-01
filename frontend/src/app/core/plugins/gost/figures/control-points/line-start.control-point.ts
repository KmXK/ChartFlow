import { Figure } from '@core/figures/base/figure';
import { RelativePositionControlPoint } from '@core/figures/control-points/relative-position.control-point';
import paper from 'paper';

export class LineStartControlPoint extends RelativePositionControlPoint {
    constructor(_target: Figure, delta: paper.PointLike) {
        const item = new paper.Path.Circle([0, 0], 5);

        item.fillColor = new paper.Color('#86d9ff');

        super(_target, item, delta);
    }
}
