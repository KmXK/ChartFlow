import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { GroupFigure } from '@core/figures/group.figure';
import paper from 'paper';
import {
    FigureTreeNode,
    FigureTreeNodeType
} from '../shared/types/figure-hit-result';
import Controller from './base';

export default class FigureController extends Controller {
    private readonly figures: Figure[] = [];
    private readonly figureByItem = new Map<paper.Item, Figure>();
    private readonly parents = new Map<Figure, Figure>();

    private readonly project = inject(paper.Project);

    public addFigure(figure: Figure): void {
        this.addFigureAndNested(figure);

        // TODO: nested figures must not be added to active layer
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

    private addFigureAndNested(figure: Figure): void {
        this.figures.push(figure);
        this.figureByItem.set(figure.item, figure);

        if (figure.item.parent && this.figureByItem.has(figure.item.parent)) {
            const parentFigure = this.getFigure(figure.item.parent)!;
            this.parents.set(figure, parentFigure);
        }

        if (figure instanceof GroupFigure) {
            figure.getFigures().forEach(x => this.addFigureAndNested(x));
        }
    }
}
