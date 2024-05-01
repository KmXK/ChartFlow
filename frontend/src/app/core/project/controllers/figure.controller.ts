import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { ControlPoint } from '@core/figures/control-points/control-point';
import { GroupFigure } from '@core/figures/group.figure';
import paper from 'paper';
import { FigureTreeNode } from '../shared/types/figure-hit-result';
import { FigureTreeNodeType } from './../shared/types/figure-hit-result';
import Controller from './base';
import { event } from './base/controller';

export default class FigureController extends Controller {
    private readonly figures = new Set<Figure>();
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

    public removeFigure(figure: Figure): void {
        if (figure instanceof GroupFigure) {
            for (const child of figure.getFigures()) {
                this.removeFigure(child);
            }
        }

        // TODO: Optimize
        [...this.parents.entries()]
            .filter(([_, parent]) => parent === figure)
            .forEach(([figure, _]) => {
                this.parents.delete(figure);
            });
        this.figureByItem.delete(figure.item);
        this.figures.delete(figure);
        this.removed.fire(figure);

        const index = this.project.activeLayer.children.findIndex(
            x => x === figure.item
        );
        this.project.activeLayer.removeChildren(index, index + 1);
    }

    public getParent(figure: Figure): Figure | undefined {
        return this.parents.get(figure);
    }

    public getFiguresInArea(square: paper.Rectangle): Figure[] {
        const result: Figure[] = [];

        for (const figure of this.figures) {
            if (
                !(figure instanceof ControlPoint) &&
                square.contains(figure.item.bounds)
            ) {
                result.push(figure);
            }
        }

        return result;
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

    // TODO: Move to coord controller
    public getGlobalCoordFromFigureCoordSystem(
        figure: Figure,
        figureCoordSystemCoord: paper.PointLike
    ): paper.Point {
        let point = new paper.Point(figureCoordSystemCoord);
        let parent: paper.Item | undefined = figure.item;
        console.log(point);
        while ((parent = parent.parent)) {
            point = point.add(parent.bounds.center);
            console.log(point);
        }

        return point;
    }

    public makeFigureForest(
        figures: Figure[],
        onlyFullGroup: boolean = false
    ): FigureTreeNode[] {
        const groups = new Map<
            Figure,
            { figure: GroupFigure; figures: Figure[] }
        >();

        const roots: Figure[] = [];

        const initialFigure = new Set<Figure>(figures);
        const allFigures = new Set<Figure>(initialFigure);
        const process = new Set<Figure>(initialFigure);

        while (process.size > 0) {
            const figure = process[Symbol.iterator]().next().value;
            process.delete(figure);

            const parent = this.parents.get(figure);

            // Сейчас все фигуры обёрнуты в группу для того, чтобы содержать внутри себя точки
            if (!parent) {
                if (!(figure instanceof GroupFigure)) {
                    // console.error(figure);
                    // throw new Error('Top parent is not a group figure: ');
                    continue;
                }

                roots.push(figure);
            } else {
                if (!(parent instanceof GroupFigure)) {
                    // console.error(figure);
                    throw new Error('Parent figure is not a group figure');
                }

                if (groups.has(parent)) {
                    groups.get(parent)!.figures.push(figure);
                } else {
                    groups.set(parent, {
                        figure: parent,
                        figures: [figure]
                    });
                }

                if (!allFigures.has(parent)) {
                    allFigures.add(parent);
                    process.add(parent);
                }
            }

            if (figure instanceof GroupFigure && !groups.has(figure)) {
                groups.set(figure, {
                    figure,
                    figures: []
                });
            }
        }

        const checkNode: (node: Figure, full: boolean) => FigureTreeNode[] = (
            node,
            full
        ) => {
            if (!(node instanceof GroupFigure)) {
                return [
                    {
                        type: FigureTreeNodeType.Figure,
                        figure: node
                    }
                ];
            }

            if (initialFigure.has(node) || full) {
                return [
                    {
                        type: FigureTreeNodeType.Group,
                        figure: node,
                        figures: [],
                        plainFigures: node.getFigures()
                    }
                ];
            }

            const children = groups.get(node)!.figures;
            const childForests = children.flatMap(x => checkNode(x, false));

            if (
                onlyFullGroup &&
                !node.solid &&
                children.length !== node.childrenCount
            ) {
                // skip node and get its children
                return childForests;
            } else {
                return [
                    {
                        type: FigureTreeNodeType.Group,
                        figure: node,
                        figures: childForests,
                        plainFigures: childForests.flatMap(x => {
                            if (x.type === FigureTreeNodeType.Group)
                                return x.plainFigures;
                            return [];
                        })
                    }
                ];
            }
        };

        const result = roots.flatMap(root => checkNode(root, false));
        return result;
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

        const points = figure.controlPoints;

        if (!(figure instanceof GroupFigure)) {
            if (
                figure.item instanceof paper.Group ||
                figure.item instanceof paper.CompoundPath
            ) {
                figure.item.children.forEach(c =>
                    this.figureByItem.set(c, figure)
                );
            }
        }

        if (points.length) {
            // Было бы лучше объединить это с кодом ниже.
            // Просто тут сложновато)
            this.figures.add(figure);
            this.created.fire(figure);
            this.figureByItem.set(figure.item, figure);

            const pointsFigure = points.map(x => {
                x.updatePosition();
                return this.addFigureAndNested(x);
            });

            // points.forEach(x => x.item.bringToFront());?????

            figure = new GroupFigure({
                figures: [figure, ...pointsFigure],
                solid: true
            });

            (figure as GroupFigure).getFigures().forEach(child => {
                this.parents.set(child, figure);
            });
        }

        this.figures.add(figure);
        this.created.fire(figure);

        this.figureByItem.set(figure.item, figure);
        return figure;
    }
}
