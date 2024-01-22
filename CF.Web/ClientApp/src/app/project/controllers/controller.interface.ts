import { FrameEvent } from '../../shared/events/frame.event';

export type ControllerOptions = {
    stopPropagation(): void
};

export type ControllerMethod<TEvent> = ((event: TEvent, options: ControllerOptions) => void) | undefined;
export type ControllerMethodPicker<TEvent> = (controller: Controller) => ControllerMethod<TEvent>;

export interface Controller {
    onMouseDown?(event: paper.MouseEvent, options: ControllerOptions): void;

    onMouseUp?(event: paper.MouseEvent, options: ControllerOptions): void;

    onWheel?(event: WheelEvent, options: ControllerOptions): void;

    onClick?(event: paper.MouseEvent, options: ControllerOptions): void;

    onFrame?(event: FrameEvent, option: ControllerOptions): void;
}
