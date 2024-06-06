import { Figure } from '@core/figures/base/figure';
import { RelativePositionControlPoint } from '@core/figures/control-points/relative-position.control-point';
import paper from 'paper';

export enum LineStartDirection {
    Right = 0,
    Bottom = 90,
    Left = 180,
    Top = 270
}

export class LineControlPoint extends RelativePositionControlPoint {
    constructor(_target: Figure, delta: paper.PointLike) {
        const item = new paper.Path.Circle([0, 0], 5);

        item.strokeWidth = 2;

        super(_target, item, delta);

        this.unfocus();
    }

    public updatePosition(): void {
        super.updatePosition();

        // const vector = new paper.Point(1, 0).rotate(this.direction, [0, 0]);
        // this.setPosition(this.position.add(vector.multiply(this.length())));
    }

    get anchorPosition(): paper.Point {
        return this.getRelativePosition();
    }

    public focus(): void {
        this.item.strokeColor = new paper.Color('#005d88');
        this.item.fillColor = new paper.Color('#005d88');
    }

    public unfocus(): void {
        this.item.strokeColor = new paper.Color('#00aeff');
        this.item.fillColor = new paper.Color('#00aeff');
    }
}
