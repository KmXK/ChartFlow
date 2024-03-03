import { Optional } from '@core/shared/types/optional';
import {
    EventHandlerCreator,
    EventHandlerMethodPicker,
    EventHandlerOptions,
    IEventHandler
} from '../event-handlers/event-handler';
import { Injector } from './../injector/injector';

export class EventHandlerContainer {
    private readonly handlers: IEventHandler[] = this.eventHandlerCreators.map(
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
