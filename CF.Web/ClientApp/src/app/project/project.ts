import { Figure } from '../figures/base/figure';
import { mapFrameEvent } from '../shared/events/frame.event';
import { mapMouseEvent } from '../shared/events/mouse.event';
import { Controller } from './controllers/base/controller.interface';
import { OffsetController } from './controllers/offset.controller';
import { PlaceController } from './controllers/place.controller';
import { ZoomController } from './controllers/zoom.controller';
import { EventHandler, EventHandlerMethodPicker, EventHandlerOptions } from './event-handlers/event-handler';
import { OffsetEventHandler } from './event-handlers/offset.event-handler';
import { PlaceEventHandler } from './event-handlers/place.event-handler';
import { ZoomEventHandler } from './event-handlers/zoom.event-handler';
import { ProjectInjector } from './injector/project-injector';
import { Project as IProject } from './project.interface';

export class Project implements IProject {
    private readonly eventHandlers: EventHandler[];

    constructor(private readonly project: paper.Project) {
        const injector = new ProjectInjector(this.project);

        const controllers: Controller[] = [
            new ZoomController(injector),
            new PlaceController(injector),
            new OffsetController(injector)
        ];

        injector.setControllers(controllers);

        this.eventHandlers = [
            new ZoomEventHandler(injector),
            new OffsetEventHandler(injector),
            new PlaceEventHandler(injector)
        ];

        this.project.view.element.onwheel = this.eventHandlerCallback(c => c.onWheel);

        this.project.view.on({
            mousedown: this.eventHandlerCallback(c => c.onMouseDown, mapMouseEvent),
            mouseup: this.eventHandlerCallback(c => c.onMouseUp, mapMouseEvent),
            click: this.eventHandlerCallback(c => c.onClick, mapMouseEvent),
            frame: this.eventHandlerCallback(c => c.onFrame, mapFrameEvent),
            mousedrag: this.eventHandlerCallback(c => c.onDrag, mapMouseEvent)
        });
    }

    setSelectionTo(...figures: Figure[]): void {
        throw new Error('Method not implemented.');
    }

    addToSelection(...figures: Figure[]): void {
        throw new Error('Method not implemented.');
    }

    delete(...figures: Figure[]): void {
        throw new Error('Method not implemented.');
    }

    private eventHandlerCallback<TEvent, TMappedEvent>(
        callback: EventHandlerMethodPicker<TMappedEvent>,
        mapFunction?: (event: TEvent) => TMappedEvent
    ): ((event: TEvent) => void) {
        return event => {
            let propagationStopped = false;
            const options: EventHandlerOptions = {
                stopPropagation() {
                    propagationStopped = true;
                }
            };

            for (const eventHandler of this.eventHandlers) {
                if (propagationStopped) break;

                callback(eventHandler)?.apply(eventHandler, [mapFunction?.(event) ?? (event as any as TMappedEvent), options]);
            }
        };
    }
}
