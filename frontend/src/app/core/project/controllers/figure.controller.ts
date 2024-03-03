import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import paper from 'paper';
import Controller from './base';

export default class FigureController extends Controller {
    private readonly figures: Figure[] = [];
    private readonly figureByItem: Map<paper.Item, Figure> = new Map();

    private readonly project = inject(paper.Project);

    public addFigure(figure: Figure): void {
        this.figures.push(figure);
        this.figureByItem.set(figure.getItem(), figure);

        this.project.activeLayer.addChild(figure.getItem());
    }

    public getFigure(item: paper.Item): Figure | undefined {
        return this.figureByItem.get(item);
    }
}
