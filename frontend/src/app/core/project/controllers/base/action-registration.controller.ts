import { Action } from '@core/actions/action';
import { Class } from './../../../shared/types/class';
import { Controller } from './controller';

export abstract class ActionRegistrationController extends Controller {
    public abstract createActionGroups(): Record<string, Class<Action>[]>;
}
