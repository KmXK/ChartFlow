import { inject } from '@core/di';
import { GridFigure } from '@core/figures/grid.figure';
import paper from 'paper';
import { combineLatest } from 'rxjs';
import Controller from './base';
import FigureController from './figure.controller';
import CanvasController from './html/canvas.controller';
import OffsetController from './offset.controller';
import ZoomController from './zoom.controller';

export default class GridController extends Controller {
    private readonly zoomController = inject(ZoomController);
    private readonly offsetController = inject(OffsetController);
    private readonly figureController = inject(FigureController);
    private readonly canvasController = inject(CanvasController);
    private readonly view = inject(paper.View);

    private gridFigure!: GridFigure;

    public init(): void {
        this.gridFigure = new GridFigure();

        this.figureController.addFigure(this.gridFigure);

        combineLatest([
            this.zoomController.zoomChanged,
            this.offsetController.offsetChanged,
            this.canvasController.sizeChanged
        ]).subscribe(([zoom, _, size]) => {
            this.gridFigure.redraw(this.view.bounds.topLeft, zoom, size);
        });
    }

    public setGridVisibility(visible: boolean): void {
        if (visible) {
            this.gridFigure.show();
        } else {
            this.gridFigure.hide();
        }
    }
}
