import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import {
    FigureController,
    PositionController
} from '@core/project/controllers';
import Controller from '@core/project/controllers/base';
import paper from 'paper';
import { BaseUseCaseFigure } from '../figures/base.figure';
import { LineControlPoint } from '../figures/control-points/line.control-point';
import { ConnectionLineFigure } from '../figures/lines/connection-line.figure';
import { LineFigure } from '../figures/lines/line.figure';

export class LineController extends Controller {
    private readonly figureController = inject(FigureController);
    private readonly positionController = inject(PositionController);

    private figureLines = new Map<Figure, ConnectionLineFigure[]>();

    public init(): void {
        this.figureController.created.on(figure => {
            if (!(figure instanceof ConnectionLineFigure)) return;

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

    private targetPoint: LineControlPoint | undefined;
    private linePreview: LineFigure | undefined;
    private targetFigure: BaseUseCaseFigure | undefined;

    public startLinePreview(point: LineControlPoint): void {
        if (this.linePreview) return;

        this.linePreview = new LineFigure();
        this.linePreview.setStartTo(point.position);
        this.linePreview.setEndTo(point.position);

        this.figureController.addFigure(this.linePreview);

        this.targetPoint = point;

        console.log('CREATE');
    }

    public moveLinePreview(
        point: paper.Point,
        figure?: BaseUseCaseFigure
    ): void {
        this.linePreview?.setEndTo(point);

        console.log(this.linePreview);

        if (this.targetFigure) {
            this.targetFigure.item.strokeColor = new paper.Color('black');
        }

        this.targetFigure = figure;

        if (
            this.targetFigure &&
            this.targetPoint?.target === this.targetFigure
        ) {
            this.targetFigure = undefined;
        }

        if (this.targetFigure) {
            this.targetFigure.item.strokeColor = new paper.Color('red');
        }
    }

    public stopLinePreview(): void {
        if (!this.linePreview) return;

        if (this.targetFigure) {
            this.addLine(
                this.targetPoint!.target as BaseUseCaseFigure,
                this.targetFigure
            );

            this.targetFigure.item.strokeColor = new paper.Color('black');
        }

        this.figureController.removeFigure(this.linePreview);
        this.linePreview = undefined;
        console.log('REMOVE');
    }

    private addLine(from: BaseUseCaseFigure, to: BaseUseCaseFigure): void {
        const line = new ConnectionLineFigure([from, to]);

        this.figureController.addFigure(line);
    }
}
