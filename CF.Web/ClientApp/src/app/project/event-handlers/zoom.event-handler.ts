import { ZoomController } from '../controllers/zoom.controller';
import { Injector } from '../injector/injector';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class ZoomEventHandler implements EventHandler {
    private readonly zoomController =
        this.injector.getController(ZoomController);

    constructor(private readonly injector: Injector) {}

    public onWheel(event: WheelEvent, options: EventHandlerOptions): void {
        if (event.ctrlKey) {
            this.zoomController.setZoom(-Math.sign(event.deltaY), [
                event.clientX,
                event.clientY
            ]);
            event.preventDefault();
        }
    }
}
