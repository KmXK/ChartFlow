import { MouseButton, MouseEvent } from '../../shared/events/mouse.event';
import { PlaceController } from '../controllers/place.controller';
import { Injector } from '../injector/injector';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class PlaceEventHandler implements EventHandler {
    private readonly placeController = this.injector.getController(PlaceController);

    constructor(private readonly injector: Injector) {
    }

    onClick(event: MouseEvent, options: EventHandlerOptions) {
        if (event.button === MouseButton.Left) {
            this.placeController.placeSquare(event.point.subtract(25), [50, 50]);
        }
    }
}
