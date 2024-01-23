import { FrameEvent } from '../../../shared/events/frame.event';

export interface Controller {
    init(): void;

    onFrame?(event: FrameEvent): void;
}
