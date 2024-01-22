export interface Figure {
    onViewSizeChanged?(): void;

    getItem(): paper.Item;

    onSelected?(): void;

    onDeselected?(): void;
}
