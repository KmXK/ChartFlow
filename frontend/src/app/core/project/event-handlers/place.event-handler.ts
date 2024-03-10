import { inject } from '@core/di';
import {
    MouseButton,
    MouseEvent
} from '@core/project/shared/events/mouse.event';
import { PlaceController } from '../controllers';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class PlaceEventHandler extends EventHandler {
    private readonly placeController = inject(PlaceController);

    public onClick(event: MouseEvent, options: EventHandlerOptions): void {
        if (
            event.button === MouseButton.Left &&
            event.repeatCount === 2 &&
            options.figureTreeNodes.length === 0
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
