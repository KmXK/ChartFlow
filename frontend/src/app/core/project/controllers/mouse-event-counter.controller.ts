import { MouseEvent } from '@core/shared/events/mouse.event';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';
import { ZoomController } from './zoom.controller';

type EventCount = {
    lastTime: number;
    count: number;
    point: paper.Point;
    event: MouseEvent;
};

export class MouseEventCounter implements Controller {
    private threshold = 250; // время между нажатиями
    private pointDelta = 5; // максимальное расстояние при 100% зуме для повторного клика

    private eventsMap: Map<string, EventCount> = new Map();

    private zoomController!: ZoomController;

    constructor(private readonly injector: Injector) {}

    public init(): void {
        this.zoomController = this.injector.getController(ZoomController);
    }

    public getNumber(event: MouseEvent): number {
        if (!this.eventsMap.has(event.type)) {
            this.eventsMap.set(event.type, {
                lastTime: event.timeStamp,
                count: 1,
                point: event.point,
                event
            });
        } else {
            const data = this.eventsMap.get(event.type)!;
            if (
                data.lastTime + this.threshold < event.timeStamp ||
                !this.arePointsClose(data.point, event.point)
            ) {
                this.eventsMap.set(event.type, {
                    lastTime: event.timeStamp,
                    count: 1,
                    point: event.point,
                    event
                });
            } else {
                this.eventsMap.set(event.type, {
                    lastTime: event.timeStamp,
                    count: data.count + 1,
                    point: event.point,
                    event
                });
            }
        }

        return this.eventsMap.get(event.type)!.count;
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
