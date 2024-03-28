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

    public placeSquare(position: paper.PointLike, size: paper.SizeLike): void {
        const outerSize = new paper.Size(size);
        const innerSize = outerSize.divide(2);
        const innerPosition = new paper.Point(position).add(
            outerSize.subtract(innerSize).divide(2)
        );

        const rect = new RectangleFigure();
        rect.setSize([100, 100]);
        rect.setText('ДОРА ДУРА');

        this.registerFigure(
            // rect
            rect
            // new GroupFigure({
            //     figures: [
            //         new SquareFigure({
            //             size: outerSize,
            //             leftTopCornerPosition: position
            //         }),
            //         new SquareFigure({
            //             size: outerSize.divide(2),
            //             leftTopCornerPosition: innerPosition
            //         })
            //     ],
            //     solid: false
            // })
        );
    }

    private registerFigure(figure: Figure): void {
        this.selectionController.selectFigure(figure);
        this.figureController.addFigure(figure);
    }
}
