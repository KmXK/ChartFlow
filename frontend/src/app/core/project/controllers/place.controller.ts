import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { RectangleFigure } from '@core/figures/text-figures/rectangle.figure';
import paper from 'paper';
import Controller from './base';
import FigureController from './figure.controller';
import SelectionController from './selection.controller';

export default class PlaceController extends Controller {
    private readonly selectionController = inject(SelectionController);

    private readonly figureController = inject(FigureController);

    public placeSquare(data: {
        position: paper.PointLike;
        size: paper.SizeLike;
        text: string;
    }): void {
        const outerSize = new paper.Size(data.size);

        const rect = new RectangleFigure();
        rect.setSize(outerSize);
        rect.setText(data.text);

        this.registerFigure(rect);
    }

    private registerFigure(figure: Figure): void {
        this.figureController.addFigure(figure);
    }
}
