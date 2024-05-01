import { Figure } from '@core/figures/base/figure';
import { RelativePositionControlPoint } from '@core/figures/control-points/relative-position.control-point';
import paper from 'paper';
import { AnchorControlPoint } from './anchor.control-point';

export enum LineStartDirection {
    Right = 0,
    Bottom = 90,
    Left = 180,
    Top = 270
}

export class LineStartControlPoint extends RelativePositionControlPoint {
    private targetPosition!: paper.Point;

    constructor(
        _target: Figure,
        delta: paper.PointLike,
        private readonly direction: LineStartDirection,
        public readonly anchorControlPoint: AnchorControlPoint
    ) {
        const width = 5;
        const height = 30;
        const arrowWidth = 20;
        const arrowHeight = 20;
        const deltaWidth = arrowWidth - width;

        const item = new paper.Path();
        item.moveTo([0, -width / 2]);
        item.lineBy([height, 0]);
        item.lineBy([0, -deltaWidth]);
        item.lineBy([arrowHeight, arrowWidth]);
        item.lineBy([-arrowHeight, arrowWidth]);
        item.lineBy([0, -deltaWidth]);
        item.lineBy([-height, 0]);
        item.closePath();

        item.strokeWidth = 2;
        item.rotate(direction);

        super(_target, item, delta);

        this.unfocus();
    }

    public updatePosition(): void {
        super.updatePosition();

        const vector = new paper.Point(1, 0).rotate(this.direction, [0, 0]);
        this.setPosition(this.position.add(vector.multiply(this.length())));
    }

    get anchorPosition(): paper.Point {
        return this.getRelativePosition();
    }

    public focus(): void {
        this.item.strokeColor = new paper.Color('#1fb7fd');
        this.item.fillColor = new paper.Color('#1fb7fd');
    }

    public unfocus(): void {
        this.item.strokeColor = new paper.Color('#c6edff');
        this.item.fillColor = new paper.Color('#c6edff');
    }

    private length(): number {
        if (
            this.direction == LineStartDirection.Top ||
            this.direction == LineStartDirection.Bottom
        ) {
            return this.size.height;
        }

        return this.size.width;
    }
}
