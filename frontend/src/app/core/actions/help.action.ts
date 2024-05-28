import { CanvasService } from '@components/canvas/services/canvas.service';
import { inject } from '@core/di';
import { ActionBase } from './action';

export class HelpAction extends ActionBase {
    public readonly name = 'Help';

    private readonly canvasService = inject(CanvasService);

    constructor() {
        super();
        this.canExecuteSubject.next(true);
    }

    public execute(): void {
        this.canvasService.showHelpDialog();
    }
}
