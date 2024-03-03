import { Figure } from '@core/figures/base/figure';
import { MouseButton, MouseEvent } from '@core/shared/events/mouse.event';
import { SelectionController } from '../controllers';
import {
    EventHandler,
    EventHandlerBase,
    EventHandlerOptions
} from './event-handler';

@EventHandler
export class MoveEventHandler extends EventHandlerBase {
    private readonly selectionController = this.inject(SelectionController);

    private figure: Figure | undefined;

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (event.button === MouseButton.Left && options.figures.length > 0) {
            this.injector.view.element.style.cursor = 'move';
            this.figure = options.figures[0];
            this.selectionController.selectFigure(this.figure);

            options.stopPropagation();
        }
    }

    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figure && event.button === MouseButton.Left) {
            this.injector.view.element.style.cursor = 'default';
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
