import { injectAll } from '@core/di';
import { Optional } from '@core/shared/types/optional';
import {
    EventHandler,
    EventHandlerMethodPicker,
    EventHandlerOptions
} from '../event-handlers/event-handler';

export class EventHandlerPipe {
    private readonly handlers = injectAll(EventHandler);

    public eventHandlerCallback<TEvent, TMappedEvent = TEvent>(
        callback: EventHandlerMethodPicker<TMappedEvent>,
        options: Optional<EventHandlerOptions, 'stopPropagation'>,
        mapFunction?: (event: TEvent) => TMappedEvent
    ): (event: TEvent) => boolean {
        return event => {
            let propagationStopped = false;
            options.stopPropagation = () => {
                propagationStopped = true;
            };

            const mappedEvent =
                mapFunction?.(event) ?? (event as unknown as TMappedEvent);

            for (const eventHandler of this.handlers) {
                if (propagationStopped) break;

                callback(eventHandler)?.apply(eventHandler, [
                    mappedEvent,
                    options as EventHandlerOptions
                ]);
            }

            return propagationStopped;
        };
    }
}
