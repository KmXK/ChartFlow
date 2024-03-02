import { Figure } from 'src/app/figures/base/figure';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';

export class FigureController implements Controller {
    private readonly figures: Figure[] = [];
    private readonly figureByItem: Map<paper.Item, Figure> = new Map();

    constructor(private readonly injector: Injector) {}

    public init(): void {}

    public addFigure(figure: Figure): void {
        this.figures.push(figure);
        this.figureByItem.set(figure.getItem(), figure);

        this.injector.project.activeLayer.addChild(figure.getItem());
    }

    public getFigure(item: paper.Item): Figure | undefined {
        return this.figureByItem.get(item);
    }
}
