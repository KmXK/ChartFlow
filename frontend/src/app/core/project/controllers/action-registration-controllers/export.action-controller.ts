import { Action } from '@core/actions/action';
import { ExportAction } from '@core/actions/export.action';
import { Class } from '@core/shared/types/class';
import { ActionRegistrationController } from '../base/action-registration.controller';

export class ExportActionController extends ActionRegistrationController {
    public createActionGroups(): Record<string, Class<Action>[]> {
        return {
            File: [ExportAction]
        };
    }
}
