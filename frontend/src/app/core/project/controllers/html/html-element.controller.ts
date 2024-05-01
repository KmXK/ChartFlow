import { CanvasService } from '@components/canvas/services/canvas.service';
import { inject } from '@core/di';
import { TextFigure } from '@core/figures/text-figures/text.figure';
import * as paper from 'paper';
import Controller from '../base';
import OffsetController from '../offset.controller';
import ZoomController from '../zoom.controller';
import { TextInputElement } from './elements/text-input.element';

export default class HtmlElementController extends Controller {
    private readonly canvasService = inject(CanvasService);
    private readonly offsetController = inject(OffsetController);
    private readonly zoomController = inject(ZoomController);
    private readonly view = inject(paper.View);

    public createTextInputFor(
        figure: TextFigure<paper.Item>
    ): TextInputElement {
        const zoom = this.zoomController.zoom;

        const center = this.view.projectToView(figure.item.position);

        const element = this.canvasService.createTextElement({
            fontFamily: figure.fontFamily,
            fontSize: figure.fontSize * zoom,
            textColor: figure.textColor,
            backgroundColor: 'transparent',
            center: center
        });

        element.text = figure.text;

        return new TextInputElement(
            element,
            () => element.destroy(),
            this.offsetController,
            this.zoomController
        );
    }
}
