import {
    EventMapperController,
    FigureController,
    FigureHitController,
    MouseEventCounter,
    OffsetController,
    PlaceController,
    SelectionController
} from './controllers';
import { ControllerCreator } from './controllers/base';
import ZoomController from './controllers/zoom.controller';
import { EventLoop } from './event-loop';
import { ProjectInjector } from './injector/project-injector';

export class Project {
    private controllersClasses: ControllerCreator[] = [
        ZoomController,
        FigureController,
        FigureHitController,
        PlaceController,
        OffsetController,
        SelectionController,
        EventMapperController,
        MouseEventCounter
    ];

    constructor(private readonly project: paper.Project) {
        const injector = new ProjectInjector(this.project);

        const controllers = this.controllersClasses.map(x => new x(injector));

        injector.setControllers(controllers);

        const eventLoop = new EventLoop(injector);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                injector
                    .getController(PlaceController)
                    .placeSquare([i * 50, j * 50], [40, 40]);
            }
        }
    }
}
