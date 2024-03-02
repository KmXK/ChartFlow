import { ControllerCreator } from './controllers/base/controller.interface';
import { FigureEventHandlerRegistrationController } from './controllers/figure-event-handler-registration.controller';
import { OffsetController } from './controllers/offset.controller';
import { PlaceController } from './controllers/place.controller';
import { SelectionController } from './controllers/selection.controller';
import { ZoomController } from './controllers/zoom.controller';
import { EventLoop } from './event-loop';
import { ProjectInjector } from './injector/project-injector';

export class Project {
    private controllersClasses: ControllerCreator[] = [
        ZoomController,
        PlaceController,
        OffsetController,
        SelectionController,
        FigureEventHandlerRegistrationController
    ];

    constructor(private readonly project: paper.Project) {
        const injector = new ProjectInjector(this.project);

        const controllers = this.controllersClasses.map(x => new x(injector));

        injector.setControllers(controllers);

        const eventLoop = new EventLoop(injector);
        eventLoop.start();
    }
}
