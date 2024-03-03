import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { PointChangeTracker } from '../shared/point-change-tracker';
import FigureController from './figure.controller';
import Controller from './base';

export default class FigureHitController extends Controller {
    private readonly pointChangeTracker = new PointChangeTracker();

    private readonly figureController = inject(FigureController);
    private readonly project = inject(paper.Project);

    private cachedFigures: Figure[] = [];

    public getFiguresUnderMouse(point?: paper.Point): Figure[] {
        // TODO: Add check for mouse wheel and keyboard arrow keys
        if (!point || !this.pointChangeTracker.track(point))
            return this.cachedFigures;

        const results = this.project.hitTestAll(this.pointChangeTracker.point!);

        return (this.cachedFigures = results
            .map(x => this.figureController.getFigure(x.item))
            .filter(function (x): x is Figure {
                return x !== undefined;
            }));
    }
}
