import { ZoomController } from '../controllers/zoom.controller';
import { Injector } from '../injector/injector';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class ZoomEventHandler implements EventHandler {
    private readonly zoomController = this.injector.getController(ZoomController);

    constructor(private readonly injector: Injector) {
    }

    onWheel(event: WheelEvent, options: EventHandlerOptions) {
        if (event.ctrlKey) {
            this.zoomController.setZoom(-Math.sign(event.deltaY), [event.clientX, event.clientY]);
            event.preventDefault();
        }
    }
}
