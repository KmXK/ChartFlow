import { inject } from '@core/di';
import { ZoomController } from '../controllers';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class ZoomEventHandler extends EventHandler {
    private readonly zoomController = inject(ZoomController);

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
