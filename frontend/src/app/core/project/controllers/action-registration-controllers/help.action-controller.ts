import { Action } from '@core/actions/action';
import { HelpAction } from '@core/actions/help.action';
import { Class } from '@core/shared/types/class';
import { ActionRegistrationController } from '../base/action-registration.controller';

export class HelpActionController extends ActionRegistrationController {
    public createActionGroups(): Record<string, Class<Action>[]> {
        return {
            Help: [HelpAction]
        };
    }
}
