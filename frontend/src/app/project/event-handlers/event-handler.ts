import { Figure } from '../../figures/base/figure';
import { FrameEvent } from '../../shared/events/frame.event';
import { MouseEvent } from '../../shared/events/mouse.event';
import { Injector } from '../injector/injector';

export type EventHandlerOptions = {
    stopPropagation(): void;
    figures: Figure[];
};

export type EventHandlerMethod<TEvent> =
    | ((event: TEvent, options: EventHandlerOptions) => void)
    | undefined;

export type EventHandlerMethodPicker<TEvent> = (
    eventHandler: EventHandler
) => EventHandlerMethod<TEvent>;

export interface EventHandler {
    onMouseDown?(event: MouseEvent, options: EventHandlerOptions): void;

    onMouseMove?(event: MouseEvent, options: EventHandlerOptions): void;

    onMouseUp?(event: MouseEvent, options: EventHandlerOptions): void;

    onWheel?(event: WheelEvent, options: EventHandlerOptions): void;

    onClick?(event: MouseEvent, options: EventHandlerOptions): void;

    onFrame?(event: FrameEvent, option: EventHandlerOptions): void;

    onDrag?(event: MouseEvent, option: EventHandlerOptions): void;
}

export interface EventHandlerCreator {
    new (injector: Injector): EventHandler;
}

export interface FigureEventHandlerCreator {
    new (injector: Injector, figure: Figure): EventHandler;
}
