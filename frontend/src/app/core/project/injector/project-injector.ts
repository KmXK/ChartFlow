import Controller from '@core/project/controllers/base';
import { Class } from '@core/shared/types/class';
import { InvalidInjectionError } from '@core/shared/types/errors/invalid-injection.error';
import { Injector, configureInjection } from './injector';

export class ProjectInjector implements Injector {
    private readonly _controllerMap: Map<Class<Controller>, Controller> =
        new Map<Class<Controller>, Controller>();
    private _plainControllers: Controller[] = [];

    constructor(private readonly _project: paper.Project) {}

    get view(): paper.View {
        return this.project.view;
    }

    get project(): paper.Project {
        return this._project;
    }

    public setControllers(controllers: Controller[]): void {
        this._controllerMap.clear();
        this._plainControllers = controllers;

        for (const controller of controllers) {
            this._controllerMap.set(
                Object.getPrototypeOf(controller) as Class<Controller>,
                controller
            );
        }

        controllers.forEach(c => configureInjection(c, this));
    }

    public getController<TController extends Controller>(
        type: Class<TController>
    ): TController {
        const controller = this._controllerMap.get(type.prototype);

        if (!controller) {
            throw new InvalidInjectionError(type);
        }

        return controller as TController;
    }

    public getControllers(): Controller[] {
        return this._plainControllers;
    }

    public getInjectFunction(): <TController extends Controller>(
        type: Class<TController>
    ) => TController {
        return <TController extends Controller>(type: Class<TController>) =>
            this.getController(type) as TController;
    }
}
