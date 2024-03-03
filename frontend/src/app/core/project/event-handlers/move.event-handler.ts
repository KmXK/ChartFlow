import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { MouseButton, MouseEvent } from '@core/shared/events/mouse.event';
import paper from 'paper';
import { SelectionController } from '../controllers';
import { RotateController } from '../controllers/rotate.controller';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class MoveEventHandler extends EventHandler {
    private readonly selectionController = inject(SelectionController);
    private readonly rotateController = inject(RotateController);
    private readonly view = inject(paper.View);

    private figure: Figure | undefined;
    private movement = false;

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (event.repeatCount > 1) return;

        if (event.button === MouseButton.Left && options.figures.length > 0) {
            this.view.element.style.cursor = 'move';
            this.figure = options.figures[0];
            this.movement = false;
            this.selectionController.selectFigure(this.figure);

            options.stopPropagation();
        } else {
            this.selectionController.deselectAll();
        }
    }

    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figure && event.button === MouseButton.Left) {
            this.view.element.style.cursor = 'default';

            if (this.movement) {
                this.rotateController.disableRotation(this.figure);
            }

            this.figure = undefined;

            options.stopPropagation();
        }
    }

    public onDrag(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figure) {
            if (!this.movement) {
                this.rotateController.enableRotation(this.figure);
                this.movement = true;
            }

            const item = this.figure.getItem();
            item.position = item.position.add(event.delta);

            options.stopPropagation();
        }
    }
}
