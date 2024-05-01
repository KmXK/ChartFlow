import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import {
    FigureController,
    SelectionController,
    ZoomController
} from '@core/project/controllers';
import Controller from '@core/project/controllers/base';
import { FigureTreeNodeType } from '@core/project/shared/types/figure-hit-result';
import paper from 'paper';
import { BaseGostFigure } from '../figures/base.figure';
import { LineStartControlPoint } from '../figures/control-points/line-start.control-point';
import { ConnectionLineFigure } from '../figures/lines/connection-line.figure';
import { LineFigure } from '../figures/lines/line.figure';

export class LineStartController extends Controller {
    private readonly selectionController = inject(SelectionController);
    private readonly figureController = inject(FigureController);
    private readonly zoomController = inject(ZoomController);
    private readonly view = inject(paper.View);

    private points: LineStartControlPoint[] = [];

    private targetHint?: LineStartControlPoint;

    private lineCreationData?: {
        figure: Figure;
        line: LineFigure;
    };

    public init(): void {
        this.selectionController.selection.on(figureTreeNodes => {
            this.points = figureTreeNodes.flatMap(x => {
                if (x.type === FigureTreeNodeType.Figure) {
                    return x.figure.controlPoints.filter(
                        function (x): x is LineStartControlPoint {
                            return x instanceof LineStartControlPoint;
                        }
                    );
                }

                return x.plainFigures.flatMap(y =>
                    y.controlPoints.filter(
                        function (x): x is LineStartControlPoint {
                            return x instanceof LineStartControlPoint;
                        }
                    )
                );
            });
        });
    }

    public focusHint(hint: LineStartControlPoint): void {
        this.unfocusHint();

        this.targetHint = hint;
        this.targetHint.focus();

        this.view.element.style.cursor = 'copy';
    }

    public unfocusHint(): void {
        if (!this.targetHint) return;

        this.targetHint.unfocus();
        this.view.element.style.cursor = 'default';
    }

    public startLine(figure: Figure): void {
        if (!this.targetHint) return;

        this.points.forEach(x => x.hide());

        const line = new LineFigure();
        line.setStartTo(this.targetHint.anchorPosition);

        this.lineCreationData = {
            line,
            figure
        };

        this.figureController.addFigure(line);
    }

    public stopLine(figure?: BaseGostFigure): void {
        if (!this.lineCreationData) return;

        this.points.forEach(x => x.show());

        if (figure) {
            const connectionLine = new ConnectionLineFigure([
                this.lineCreationData.figure,
                figure
            ]);

            console.log(connectionLine);

            this.figureController.addFigure(connectionLine);
        }

        this.figureController.removeFigure(this.lineCreationData.line);
        this.lineCreationData = undefined;
    }

    public moveLine(point: paper.Point): void {
        if (!this.lineCreationData) return;

        this.lineCreationData.line.setEndTo(point);
    }

    get line(): LineFigure | undefined {
        return this.lineCreationData?.line;
    }
}
