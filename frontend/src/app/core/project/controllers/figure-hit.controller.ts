import { Figure } from '@core/figures/base/figure';
import { Inject } from '../injector/injector';
import { PointChangeTracker } from '../shared/point-change-tracker';
import { Controller, ControllerBase } from './base';
import FigureController from './figure.controller';

@Controller
export default class FigureHitController extends ControllerBase {
    private readonly pointChangeTracker = new PointChangeTracker();

    @Inject(FigureController) private figureController!: FigureController;

    private cachedFigures: Figure[] = [];

    public getFiguresUnderMouse(point?: paper.Point): Figure[] {
        // TODO: Add check for mouse wheel and keyboard arrow keys
        if (!point || !this.pointChangeTracker.track(point))
            return this.cachedFigures;

        const results = this.injector.project.hitTestAll(
            this.pointChangeTracker.point!
        );

        return (this.cachedFigures = results
            .map(x => this.figureController.getFigure(x.item))
            .filter(function (x): x is Figure {
                return x !== undefined;
            }));
    }
}
