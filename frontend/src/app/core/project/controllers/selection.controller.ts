import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { ControlPoint } from '@core/figures/control-points/control-point';
import { GroupFigure } from '@core/figures/group.figure';
import paper from 'paper';
import {
    FigureTreeNode,
    FigureTreeNodeType
} from '../shared/types/figure-hit-result';
import Controller from './base';
import { event } from './base/controller';
import FigureController from './figure.controller';

export default class SelectionController extends Controller {
    private readonly project = inject(paper.Project);
    private readonly figureController = inject(FigureController);

    private readonly selectedFigures = new Set<Figure>();

    public readonly selection = event<[FigureTreeNode[]]>();

    public selectFigure(figure: Figure): void {
        this.deselectAll();

        this.addToSelection(figure);
        this.selection.fire(this.getSelection());
    }

    public selectFigures(figures: Figure[]): void {
        this.deselectAll();

        figures.forEach(figure => this.addToSelection(figure));
        this.selection.fire(this.getSelection());
    }

    public freeSelect(hit: FigureTreeNode): void {
        this.selectFigure(hit.figure);
    }

    // TODO: нужно выделить некую структуру дерева и всегда выделять дочерник ноды,
    // но предоставить апи для того, чтобы получать лишь верхнеуровневые ноды выделения (корни леса)
    // mb selectNodeAndChildren, а верхний метод - selectNode
    public deepSelect(hit: FigureTreeNode): void {
        if (hit.type === FigureTreeNodeType.Group) {
            if (this.selectedFigures.has(hit.figure) && !hit.figure.solid) {
                this.selectFigure(hit.figures[0].figure);
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
        this.selection.fire([]);
    }

    public isSelected(figure: Figure): boolean {
        if (figure instanceof ControlPoint) {
            // TODO: подумать ещё тут
            return false;
        }

        // TODO: create some tree structure with fast and easy access, now we can read only 2 levels
        let testFigure: Figure | undefined = figure;

        while (testFigure) {
            if (this.selectedFigures.has(testFigure)) {
                return true;
            }

            testFigure = this.figureController.getParent(testFigure);
        }

        return false;
    }

    public getSelection(): FigureTreeNode[] {
        // TODO: может стоит держать выделение уже в виде дерева и модифицировать его через специальные функции? (создать класс для дерева)
        return this.figureController.makeFigureForest(
            [...this.selectedFigures.values()],
            true
        );
    }

    private addToSelection(...figures: Figure[]): void {
        for (const figure of figures) {
            this.selectedFigures.add(figure);

            if (figure instanceof GroupFigure) {
                this.addToSelection(...figure.getFigures());
            }

            // For Debug
            // figure.item.selected = true;
        }
    }
}
