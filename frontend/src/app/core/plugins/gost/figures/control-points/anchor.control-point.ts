import { Figure } from '@core/figures/base/figure';
import { RelativePositionControlPoint } from '@core/figures/control-points/relative-position.control-point';
import paper from 'paper';

export class AnchorControlPoint extends RelativePositionControlPoint {
    public readonly defaultVisibility = false;

    constructor(figure: Figure, delta: paper.PointLike) {
        const item = new paper.Path.Circle([0, 0], 10);

        item.fillColor = new paper.Color('#e69500');

        super(figure, item, delta);
    }
}
