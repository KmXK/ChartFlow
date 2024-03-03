import { Figure } from '@core/figures/base/figure';
import { FrameEvent } from '@core/shared/events/frame.event';
import { MouseEvent } from '@core/shared/events/mouse.event';
import { Class } from '@core/shared/types/class';
import Controller from '../controllers/base';
import { Injector } from '../injector/injector';

export type EventHandlerOptions = {
    stopPropagation(): void;
    figures: Figure[];
};

export type EventHandlerMethod<TEvent> =
    | ((event: TEvent, options: EventHandlerOptions) => void)
    | undefined;

export type EventHandlerMethodPicker<TEvent> = (
    eventHandler: IEventHandler
) => EventHandlerMethod<TEvent>;

export interface IEventHandler {
    onMouseDown?(event: MouseEvent, options: EventHandlerOptions): void;

    onMouseMove?(event: MouseEvent, options: EventHandlerOptions): void;

    onMouseUp?(event: MouseEvent, options: EventHandlerOptions): void;

    onWheel?(event: WheelEvent, options: EventHandlerOptions): void;

    onClick?(event: MouseEvent, options: EventHandlerOptions): void;

    onFrame?(event: FrameEvent, option: EventHandlerOptions): void;

    onDrag?(event: MouseEvent, option: EventHandlerOptions): void;
}

export abstract class EventHandlerBase implements IEventHandler {
    constructor(protected readonly injector: Injector) {}

    protected inject<TController extends Controller>(
        type: Class<TController>
    ): TController {
        return this.injector.getController(type);
    }

    // TODO: remove, for implementing interface
    public onMouseDown?(
        event: MouseEvent,
        options: EventHandlerOptions
    ): void {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConstructorOf<T extends object, Args extends any[]> = {
    prototype: T;
    new (...args: Args): T;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
export function EventHandler<T extends ConstructorOf<EventHandlerBase, any[]>>(
    constructor: T
) {
    return class extends constructor {
        constructor(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...args: any[]
        ) {
            super(args[0] as Injector);
        }
    };
}

export interface EventHandlerCreator {
    new (injector: Injector): IEventHandler;
}

export interface FigureEventHandlerCreator {
    new (injector: Injector, figure: Figure): IEventHandler;
}
