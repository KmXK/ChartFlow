import { Figure } from '../../../figures/base/figure';
import { MouseButton, MouseEvent } from '../../../shared/events/mouse.event';
import { SelectionController } from '../../controllers/selection.controller';
import { Injector } from '../../injector/injector';
import { EventHandler, EventHandlerOptions } from '../event-handler';

export class MoveEventHandler implements EventHandler {
    private readonly selectionController =
        this.injector.getController(SelectionController);

    private moving = false;

    constructor(
        private readonly injector: Injector,
        private readonly figure: Figure
    ) {}

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        console.log(this);
        if (event.button === MouseButton.Left) {
            this.injector.view.element.style.cursor = 'move';
            this.selectionController.selectFigure(this.figure);
            this.moving = true;
            event.stopPropagation();
        }
    }

    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.moving && event.button === MouseButton.Left) {
            this.injector.view.element.style.cursor = 'default';
            this.moving = false;
            event.stopPropagation();
        }
    }

    public onDrag(event: MouseEvent, option: EventHandlerOptions): void {
        if (this.moving) {
            const item = this.figure.getItem();
            item.position = item.position.add(event.delta);
            event.stopPropagation();
        }
    }
}
