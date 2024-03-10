import { inject } from '@core/di';
import { SelectionController } from '../controllers';
import { MouseButton, MouseEvent } from '../shared/events/mouse.event';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class SelectionEventHandler extends EventHandler {
    private readonly selectionController = inject(SelectionController);
    private waitingForDeepSelect = false;

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (
            event.button === MouseButton.Left &&
            options.figureTreeNodes.length > 0
        ) {
            const hit = options.figureTreeNodes[0];

            // TODO: нужно проверять не то, что конкретный объект выделенный, а то,
            // что он находится в выделенной группе (при free select), в будущем проверить, что он есть
            // в лесу
            this.waitingForDeepSelect = this.selectionController.isSelected(
                options.plainFigures[0]
            );

            if (!this.waitingForDeepSelect) {
                this.selectionController.freeSelect(hit);
            }
        } else {
            this.selectionController.deselectAll();
        }
    }

    // TODO: Change to Click, fix
    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        if (
            event.button === MouseButton.Left &&
            options.figureTreeNodes.length > 0 &&
            event.pairEvent &&
            this.waitingForDeepSelect
        ) {
            const hit = options.figureTreeNodes[0];

            this.selectionController.deepSelect(hit);
        }
    }
}
