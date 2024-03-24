import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { ControlPoint } from '@core/figures/control-points/control-point';
import { GroupFigure } from '@core/figures/group.figure';
import { FigureController, SelectionController } from '.';
import Controller from './base';

export class ControlPointController extends Controller {
    private readonly figureController = inject(FigureController);
    private readonly selectionController = inject(SelectionController);

    private readonly targetPoints = new Map<Figure, ControlPoint[]>();

    public init(): void {
        this.figureController.created.on(figure => {
            const points = figure.getControlPoints();
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
                    x.item.visible = false;
                });
            });

            figures
                .flatMap(x => {
                    if (x instanceof GroupFigure) {
                        return x.getFigures();
                    }
                    return x;
                })
                .forEach(x => {
                    this.targetPoints.get(x)?.forEach(x => {
                        x.item.visible = true;
                    });
                });
        });
    }
}
