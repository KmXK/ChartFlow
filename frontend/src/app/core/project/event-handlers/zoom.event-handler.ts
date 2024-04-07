import { inject } from '@core/di';
import { ZoomController } from '../controllers';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class ZoomEventHandler extends EventHandler {
    private readonly zoomController = inject(ZoomController);

    public onWheel(
        event: WheelEvent & { point: paper.Point },
        options: EventHandlerOptions
    ): void {
        if (event.ctrlKey) {
            this.zoomController.setZoom(-Math.sign(event.deltaY), [
                event.point.x,
                event.point.y
            ]);
            event.preventDefault();
        }
    }
}
