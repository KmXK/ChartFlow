import { Injector } from '@core/project/injector/injector';
import { FrameEvent } from '@core/shared/events/frame.event';
import { Controller as IController } from './controller.interface';

export abstract class ControllerBase implements IController {
    public onFrame(event: FrameEvent): void {}

    constructor(protected readonly injector: Injector) {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConstructorOf<T extends object, Args extends any[]> = {
    prototype: T;
    new (...args: Args): T;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
export function Controller<T extends ConstructorOf<ControllerBase, any[]>>(
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
