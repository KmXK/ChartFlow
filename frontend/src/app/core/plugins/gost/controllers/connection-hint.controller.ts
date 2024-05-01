import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import Controller from '@core/project/controllers/base';
import { BaseGostFigure } from '../figures/base.figure';
import { AnchorControlPoint } from '../figures/control-points/anchor.control-point';
import { LineFigure } from '../figures/lines/line.figure';
import { LineStartController } from './line-start.controller';

export class ConnectionHintController extends Controller {
    private readonly lineStartController = inject(LineStartController);

    private target?: {
        figure: BaseGostFigure;
        line: LineFigure;
    };

    public hintConnection(figure?: Figure): void {
        if (figure instanceof AnchorControlPoint) {
            this.lineStartController.makeLinePreview(figure);
            return;
        }

        this.lineStartController.removePreview();
        this.removeHintConnection();

        if (figure instanceof BaseGostFigure) {
            const line = this.lineStartController.line;
            if (!line) return;

            this.target = {
                line: this.lineStartController.line,
                figure
            };

            figure.controlPoints.forEach(x => {
                if (x instanceof AnchorControlPoint) {
                    x.show();
                }
            });
        }
    }

    public removeHintConnection(): void {
        if (!this.target) return;

        this.target.figure.controlPoints.forEach(x => {
            if (x instanceof AnchorControlPoint) {
                x.hide();
            }
        });

        // this.target.figure.item.strokeColor = new paper.Color('black');
        this.target = undefined;
    }
}
