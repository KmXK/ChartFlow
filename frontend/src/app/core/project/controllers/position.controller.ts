import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import Controller from './base';
import { event } from './base/controller';
import FigureController from './figure.controller';

export default class PositionController extends Controller {
    private readonly figureController = inject(FigureController);

    public figureMoved = event<[{ figure: Figure; point: paper.Point }]>();

    public init(): void {
        this.figureController.created.on(figure => {
            figure.positionChanged.on(point => {
                this.figureMoved.fire({ figure, point });
            });
        });
        // TODO: Remove subscription?
        // Maybe use rxjs?
    }
}
