import { FrameEvent } from '../../../shared/events/frame.event';

export interface ControllerCreator {
    new (): Controller;
}

export abstract class Controller {
    public onFrame?(event: FrameEvent): void {}
}
