import { inject } from '@core/di';
import { MouseButton, MouseEvent } from '@core/shared/events/mouse.event';
import { RotateController } from '../controllers/rotate.controller';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class RotateEventHandler extends EventHandler {
    private readonly rotateController = inject(RotateController);

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (
            event.button === MouseButton.Left &&
            options.figures.length > 0 &&
            event.repeatCount === 3
        ) {
            this.rotateController.toggleRotation(options.figures[0]);
        }
    }
}
