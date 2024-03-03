import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import paper from 'paper';
import Controller from './base';

export default class SelectionController extends Controller {
    private readonly project = inject(paper.Project);

    public selectFigure(figure: Figure): void {
        this.project.deselectAll();
        figure.getItem().bringToFront();
        figure.getItem().selected = true;
    }

    public deselectAll(): void {
        this.project.deselectAll();
    }
}
