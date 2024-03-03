import { ZoomController } from '../controllers';
import {
    EventHandler,
    EventHandlerBase,
    EventHandlerOptions
} from './event-handler';

@EventHandler
export class ZoomEventHandler extends EventHandlerBase {
    private readonly zoomController = this.inject(ZoomController);

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
