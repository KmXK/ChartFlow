import { Optional } from 'src/app/shared/types/optional';
import {
    EventHandler,
    EventHandlerCreator,
    EventHandlerMethodPicker,
    EventHandlerOptions
} from '../event-handlers/event-handler';
import { Injector } from './../injector/injector';

export class EventHandlerContainer {
    private readonly handlers: EventHandler[] = this.eventHandlerCreators.map(
        eventHandler => new eventHandler(this.injector)
    );

    constructor(
        private readonly injector: Injector,
        private readonly eventHandlerCreators: EventHandlerCreator[]
    ) {}

    public eventHandlerCallback<TEvent, TMappedEvent = TEvent>(
        callback: EventHandlerMethodPicker<TMappedEvent>,
        options: Optional<EventHandlerOptions, 'stopPropagation'>,
        mapFunction?: (event: TEvent) => TMappedEvent
    ): (event: TEvent) => void {
        return event => {
            let propagationStopped = false;
            options.stopPropagation = () => {
                propagationStopped = true;
            };

            for (const eventHandler of this.handlers) {
                if (propagationStopped) break;

                callback(eventHandler)?.apply(eventHandler, [
                    mapFunction?.(event) ?? (event as unknown as TMappedEvent),
                    options as EventHandlerOptions
                ]);
            }
        };
    }
}
