import { Class } from '@core/shared/types/class';
import { Controller } from '../controllers/base/controller.interface';

export interface Injector {
    get view(): paper.View;

    get project(): paper.Project;

    getController<TController extends Controller>(
        type: Class<TController>
    ): TController;
}
