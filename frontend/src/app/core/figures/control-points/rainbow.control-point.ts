import paper from 'paper';
import { Figure } from '../base/figure';
import { ControlPoint } from './control-point';

export class RainbowControlPoint extends ControlPoint {
    constructor(target: Figure, delta: paper.PointLike) {
        const item = new paper.Path.Circle(
            new paper.Point(target.item.bounds.topLeft).add(delta),
            5
        );

        item.fillColor = new paper.Color('red');

        item.onFrame = () => {
            item.fillColor!.hue += Math.random() * 2 - 0.5;
        };

        super(target, item);
    }
}
