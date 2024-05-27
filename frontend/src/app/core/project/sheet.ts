import { CanvasService } from '@components/canvas/services/canvas.service';
import { ServiceContainer, ServiceContainerBuilder } from '@core/di';
import { ServiceType } from '@core/di/types/type';
import { IPluginCreator } from '@core/plugins/plugin';
import { loadPlugins } from '@core/plugins/plugin-injector';
import { PluginController } from '@core/project/controllers';
import paper from 'paper';
import { controllersClasses, eventHandlers } from './consts';
import Controller from './controllers/base';
import { EventLoop } from './event-loop';
import { EventHandlerPipe } from './shared/event-handler-pipe';

export class Sheet {
    private readonly container: ServiceContainer;

    constructor(
        project: paper.Project,
        canvasService: CanvasService,
        pluginsCreators: IPluginCreator[]
    ) {
        const builder = new ServiceContainerBuilder();
        builder.register(paper.Project, project);
        builder.register(paper.View, project.view);
        builder.register(Sheet, this);
        builder.register(HTMLCanvasElement, project.view.element);
        builder.register(CanvasService, canvasService);

        controllersClasses.forEach(x => {
            builder.add<unknown>(x);
        });

        eventHandlers.forEach(x => {
            builder.add<unknown>(x);
        });

        builder.add(EventHandlerPipe);

        builder.add(EventLoop);

        builder.register(
            PluginController,
            new PluginController(loadPlugins(builder, pluginsCreators))
        );

        this.container = builder.build();

        this.container.getAll(Controller).forEach(c => {
            c.init?.();
        });

        this.container.get(EventLoop).start();

        // for (let i = 0; i < 10; i++) {
        //     for (let j = 0; j < 10; j++) {
        //         container
        //             .get(PlaceController)
        //             .placeSquare([i * 50, j * 50], [40, 40]);
        //     }
        // }

        // this.container
        //     .get(HtmlElementController)
        //     .createTextInput()
        //     .setPosition({ x: 120, y: 50 });
    }

    public getService<TService>(controller: ServiceType<TService>): TService {
        return this.container.get(controller);
    }
}
