import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { GroupFigure } from '@core/figures/group.figure';
import paper from 'paper';
import {
    FigureTreeNode,
    FigureTreeNodeType
} from '../shared/types/figure-hit-result';
import Controller from './base';
import FigureController from './figure.controller';

export default class SelectionController extends Controller {
    private readonly project = inject(paper.Project);
    private readonly figureController = inject(FigureController);

    private readonly selectedFigures = new Set<Figure>();

    public selectFigure(figure: Figure): void {
        this.deselectAll();

        this.addToSelection(figure);
    }

    public freeSelect(hit: FigureTreeNode): void {
        this.selectFigure(hit.figure);
    }

    // TODO: нужно выделить некую структуру дерева и всегда выделять дочерник ноды,
    // но предоставить апи для того, чтобы получать лишь верхнеуровневые ноды выделения (корни леса)
    public deepSelect(hit: FigureTreeNode): void {
        if (hit.type === FigureTreeNodeType.Group) {
            if (this.selectedFigures.has(hit.figure) && !hit.figure.solid) {
                this.selectFigure(hit.figures[0]);
            } else {
                this.selectFigure(hit.figure);
            }
        } else {
            this.selectFigure(hit.figure);
        }
    }

    public deselectAll(): void {
        this.selectedFigures.clear();
        this.project.deselectAll();
    }

    public isSelected(figure: Figure): boolean {
        // TODO: create some tree structure with fast and easy access, now we can read only 2 levels
        return (
            this.selectedFigures.has(figure) ||
            [...this.selectedFigures.values()]
                .filter(function (x: Figure): x is GroupFigure {
                    return x instanceof GroupFigure;
                })
                .some(x => x.getFigures().includes(figure))
        );
    }

    public getSelection(): Figure[] {
        return [...this.selectedFigures];
    }

    private addToSelection(...figures: Figure[]): void {
        for (const figure of figures) {
            this.selectedFigures.add(figure);

            if (figure instanceof GroupFigure) {
                // this.addToSelection(...figure.getFigures());
            }

            // For Debug
            figure.item.selected = true;
        }
    }
}
