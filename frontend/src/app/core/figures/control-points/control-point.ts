import { Figure } from '../base/figure';

export abstract class ControlPoint extends Figure {
    constructor(
        private readonly _target: Figure,
        item: paper.Item
    ) {
        super(item);
        item.visible = false;
    }

    get target(): Figure {
        return this._target;
    }

    public updatePosition(): void {}
}
