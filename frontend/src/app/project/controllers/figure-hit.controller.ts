import { Figure } from 'src/app/figures/base/figure';
import { Injector } from '../injector/injector';
import { PointChangeTracker } from '../shared/point-change-tracker';
import { Controller } from './base/controller.interface';
import { FigureController } from './figure.controller';

export class FigureHitController implements Controller {
    private readonly pointChangeTracker = new PointChangeTracker();
    private figureController!: FigureController;

    private cachedFigures: Figure[] = [];

    constructor(private readonly injector: Injector) {}

    public init(): void {
        this.figureController = this.injector.getController(FigureController);
    }

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
