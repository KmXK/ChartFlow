import { MouseButton, MouseEvent } from '@core/shared/events/mouse.event';
import { PlaceController } from '../controllers';
import {
    EventHandler,
    EventHandlerBase,
    EventHandlerOptions
} from './event-handler';

@EventHandler
export class PlaceEventHandler extends EventHandlerBase {
    private readonly placeController = this.inject(PlaceController);

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
