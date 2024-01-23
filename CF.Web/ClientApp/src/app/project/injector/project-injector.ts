import * as paper from 'paper';
import { Class } from '../../shared/types/class';
import { InvalidInjectionError } from '../../shared/types/errors/invalid-injection.error';
import { Controller } from '../controllers/base/controller.interface';
import { Injector } from './injector';

export class ProjectInjector implements Injector {
    private readonly _controllerMap: Map<Class<Controller>, Controller> = new Map<Class<Controller>, Controller>();

    constructor(
        private readonly _project: paper.Project
    ) {
    }

    public get view(): paper.View {
        return this.project.view;
    }

    public get project(): paper.Project {
        return this._project;
    }

    public setControllers(controllers: Controller[]): void {
        for (let controller of controllers) {
            this._controllerMap.set(Object.getPrototypeOf(controller) as Class<Controller>, controller);
        }

        for (let controller of controllers) {
            controller.init();
        }
    }

    public getController<TController extends Controller>(type: Class<TController>): TController {
        const controller = this._controllerMap.get(type.prototype);

        if (!controller) {
            throw new InvalidInjectionError();
        }

        return controller as TController;
    }
}
