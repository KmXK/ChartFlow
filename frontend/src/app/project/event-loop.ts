import { FrameEvent, mapFrameEvent } from '../shared/events/frame.event';
import { MouseEvent } from '../shared/events/mouse.event';
import { mergeEventCallbacks } from '../shared/helpers/callback.helper';
import { Optional } from '../shared/types/optional';
import { EventMapperController } from './controllers/event-mapper.controller';
import { FigureHitController } from './controllers/figure-hit.controller';
import {
    EventHandlerMethodPicker,
    EventHandlerOptions
} from './event-handlers/event-handler';
import { MoveEventHandler } from './event-handlers/move.event-handler';
import { OffsetEventHandler } from './event-handlers/offset.event-handler';
import { PlaceEventHandler } from './event-handlers/place.event-handler';
import { ZoomEventHandler } from './event-handlers/zoom.event-handler';
import { ProjectInjector } from './injector/project-injector';
import { EventHandlerContainer } from './shared/event-handler-container';

export class EventLoop {
    private readonly eventHandlerContainer = new EventHandlerContainer(
        this.injector,
        [
            ZoomEventHandler,
            OffsetEventHandler,
            MoveEventHandler,
            PlaceEventHandler
        ]
    );

    private readonly figureHitController =
        this.injector.getController(FigureHitController);
    private readonly eventMapperController = this.injector.getController(
        EventMapperController
    );

    constructor(private readonly injector: ProjectInjector) {
        this.configureEvents();
    }

    private configureEvents(): void {
        const view = this.injector.view;

        view.element.onwheel = this.eventHandlerCallback(options =>
            this.eventHandlerContainer.eventHandlerCallback(
                x => x.onWheel,
                options
            )
        );

        const getMouseCallback = (
            methodPicker: EventHandlerMethodPicker<MouseEvent>
        ): ((event: paper.MouseEvent) => void) =>
            this.eventHandlerCallback(options =>
                this.eventHandlerContainer.eventHandlerCallback(
                    methodPicker,
                    options,
                    this.eventMapperController.mapMouseEvent.bind(
                        this.eventMapperController
                    )
                )
            );

        view.on({
            mousedown: getMouseCallback(x => x.onMouseDown),
            mouseup: getMouseCallback(x => x.onMouseUp),
            mousedrag: getMouseCallback(x => x.onDrag),
            click: getMouseCallback(x => x.onClick),
            mousemove: getMouseCallback(x => x.onMouseMove),
            frame: this.eventHandlerCallback<FrameEvent>(options =>
                mergeEventCallbacks([
                    event =>
                        this.injector
                            .getControllers()
                            .forEach(c => c.onFrame?.(event)),
                    this.eventHandlerContainer.eventHandlerCallback(
                        x => x.onFrame,
                        options,
                        mapFrameEvent
                    )
                ])
            )
        });
    }

    private eventHandlerCallback<TEvent>(
        callback: (
            options: Optional<EventHandlerOptions, 'stopPropagation'>
        ) => (event: TEvent) => void
    ): (event: TEvent) => void {
        return event => {
            const point = (event as { point?: paper.Point }).point;

            const options = {
                figures: this.figureHitController.getFiguresUnderMouse(point)
            };

            callback(options)(event);
        };
    }
}
