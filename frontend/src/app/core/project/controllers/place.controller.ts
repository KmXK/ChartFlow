import { Figure } from '@core/figures/base/figure';
import { SquareFigure } from '@core/figures/square.figure';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';
import { FigureController } from './figure.controller';
import { SelectionController } from './selection.controller';

export class PlaceController implements Controller {
    private selectionController!: SelectionController;
    private figureController!: FigureController;

    constructor(private readonly injector: Injector) {}

    public init(): void {
        this.selectionController =
            this.injector.getController(SelectionController);

        this.figureController = this.injector.getController(FigureController);
    }

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
