import { Figure } from '@core/figures/base/figure';
import { SquareFigure } from '@core/figures/square.figure';
import { Inject } from '../injector/injector';
import { Controller, ControllerBase } from './base';
import FigureController from './figure.controller';
import SelectionController from './selection.controller';

@Controller
export default class PlaceController extends ControllerBase {
    @Inject(SelectionController)
    private selectionController!: SelectionController;

    @Inject(FigureController)
    private figureController!: FigureController;

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
