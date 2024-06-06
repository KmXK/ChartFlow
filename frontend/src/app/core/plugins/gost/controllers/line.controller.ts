import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import {
    FigureController,
    PositionController
} from '@core/project/controllers';
import Controller from '@core/project/controllers/base';
import { BaseGostFigure } from '../figures/base.figure';
import { ConnectionLineFigure } from '../figures/lines/connection-line.figure';

export class LineController extends Controller {
    private readonly figureController = inject(FigureController);
    private readonly positionController = inject(PositionController);

    private figureLines = new Map<Figure, ConnectionLineFigure[]>();

    public init(): void {
        this.figureController.created.on(figure => {
            if (figure instanceof BaseGostFigure) {
                figure.setSize([300, 140]);
            }

            if (!(figure instanceof ConnectionLineFigure)) return;

            console.log(figure, 'created');

            figure.figures.forEach(x => {
                if (!this.figureLines.has(x)) {
                    this.figureLines.set(x, []);
                }

                this.figureLines.get(x)!.push(figure);
            });

            figure.update();
        });

        this.figureController.removed.on(figure => {
            if (this.figureLines.has(figure)) {
                const lines = this.figureLines.get(figure)!;

                lines.forEach(line => {
                    this.figureController.removeFigure(line);
                });

                this.figureLines.delete(figure);
            }
        });

        this.positionController.figureMoved.on(data => {
            if (!this.figureLines.has(data.figure)) return;

            const lines = this.figureLines.get(data.figure)!;
            lines.forEach(x => x.update());
        });
    }
}
