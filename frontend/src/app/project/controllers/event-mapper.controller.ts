import { MouseEvent, getMouseButton } from 'src/app/shared/events/mouse.event';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';
import { MouseEventCounter } from './mouse-event-counter.controller';

export class EventMapperController implements Controller {
    private mouseEventCounter!: MouseEventCounter;

    constructor(private readonly injector: Injector) {}

    public init(): void {
        this.mouseEventCounter = this.injector.getController(MouseEventCounter);
    }

    public mapMouseEvent(event: paper.MouseEvent): MouseEvent {
        const e = event as MouseEvent;
        e.button = getMouseButton(
            (event as unknown as { event: { which?: number; button: number } })
                .event
        );

        e.repeatCount = this.mouseEventCounter.getNumber(e, event.type);

        return e;
    }
}
