import { MouseButton, MouseEvent } from '@core/shared/events/mouse.event';
import { OffsetController, ZoomController } from '../controllers/';
import {
    EventHandler,
    EventHandlerBase,
    EventHandlerOptions
} from './event-handler';

@EventHandler
export class OffsetEventHandler extends EventHandlerBase {
    private readonly offsetController = this.inject(OffsetController);
    private readonly zoomController = this.inject(ZoomController);
    private start!: paper.Point;

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (event.button === MouseButton.Middle) {
            // TODO: Make cursor controller
            this.injector.view.element.style.cursor = 'move';
            this.start = event.point;
            event.preventDefault();
            event.stopPropagation();
        }
    }

    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        // TODO: Make cursor controller
        this.injector.view.element.style.cursor = 'default';
    }

    public onDrag(event: MouseEvent, option: EventHandlerOptions): void {
        if (event.button === MouseButton.Middle) {
            this.offsetController.setOffset(this.start.subtract(event.point));
            event.preventDefault();
            event.stopPropagation();
        }
    }

    public onWheel(event: WheelEvent, options: EventHandlerOptions): void {
        const modifierCount = +event.ctrlKey + +event.altKey + +event.shiftKey;
        const deltaOffset =
            (Math.sign(event.deltaY) * 30) / this.zoomController.zoom;

        if (modifierCount == 0) {
            this.offsetController.changeOffset([0, deltaOffset]);
            event.preventDefault();
        } else if (modifierCount === 1 && event.shiftKey) {
            this.offsetController.changeOffset([deltaOffset, 0]);
            event.preventDefault();
        }
    }
}
