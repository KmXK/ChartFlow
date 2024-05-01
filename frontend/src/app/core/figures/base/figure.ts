import { event } from '@core/project/controllers/base/controller';
import * as paper from 'paper';
import { ControlPoint } from '../control-points/control-point';

export abstract class Figure<TItem extends paper.Item = paper.Item> {
    private _controlPoints: ControlPoint[] | undefined;
    private _transparent = false;

    public readonly sizeChanged = event<[Figure]>();
    public readonly positionChanged = event<[paper.Point]>();

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

    get size(): paper.Size {
        return this._item.bounds.size;
    }

    public setPosition(point: paper.PointLike): void {
        this._item.position = new paper.Point(point);
        this.updateControlPoints();

        this.positionChanged.fire(new paper.Point(point));
    }

    get position(): paper.Point {
        return this._item.position;
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
        this._controlPoints?.forEach(x => x.updatePosition());
    }

    public hide(): void {
        this.item.visible = false;
    }

    public show(): void {
        this.item.visible = true;
    }

    get transparent(): boolean {
        return this._transparent;
    }

    set transparent(value: boolean) {
        this._transparent = value;
    }
}
