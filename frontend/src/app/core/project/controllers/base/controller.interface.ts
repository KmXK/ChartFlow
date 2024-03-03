import { FrameEvent } from '../../../shared/events/frame.event';
import { Injector } from '../../injector/injector';

export interface ControllerCreator {
    new (injector: Injector): Controller;
}

export interface Controller {
    onFrame?(event: FrameEvent): void;
}
