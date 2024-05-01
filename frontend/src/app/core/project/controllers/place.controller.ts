import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { TextFigure } from '@core/figures/text-figures/text.figure';
import paper from 'paper';
import Controller from './base';
import FigureController from './figure.controller';

export default class PlaceController extends Controller {
    private readonly figureController = inject(FigureController);

    public placeFigure(
        figure: Figure,
        options?: {
            position?: paper.PointLike;
            size?: paper.Size;
            text?: string;
        }
    ): Figure {
        if (figure instanceof TextFigure && options?.text) {
            figure.setText(options.text);
        }

        if (options?.size) {
            figure.setSize(options.size);
        }

        if (options?.position) {
            figure.item.position = new paper.Point(options.position); // TODO: make setPosition method
        }

        this.registerFigure(figure);

        figure.setSize([100, 40]); // TODO: remove

        return figure;
    }

    private registerFigure(figure: Figure): void {
        this.figureController.addFigure(figure);
    }
}
