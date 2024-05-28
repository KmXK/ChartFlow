import { inject } from '@core/di';
import {
    FigureController,
    SelectionController
} from '@core/project/controllers';
import { ActionBase } from './action';

export class DeleteAction extends ActionBase {
    public name = 'Delete';

    private readonly figureController = inject(FigureController);
    private readonly selectionController = inject(SelectionController);

    public init(): void {
        this.selectionController.selection.on(figures => {
            this.canExecuteSubject.next(figures.length > 0);
        });
    }

    public execute(): void {
        this.selectionController.getSelection().forEach(x => {
            this.figureController.removeFigure(x.figure);
        });
        this.canExecuteSubject.next(false);
    }
}
