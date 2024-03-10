import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { GroupFigure } from '@core/figures/group.figure';
import paper from 'paper';
import {
    FigureTreeNode,
    FigureTreeNodeType
} from '../shared/types/figure-hit-result';
import Controller from './base';
import { event } from './base/controller';

export default class FigureController extends Controller {
    private readonly figures: Figure[] = [];
    private readonly figureByItem = new Map<paper.Item, Figure>();
    private readonly parents = new Map<Figure, Figure>();

    private readonly project = inject(paper.Project);

    public readonly created = event<[Figure]>();
    public readonly removed = event<[Figure]>();

    public addFigure(figure: Figure): void {
        figure = this.addFigureAndNested(figure);

        // nested figures must not be added to active layer
        this.project.activeLayer.addChild(figure.item);
    }

    public getParent(figure: Figure): Figure | undefined {
        return this.parents.get(figure);
    }

    public getTopParent(figure: Figure): Figure {
        let parent = figure;
        let maxNesting = 50;

        while (this.parents.has(parent) && maxNesting--) {
            parent = this.parents.get(parent)!;
        }

        if (!maxNesting) {
            throw new Error(
                'Seems you have a loop in your figure hierarchy. Error while getting top parent'
            );
        }

        return parent;
    }

    public getFigure(item: paper.Item): Figure | undefined {
        return this.figureByItem.get(item);
    }

    public foldPlainFigures(figures: Figure[]): FigureTreeNode[] {
        const groups = new Map<
            Figure,
            { figure: GroupFigure; figures: Figure[] }
        >();

        const set = new Set<FigureTreeNode>();

        figures.forEach(figure => {
            const topParent = this.getTopParent(figure);
            if (topParent !== figure) {
                if (!(topParent instanceof GroupFigure)) {
                    // Для предупреждения будущих ошибок, если будем тут расширяться
                    throw new Error('Top parent is not a group figure');
                }

                if (groups.has(topParent)) {
                    groups.get(topParent)!.figures.push(figure);
                } else {
                    groups.set(topParent, {
                        figure: topParent,
                        figures: [figure]
                    });

                    set.add({
                        type: FigureTreeNodeType.Group,
                        ...groups.get(topParent)!
                    });
                }
            } else {
                set.add({
                    type: FigureTreeNodeType.Figure,
                    figure
                });
            }
        });

        return [...set];
    }

    private addFigureAndNested(figure: Figure): Figure {
        if (figure instanceof GroupFigure) {
            const figures = figure.getFigures();

            const newFigures = figures.map(x => this.addFigureAndNested(x));

            figure = new GroupFigure({
                figures: newFigures,
                solid: figure.solid
            });

            newFigures.forEach(child => {
                this.parents.set(child, figure);
            });
        }

        const points = figure.getControlPoints();

        if (points.length) {
            // Было бы лучше объединить это с кодом ниже.
            // Просто тут сложновато)
            this.figures.push(figure);
            this.created.fire(figure);
            this.figureByItem.set(figure.item, figure);

            const pointsFigure = points.map(x => this.addFigureAndNested(x));

            figure = new GroupFigure({
                figures: [figure, ...pointsFigure],
                solid: true
            });

            (figure as GroupFigure).getFigures().forEach(child => {
                this.parents.set(child, figure);
            });
        }

        this.figures.push(figure);
        this.created.fire(figure);

        this.figureByItem.set(figure.item, figure);
        return figure;
    }
}
