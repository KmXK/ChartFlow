import { MouseEvent, getMouseButton } from '@core/shared/events/mouse.event';
import { Inject } from '../injector/injector';
import { Controller, ControllerBase } from './base';
import MouseEventCounter from './mouse-event-counter.controller';

@Controller
export default class EventMapperController extends ControllerBase {
    @Inject(MouseEventCounter) private mouseEventCounter!: MouseEventCounter;

    public mapMouseEvent(event: paper.MouseEvent): MouseEvent {
        const e = event as MouseEvent;
        e.button = getMouseButton(
            (event as unknown as { event: { which?: number; button: number } })
                .event
        );

        e.repeatCount = this.mouseEventCounter.getNumber(e);

        if (e.type === 'mouseup') {
            const data = this.mouseEventCounter.getLastEventData(
                'mousedown',
                e.point
            );

            if (data) {
                e.pairEvent = data.event;
            }
        }

        return e;
    }
}
