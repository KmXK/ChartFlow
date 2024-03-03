import { ServiceContainerBuilder } from '@core/di';
import paper from 'paper';
import { controllersClasses, eventHandlers } from './consts';
import { PlaceController } from './controllers';
import { EventLoop } from './event-loop';
import { EventHandlerPipe } from './shared/event-handler-pipe';

export class Sheet {
    constructor(project: paper.Project) {
        const builder = new ServiceContainerBuilder();
        builder.register(paper.Project, project);
        builder.register(paper.View, project.view);
        builder.register(Sheet, this);

        controllersClasses.forEach(x => {
            builder.add<unknown>(x);
        });

        eventHandlers.forEach(x => {
            builder.add<unknown>(x);
        });

        builder.add(EventHandlerPipe);

        builder.add(EventLoop);

        const container = builder.build();

        container.get(EventLoop).start();

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                container
                    .get(PlaceController)
                    .placeSquare([i * 50, j * 50], [40, 40]);
            }
        }
    }
}
