import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { GroupFigure } from '@core/figures/group.figure';
import paper from 'paper';
import { PointChangeTracker } from '../shared/types/point-change-tracker';
import Controller from './base';
import FigureController from './figure.controller';

export default class FigureHitController extends Controller {
    private readonly pointChangeTracker = new PointChangeTracker();

    private readonly figureController = inject(FigureController);
    private readonly project = inject(paper.Project);

    private lastTime = new Date();
    private cachedResults: Figure[] = [];

    public getFiguresUnderMouse(point?: paper.Point): Figure[] {
        const now = new Date();
        const delta = now.getTime() - this.lastTime.getTime();

        // TODO: Add check for mouse wheel and keyboard arrow keys
        if (delta < 25 || !point || !this.pointChangeTracker.track(point))
            return this.cachedResults;

        this.lastTime = now;
        const hitResults = this.project.hitTestAll(
            this.pointChangeTracker.point!
        );

        const hitFigures = hitResults
            .map(x => this.figureController.getFigure(x.item))
            .filter(function (x): x is Figure {
                return x !== undefined;
            })
            .map(x => {
                let figure = x;
                let parent = x;

                do {
                    figure = parent;
                    parent = this.figureController.getParent(figure)!;
                } while (
                    parent &&
                    parent instanceof GroupFigure &&
                    parent.solid
                );

                return figure;
            });

        this.cachedResults = hitFigures;
        return hitFigures;
    }
}
