import { inject } from '@core/di';
import { GridController, SelectionController } from '@core/project/controllers';
import paper from 'paper';
import { ActionBase } from './action';

export class ExportAction extends ActionBase {
    public readonly name = 'Export';

    private readonly project = inject(paper.Project);
    private readonly gridController = inject(GridController);
    private readonly selectionController = inject(SelectionController);

    constructor() {
        super();
        this.canExecuteSubject.next(true);
    }

    public execute(): void {
        this.gridController.setGridVisibility(false);
        this.selectionController.deselectAll();
        const svgContent = this.project.exportSVG({
            asString: true,
            bounds: 'content'
        }) as string;

        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'chart.svg';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
        this.gridController.setGridVisibility(true);
    }
}
