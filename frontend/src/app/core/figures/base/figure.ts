import { ControlPoint } from '../control-points/control-point';

export abstract class Figure<TItem extends paper.Item = paper.Item> {
    private _controlPoints: ControlPoint[] | undefined;

    constructor(private readonly _item: TItem) {}

    public onViewSizeChanged(): void {}

    get item(): TItem {
        return this._item;
    }

    public getControlPoints(): ControlPoint[] {
        if (!this._controlPoints) {
            this._controlPoints = this.createControlPoints();
        }
        return [...this._controlPoints];
    }

    protected createControlPoints(): ControlPoint[] {
        return [];
    }
}
