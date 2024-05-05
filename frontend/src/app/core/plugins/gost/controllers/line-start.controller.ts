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
import { AnchorControlPoint } from '../figures/control-points/anchor.control-point';
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
        startAnchor: AnchorControlPoint;
        line: LineFigure;
        preview?: AnchorControlPoint;
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

        const line = new LineFigure(this.targetHint.anchorControlPoint.vector);
        line.setStartTo(this.targetHint.anchorPosition);

        this.lineCreationData = {
            line,
            startAnchor: this.targetHint.anchorControlPoint
        };

        this.figureController.addFigure(line);
    }

    public stopLine(): void {
        if (!this.lineCreationData || !this.targetHint) return;

        this.points.forEach(x => x.show());

        if (this.lineCreationData.preview) {
            const connectionLine = new ConnectionLineFigure([
                this.lineCreationData.startAnchor,
                this.lineCreationData.preview
            ]);

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

    public makeLinePreview(point: AnchorControlPoint): void {
        if (!this.lineCreationData) return;

        this.lineCreationData.preview = point;
        this.lineCreationData.line.setEndTo(point.position, point.vector);
    }

    public removePreview(): void {
        if (!this.lineCreationData?.preview) return;

        this.lineCreationData.preview = undefined;
    }
}
