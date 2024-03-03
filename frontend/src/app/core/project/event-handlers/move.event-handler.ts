import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { MouseButton, MouseEvent } from '@core/shared/events/mouse.event';
import paper from 'paper';
import { SelectionController } from '../controllers';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class MoveEventHandler extends EventHandler {
    private readonly selectionController = inject(SelectionController);
    private readonly view = inject(paper.View);

    private figure: Figure | undefined;

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (event.button === MouseButton.Left && options.figures.length > 0) {
            this.view.element.style.cursor = 'move';
            this.figure = options.figures[0];
            this.selectionController.selectFigure(this.figure);

            options.stopPropagation();
        } else {
            this.selectionController.deselectAll();
        }
    }

    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figure && event.button === MouseButton.Left) {
            this.view.element.style.cursor = 'default';
            this.figure = undefined;

            options.stopPropagation();
        }
    }

    public onDrag(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figure) {
            const item = this.figure.getItem();
            item.position = item.position.add(event.delta);

            options.stopPropagation();
        }
    }
}
