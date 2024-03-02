import { FrameEvent, mapFrameEvent } from '../shared/events/frame.event';
import { mapMouseEvent } from '../shared/events/mouse.event';
import {
    EventHandlerCreator,
    EventHandlerMethodPicker,
    EventHandlerOptions
} from './event-handlers/event-handler';
import { OffsetEventHandler } from './event-handlers/offset.event-handler';
import { PlaceEventHandler } from './event-handlers/place.event-handler';
import { ZoomEventHandler } from './event-handlers/zoom.event-handler';
import { ProjectInjector } from './injector/project-injector';

export class EventLoop {
    private readonly eventHandlerCreators: EventHandlerCreator[] = [
        ZoomEventHandler,
        OffsetEventHandler,
        PlaceEventHandler
    ];

    private readonly eventHandlers = this.eventHandlerCreators.map(
        creator => new creator(this.injector)
    );

    constructor(private readonly injector: ProjectInjector) {}

    public start(): void {
        this.configureEvents();
    }

    private configureEvents(): void {
        const view = this.injector.view;

        view.element.onwheel = this.eventHandlerCallback(c => c.onWheel);

        view.on({
            mousedown: this.eventHandlerCallback(
                c => c.onMouseDown,
                mapMouseEvent
            ),
            mouseup: this.eventHandlerCallback(c => c.onMouseUp, mapMouseEvent),
            click: this.eventHandlerCallback(c => c.onClick, mapMouseEvent),
            mousedrag: this.eventHandlerCallback(c => c.onDrag, mapMouseEvent),
            frame: this.mergeEventCallbacks<FrameEvent>([
                event =>
                    this.injector
                        .getControllers()
                        .forEach(c => c.onFrame?.(event)),
                this.eventHandlerCallback(c => c.onFrame, mapFrameEvent)
            ])
        });
    }

    private mergeEventCallbacks<TEvent>(
        callbacks: ((event: TEvent) => void)[]
    ): (event: TEvent) => void {
        return event => callbacks.forEach(c => c(event));
    }

    private eventHandlerCallback<TEvent, TMappedEvent = TEvent>(
        callback: EventHandlerMethodPicker<TMappedEvent>,
        mapFunction?: (event: TEvent) => TMappedEvent
    ): (event: TEvent) => void {
        return event => {
            let propagationStopped = false;
            const options: EventHandlerOptions = {
                stopPropagation() {
                    propagationStopped = true;
                }
            };

            for (const eventHandler of this.eventHandlers) {
                if (propagationStopped) break;

                callback(eventHandler)?.apply(eventHandler, [
                    mapFunction?.(event) ?? (event as unknown as TMappedEvent),
                    options
                ]);
            }
        };
    }
}
