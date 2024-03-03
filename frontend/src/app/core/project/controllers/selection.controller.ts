import { Figure } from '@core/figures/base/figure';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';

export class SelectionController implements Controller {
    constructor(private readonly injector: Injector) {}

    public init(): void {}

    public selectFigure(figure: Figure): void {
        this.injector.project.deselectAll();
        figure.getItem().bringToFront();
        figure.getItem().selected = true;
    }
}
