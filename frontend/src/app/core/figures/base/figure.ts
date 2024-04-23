import { event } from '@core/project/controllers/base/controller';
import { ControlPoint } from '../control-points/control-point';

export abstract class Figure<TItem extends paper.Item = paper.Item> {
    private _controlPoints: ControlPoint[] | undefined;

    public readonly sizeChanged = event<[Figure<paper.Item>]>();

    constructor(private readonly _item: TItem) {}

    public onViewSizeChanged(): void {}

    get item(): TItem {
        return this._item;
    }

    get controlPoints(): ControlPoint[] {
        if (!this._controlPoints) {
            this._controlPoints = this.createControlPoints();
        }
        return [...this._controlPoints];
    }

    // sealed
    public setSize(size: paper.SizeLike): void {
        this.setSizeImpl(size);
        this.sizeChanged.fire(this);
    }

    protected setSizeImpl(size: paper.SizeLike): void {
        this._item.bounds.size = new paper.Size(size);
    }

    protected createControlPoints(): ControlPoint[] {
        return [];
    }

    public hide(): void {}

    public show(): void {}
}
