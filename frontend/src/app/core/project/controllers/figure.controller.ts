import { Figure } from '@core/figures/base/figure';
import { Controller, ControllerBase } from './base';

@Controller
export default class FigureController extends ControllerBase {
    private readonly figures: Figure[] = [];
    private readonly figureByItem: Map<paper.Item, Figure> = new Map();

    public addFigure(figure: Figure): void {
        this.figures.push(figure);
        this.figureByItem.set(figure.getItem(), figure);

        this.injector.project.activeLayer.addChild(figure.getItem());
    }

    public getFigure(item: paper.Item): Figure | undefined {
        return this.figureByItem.get(item);
    }
}
