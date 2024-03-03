import { Figure } from '@core/figures/base/figure';
import { FrameEvent } from '@core/shared/events/frame.event';
import { MouseEvent } from '@core/shared/events/mouse.event';

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

export interface EventHandlerCreator {
    new (): EventHandler;
}

export abstract class EventHandler {
    public onMouseDown?(
        event: MouseEvent,
        options: EventHandlerOptions
    ): void {}

    public onMouseMove?(
        event: MouseEvent,
        options: EventHandlerOptions
    ): void {}

    public onMouseUp?(event: MouseEvent, options: EventHandlerOptions): void {}

    public onWheel?(event: WheelEvent, options: EventHandlerOptions): void {}

    public onClick?(event: MouseEvent, options: EventHandlerOptions): void {}

    public onFrame?(event: FrameEvent, option: EventHandlerOptions): void {}

    public onDrag?(event: MouseEvent, option: EventHandlerOptions): void {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type ConstructorOf<T extends object, Args extends any[]> = {
//     prototype: T;
//     new (...args: Args): T;
// };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
// export function EventHandler<T extends ConstructorOf<EventHandlerBase, any[]>>(
//     constructor: T
// ) {
//     return class extends constructor {
//         constructor(
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             ...args: any[]
//         ) {
//             super(args[0] as Injector);
//         }
//     };
// }
