import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import { SquareFigure } from '@core/figures/square.figure';
import FigureController from './figure.controller';
import SelectionController from './selection.controller';
import Controller from './base';

export default class PlaceController extends Controller {
    private readonly selectionController = inject(SelectionController);

    private readonly figureController = inject(FigureController);

    public placeSquare(position: paper.PointLike, size: paper.SizeLike): void {
        this.registerFigure(
            new SquareFigure({
                size: size,
                leftTopCornerPosition: position
            })
        );
    }

    private registerFigure(figure: Figure): void {
        this.selectionController.selectFigure(figure);
        this.figureController.addFigure(figure);
    }
}
