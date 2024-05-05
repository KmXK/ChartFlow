import { FrameEvent } from '@core/project/shared/events/frame.event';

export interface ControllerCreator {
    new (): Controller;
}

export type ControllerEventRecords<TData> = {
    fire: (data: TData) => void;
    on: (subscriber: (data: TData) => void) => void;
    off: (subscriber: (data: TData) => void) => void;
};

export class ControllerEventMediator<TArgs extends unknown[]> {
    protected readonly subscribers = new Set<(...data: TArgs) => void>();

    public fire(...data: TArgs): void {
        this.subscribers.forEach(s => s(...data));
    }

    public on(subscriber: (...data: TArgs) => void): void {
        this.subscribers.add(subscriber);
    }

    public off(subscriber: (...data: TArgs) => void): void {
        this.subscribers.delete(subscriber);
    }
}

export function event<
    TArgs extends unknown[]
>(): ControllerEventMediator<TArgs> {
    return new ControllerEventMediator();
}

export abstract class Controller {
    public init?(): void {}
    public onFrame?(event: FrameEvent): void {}
}
