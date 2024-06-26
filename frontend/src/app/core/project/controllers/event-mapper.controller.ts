import { inject } from '@core/di';
import {
    MouseEvent,
    getMouseButton
} from '@core/project/shared/events/mouse.event';
import paper from 'paper';
import Controller from './base';
import MouseEventCounter from './mouse-event-counter.controller';

export default class EventMapperController extends Controller {
    private readonly mouseEventCounter = inject(MouseEventCounter);

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

    public mapWheelEvent(
        event: WheelEvent,
        canvas: HTMLElement
    ): WheelEvent & { point: paper.Point } {
        const rect = canvas.getBoundingClientRect();

        const e = event as WheelEvent & { point: paper.Point };
        e.point = new paper.Point(
            event.clientX - rect.left,
            event.clientY - rect.top
        );
        return e;
    }
}
