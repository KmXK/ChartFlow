import { inject } from '@core/di';
import { TextFigure } from '@core/figures/text-figures/text.figure';
import { HtmlElementController } from '../controllers';
import { TextInputElement } from '../controllers/html/elements/text-input.element';
import { MouseEvent } from '../shared/events/mouse.event';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class TextEditEventHandler extends EventHandler {
    private readonly htmlController = inject(HtmlElementController);
    private target:
        | {
              figure: TextFigure<paper.Item>;
              input: TextInputElement;
          }
        | undefined;

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.target) {
            this.target.figure.setText(this.target.input.text);
            this.target.input.destroy();

            this.target = undefined;
        } else if (
            event.repeatCount === 2 &&
            options.figureTreeNodes.length > 0
        ) {
            const figure = options.plainFigures[0];

            if (!(figure instanceof TextFigure)) {
                return;
            }

            this.target = {
                input: this.htmlController.createTextInputFor(figure),
                figure
            };

            figure.setText('');
        }
    }
}
