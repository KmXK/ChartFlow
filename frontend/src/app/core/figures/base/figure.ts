import { event } from '@core/project/controllers/base/controller';
import * as paper from 'paper';
import { ControlPoint } from '../control-points/control-point';

export abstract class Figure<TItem extends paper.Item = paper.Item> {
    private _controlPoints: ControlPoint[] | undefined;

    public readonly sizeChanged = event<[Figure<paper.Item>]>();

    constructor(private readonly _item: TItem) {}

    public onViewSizeChanged(): void {}

    get item(): TItem {
        return this._item;
    }

    // sealed
    get controlPoints(): ControlPoint[] {
        if (!this._controlPoints) {
            this._controlPoints = this.createControlPoints();
        }
        return [...this._controlPoints];
    }

    // sealed
    public setSize(size: paper.SizeLike): void {
        const validSize = this.validateSize(size);

        this.setSizeImpl(validSize);
        this.updateControlPoints();
        this.sizeChanged.fire(this);
    }

    public setPosition(point: paper.PointLike): void {
        this._item.position = new paper.Point(point);
        this.updateControlPoints();
    }

    protected setSizeImpl(size: paper.SizeLike): void {
        this._item.bounds.size = new paper.Size(size);
    }

    public validateSize(size: paper.SizeLike): paper.Size {
        const sizeObj = new paper.Size(size);

        if (sizeObj.width === 0) sizeObj.width = 1;
        if (sizeObj.height === 0) sizeObj.height = 1;

        return sizeObj;
    }

    protected createControlPoints(): ControlPoint[] {
        return [];
    }

    protected updateControlPoints(): void {
        this.controlPoints.forEach(x => x.updatePosition());
    }

    public hide(): void {}

    public show(): void {}
}
