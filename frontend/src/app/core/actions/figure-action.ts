import { Figure } from '@core/figures/base/figure';
import { ActionBase } from './action';

export abstract class FigureAction extends ActionBase {
    constructor(protected readonly figure: Figure) {
        super();
    }
}
