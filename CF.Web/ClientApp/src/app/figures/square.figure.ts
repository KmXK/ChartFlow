import * as paper from 'paper';
import { Figure } from './base/figure';

export type SquareFigureOptions = {
    leftTopCornerPosition: paper.PointLike,
    size: paper.SizeLike
};

export class SquareFigure implements Figure {
    private readonly rect: paper.Path.Rectangle;

    constructor(options: SquareFigureOptions) {
        const rect = new paper.Path.Rectangle(options.leftTopCornerPosition, options.size);
        rect.strokeColor = new paper.Color(0, 1);
        rect.fillColor = new paper.Color('red');
        this.rect = rect;

        rect.onFrame = this.onFrame.bind(this);
        rect.onMouseDrag = this.onMouseDrag.bind(this);
        rect.onMouseDown = this.onMouseDown.bind(this);
        rect.onClick = this.onClick.bind(this);
    }

    getItem(): paper.Item {
        return this.rect;
    }

    private onFrame(): void {
        this.rect.rotate(1);
        this.rect.fillColor!.hue += 1;
    }

    private onClick(event: paper.MouseEvent): void {
        this.rect.project.deselectAll();
        this.rect.selected = true;
        event.stopPropagation();
    }

    private onMouseDown(event: paper.MouseEvent): void {
        this.rect.project.deselectAll();
        this.rect.selected = true;
        event.stopPropagation();
    }

    private onMouseDrag(event: paper.MouseEvent): void {
        console.log(event)
        this.rect.project.deselectAll();
        this.rect.selected = true;
        this.rect.position = this.rect.position.add(event.delta);

        event.stopPropagation();
    }
}
