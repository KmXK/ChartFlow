import { MouseEvent } from 'src/app/shared/events/mouse.event';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';
import { ZoomController } from './zoom.controller';

type EventCount = {
    lastTime: number;
    count: number;
    point: paper.Point;
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

    public getNumber(event: MouseEvent, eventName: string): number {
        if (!this.eventsMap.has(eventName)) {
            this.eventsMap.set(eventName, {
                lastTime: event.timeStamp,
                count: 1,
                point: event.point
            });
        } else {
            const data = this.eventsMap.get(eventName)!;
            if (
                data.lastTime + this.threshold < event.timeStamp ||
                data.point.getDistance(event.point) >
                    this.pointDelta / this.zoomController.zoom
            ) {
                this.eventsMap.set(eventName, {
                    lastTime: event.timeStamp,
                    count: 1,
                    point: event.point
                });
            } else {
                this.eventsMap.set(eventName, {
                    lastTime: event.timeStamp,
                    count: data.count + 1,
                    point: event.point
                });
            }
        }

        return this.eventsMap.get(eventName)!.count;
    }
}
