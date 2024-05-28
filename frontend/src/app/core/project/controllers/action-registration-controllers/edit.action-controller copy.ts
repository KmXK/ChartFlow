import { Action } from '@core/actions/action';
import { DeleteAction } from '@core/actions/delete.figure';
import { Class } from '@core/shared/types/class';
import { ActionRegistrationController } from '../base/action-registration.controller';

export class EditActionController extends ActionRegistrationController {
    public createActionGroups(): Record<string, Class<Action>[]> {
        return {
            Edit: [DeleteAction]
        };
    }
}
