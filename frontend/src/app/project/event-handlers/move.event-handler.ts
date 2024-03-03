import { Figure } from 'src/app/figures/base/figure';
import { MouseButton, MouseEvent } from '../../shared/events/mouse.event';
import { SelectionController } from '../controllers/selection.controller';
import { Injector } from '../injector/injector';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class MoveEventHandler implements EventHandler {
    private readonly selectionController =
        this.injector.getController(SelectionController);

    private figure: Figure | undefined;

    constructor(private readonly injector: Injector) {}

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (event.button === MouseButton.Left && options.figures.length > 0) {
            this.injector.view.element.style.cursor = 'move';
            this.selectionController.selectFigure(
                (this.figure = options.figures[0])
            );

            options.stopPropagation();
        }
    }

    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figure && event.button === MouseButton.Left) {
            this.injector.view.element.style.cursor = 'default';
            this.figure = undefined;

            options.stopPropagation();
        }
    }

    public onDrag(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figure) {
            const item = this.figure.getItem();
            item.position = item.position.add(event.delta);

            options.stopPropagation();
        }
    }
}
