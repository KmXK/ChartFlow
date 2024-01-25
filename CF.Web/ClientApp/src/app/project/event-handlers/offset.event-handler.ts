import { MouseButton, MouseEvent } from '../../shared/events/mouse.event';
import { OffsetController } from '../controllers/offset.controller';
import { Injector } from '../injector/injector';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class OffsetEventHandler implements EventHandler {
    private readonly offsetController =
        this.injector.getController(OffsetController);
    private start!: paper.Point;

    constructor(private readonly injector: Injector) {}

    onMouseDown(event: MouseEvent, options: EventHandlerOptions) {
        if (event.button === MouseButton.Middle) {
            // TODO: Make cursor controller
            this.injector.view.element.style.cursor = 'move';
            this.start = event.point;
            event.preventDefault();
            event.stopPropagation();
        }
    }

    onMouseUp(event: MouseEvent, options: EventHandlerOptions) {
        // TODO: Make cursor controller
        this.injector.view.element.style.cursor = 'default';
    }

    onDrag(event: MouseEvent, option: EventHandlerOptions) {
        if (event.button === MouseButton.Middle) {
            this.offsetController.setOffset(this.start.subtract(event.point));
            event.preventDefault();
            event.stopPropagation();
        }
    }

    onWheel(event: WheelEvent, options: EventHandlerOptions) {
        const modifierCount = +event.ctrlKey + +event.altKey + +event.shiftKey;
        const deltaOffset =
            (Math.sign(event.deltaY) * 30) / this.injector.view.zoom;

        if (modifierCount == 0) {
            this.offsetController.changeOffset([0, deltaOffset]);
            event.preventDefault();
        } else if (modifierCount === 1 && event.shiftKey) {
            this.offsetController.changeOffset([deltaOffset, 0]);
            event.preventDefault();
        }
    }
}
