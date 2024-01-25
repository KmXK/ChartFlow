/* eslint-disable @typescript-eslint/no-explicit-any */
import { Figure } from '../../figures/base/figure';
import { mapFrameEvent } from '../../shared/events/frame.event';
import { mapMouseEvent } from '../../shared/events/mouse.event';
import {
    EventHandler,
    EventHandlerOptions,
    FigureEventHandlerCreator
} from '../event-handlers/event-handler';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';

type HandlerMethod = ((...args: never[]) => void) | undefined;

type HandlerMethodPicker<TEvent> = (
    handler: EventHandler
) => ((event: TEvent, options: EventHandlerOptions) => void) | undefined;

type MapFunction<TEvent, TMappedEvent> = (event: TEvent) => TMappedEvent;

type EventHandlerData<TEvent, TMappedEvent> = [
    HandlerMethodPicker<TEvent>,
    MapFunction<TEvent, TMappedEvent>
];

// TODO: Fix types for eventsMap (dont use any and remove suppression)
export class FigureEventHandlerRegistrationController implements Controller {
    private eventsMap: Record<string, EventHandlerData<any, unknown>> = {
        mousedown: [h => h.onMouseDown, mapMouseEvent],
        mouseup: [h => h.onMouseUp, mapMouseEvent],
        mousedrag: [h => h.onDrag, mapMouseEvent],
        click: [h => h.onClick, mapMouseEvent],
        frame: [h => h.onFrame, mapFrameEvent]
    };

    constructor(private readonly injector: Injector) {}

    public init(): void {}

    public registerEventHandlersFor(
        figure: Figure,
        eventHandlerCreator: FigureEventHandlerCreator
    ): void {
        const eventHandler = new eventHandlerCreator(this.injector, figure);

        const eventObject: Record<string, HandlerMethod> = {};

        const options = {
            stopPropagation(): void {}
        };

        for (const event in this.eventsMap) {
            const method = this.eventsMap[event][0](eventHandler);
            const mapFunc = this.eventsMap[event][1];

            if (method) {
                eventObject[event] = event =>
                    method.apply(eventHandler, [mapFunc(event), options]);
            }
        }

        figure.getItem().on(eventObject);
    }
}
