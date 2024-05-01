import { inject } from '@core/di';
import Controller from '@core/project/controllers/base';
import paper from 'paper';
import { BaseGostFigure } from '../figures/base.figure';
import { LineFigure } from '../figures/lines/line.figure';
import { LineStartController } from './line-start.controller';

export class ConnectionHintController extends Controller {
    private readonly lineStartController = inject(LineStartController);

    private target?: {
        figure: BaseGostFigure;
        line: LineFigure;
    };

    public hintConnection(figure: BaseGostFigure): void {
        this.removeHintConnection();

        const line = this.lineStartController.line;
        if (!line) return;

        this.target = {
            line: this.lineStartController.line,
            figure
        };

        this.target.figure.item.strokeColor = new paper.Color('red');
    }

    public removeHintConnection(): void {
        if (!this.target) return;

        this.target.figure.item.strokeColor = new paper.Color('black');
        this.target = undefined;
    }
}
