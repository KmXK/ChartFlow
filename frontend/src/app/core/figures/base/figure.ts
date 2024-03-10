export abstract class Figure<TItem extends paper.Item = paper.Item> {
    constructor(private readonly _item: TItem) {}

    public onViewSizeChanged(): void {}

    get item(): TItem {
        return this._item;
    }
}
