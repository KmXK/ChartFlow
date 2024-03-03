import { MouseButton, MouseEvent } from '@core/shared/events/mouse.event';
import { PlaceController } from '../controllers/place.controller';
import { Injector } from '../injector/injector';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class PlaceEventHandler implements EventHandler {
    private readonly placeController =
        this.injector.getController(PlaceController);

    constructor(private readonly injector: Injector) {}

    public onClick(event: MouseEvent, options: EventHandlerOptions): void {
        if (
            event.button === MouseButton.Left &&
            event.repeatCount === 2 &&
            options.figures.length === 0
        ) {
            this.placeController.placeSquare(
                event.point.subtract(25),
                [50, 50]
            );

            event.stop(); // TODO ?
            options.stopPropagation();
        }
    }
}
