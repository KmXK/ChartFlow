import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import {
    MouseButton,
    MouseEvent
} from '@core/project/shared/events/mouse.event';
import paper from 'paper';
import { SelectionController } from '../controllers';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class MoveEventHandler extends EventHandler {
    private readonly selectionController = inject(SelectionController);
    private readonly view = inject(paper.View);

    private figures: Figure[] | undefined;

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (event.repeatCount > 1) return;

        if (
            event.button === MouseButton.Left &&
            options.plainFigures.length > 0 &&
            this.selectionController.isSelected(options.plainFigures[0])
        ) {
            this.view.element.style.cursor = 'move';
            this.figures = this.selectionController.getSelection();
            // this.selectionController.selectFigure(this.figure);

            options.stopPropagation();
        }
    }

    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figures && event.button === MouseButton.Left) {
            this.view.element.style.cursor = 'default';

            this.figures = undefined;

            options.stopPropagation();
        }
    }

    public onDrag(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figures) {
            for (const figure of this.figures) {
                const item = figure.item;
                item.position = item.position.add(event.delta);
            }

            options.stopPropagation();
        }
    }
}
