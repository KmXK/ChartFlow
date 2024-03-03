import { Figure } from '@core/figures/base/figure';
import { Controller, ControllerBase } from './base';

@Controller
export default class SelectionController extends ControllerBase {
    public selectFigure(figure: Figure): void {
        this.injector.project.deselectAll();
        figure.getItem().bringToFront();
        figure.getItem().selected = true;
    }
}
