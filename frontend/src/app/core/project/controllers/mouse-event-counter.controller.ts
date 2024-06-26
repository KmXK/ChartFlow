import { inject } from '@core/di';
import { MouseEvent } from '@core/project/shared/events/mouse.event';
import Controller from './base';
import ZoomController from './zoom.controller';

type EventCount = {
    lastTime: number;
    count: number;
    point: paper.Point;
    event: MouseEvent;
};

export default class MouseEventCounter extends Controller {
    private threshold = 250; // время между нажатиями
    private pointDelta = 5; // максимальное расстояние при 100% зуме для повторного клика

    private eventsMap = new Map<string, EventCount>();

    private zoomController = inject(ZoomController);

    public getNumber(event: MouseEvent): number {
        let count;

        if (!this.eventsMap.has(event.type)) {
            count = 1;
        } else {
            const data = this.eventsMap.get(event.type)!;

            if (
                data.lastTime + this.threshold < event.timeStamp ||
                !this.arePointsClose(data.point, event.point)
            ) {
                count = 1;
            } else {
                count = data.count + 1;
            }
        }

        // TODO: Fix click event count

        this.eventsMap.set(event.type, {
            lastTime: event.timeStamp,
            count,
            point: event.point,
            event
        });

        return count;
    }

    public getLastEventData(
        eventName: string,
        point: paper.Point
    ): EventCount | undefined {
        const data = this.eventsMap.get(eventName);

        if (data && this.arePointsClose(point, data.point)) {
            return data;
        }

        return undefined;
    }

    private arePointsClose(point1: paper.Point, point2: paper.Point): boolean {
        return (
            point1.getDistance(point2) <=
            this.pointDelta / this.zoomController.zoom
        );
    }
}
