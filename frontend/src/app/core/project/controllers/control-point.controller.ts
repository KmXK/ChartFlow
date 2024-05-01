import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { ControlPoint } from '@core/figures/control-points/control-point';
import { FigureController, SelectionController } from '.';
import { FigureTreeNodeType } from '../shared/types/figure-hit-result';
import Controller from './base';

export default class ControlPointController extends Controller {
    private readonly figureController = inject(FigureController);
    private readonly selectionController = inject(SelectionController);

    private readonly targetPoints = new Map<Figure, ControlPoint[]>();

    public init(): void {
        this.figureController.created.on(figure => {
            const points = figure.controlPoints;
            if (points.length) {
                this.targetPoints.set(figure, points);
            }
        });

        this.figureController.removed.on(x => {
            this.targetPoints.delete(x);
        });

        this.selectionController.selection.on(figures => {
            this.targetPoints.forEach((p, f) => {
                // TODO: Move to 'visibility' controller
                // Нужно вообще как-то убрать доступ к item из фигур
                p.forEach(x => {
                    if (x.defaultVisibility) {
                        x.hide();
                    }
                });
            });

            figures
                .flatMap(x => {
                    if (x.type === FigureTreeNodeType.Group) {
                        return x.figure.getFigures();
                    }
                    return x.figure;
                })
                .forEach(x => {
                    this.targetPoints.get(x)?.forEach(x => {
                        if (x.defaultVisibility) {
                            x.show();
                        }
                    });
                });
        });
    }
}
