import { ControllerCreator } from './controllers/base/controller.interface';
import { FigureHitController } from './controllers/figure-hit.controller';
import { FigureController } from './controllers/figure.controller';
import { OffsetController } from './controllers/offset.controller';
import { PlaceController } from './controllers/place.controller';
import { SelectionController } from './controllers/selection.controller';
import { ZoomController } from './controllers/zoom.controller';
import { EventLoop } from './event-loop';
import { ProjectInjector } from './injector/project-injector';

export class Project {
    private controllersClasses: ControllerCreator[] = [
        ZoomController,
        FigureController,
        FigureHitController,
        PlaceController,
        OffsetController,
        SelectionController
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
