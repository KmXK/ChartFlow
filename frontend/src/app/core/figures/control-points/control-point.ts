import { Figure } from '../base/figure';

export abstract class ControlPoint extends Figure {
    constructor(
        private readonly target: Figure,
        item: paper.Item
    ) {
        super(item);
    }
}
