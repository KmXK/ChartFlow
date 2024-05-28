import { Action } from '@core/actions/action';
import { ServiceContainerBuilder, injectIf } from '@core/di';
import { Subject } from 'rxjs';
import Controller from './base';
import { ActionRegistrationController } from './base/action-registration.controller';

export class ActionController extends Controller {
    public readonly groups: Record<string, Action[]> = {};

    private readonly actionStatusChangedSubject = new Subject<void>();

    public readonly actionStatusChanged$ =
        this.actionStatusChangedSubject.asObservable();

    public actionControllers = injectIf<ActionRegistrationController>(
        service => service instanceof ActionRegistrationController
    );

    public createActions(container: ServiceContainerBuilder): void {
        for (const controller of this.actionControllers) {
            for (const [key, actions] of Object.entries(
                controller.createActionGroups()
            )) {
                actions.forEach(actionClass => {
                    const action = new actionClass();
                    container.resolveInjection(actionClass, action);
                    this.groups[key] = [...(this.groups[key] || []), action];

                    action.canExecute$.subscribe(() =>
                        this.actionStatusChangedSubject.next()
                    );
                });
            }
        }
    }
}
