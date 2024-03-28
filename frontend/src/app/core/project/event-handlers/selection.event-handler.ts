import { inject } from '@core/di';
import { SelectionBoxFigure } from '@core/figures/selection-box.figure';
import { FigureController, SelectionController } from '../controllers';
import { MouseButton, MouseEvent } from '../shared/events/mouse.event';
import { EventHandler, EventHandlerOptions } from './event-handler';

export class SelectionEventHandler extends EventHandler {
    private readonly selectionController = inject(SelectionController);
    private readonly figureController = inject(FigureController);

    private selectionBox: SelectionBoxFigure | undefined;
    private waitingForDeepSelect = false;

    public onClick(event: MouseEvent, options: EventHandlerOptions): void {
        if (
            event.button === MouseButton.Left &&
            options.figureTreeNodes.length === 0
        ) {
            this.selectionController.deselectAll();
        }
    }

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        // console.log(event, options);
        if (this.selectionBox) {
            throw new Error('Selection box cannot be set before onMouseDown');
        }

        console.log(options);

        if (
            event.button === MouseButton.Left &&
            options.figureTreeNodes.length === 0
        ) {
            this.selectionBox = new SelectionBoxFigure(event.point);
            this.figureController.addFigure(this.selectionBox);
        } else if (
            event.button === MouseButton.Left &&
            options.figureTreeNodes.length
        ) {
            const hit = options.figureTreeNodes[0];

            // TODO: нужно проверять не то, что конкретный объект выделенный, а то,
            // что он находится в выделенной группе (при free select), в будущем проверить, что он есть
            // в лесу
            this.waitingForDeepSelect = this.selectionController.isSelected(
                options.plainFigures[0]
            );

            if (!this.waitingForDeepSelect) {
                this.selectionController.freeSelect(hit);
            }
        }
    }

    public onDrag(event: MouseEvent, options: EventHandlerOptions): void {
        this.selectionBox?.selectTo(event.point);
    }

    // TODO: Change to Click, fix
    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        if (
            event.button === MouseButton.Left &&
            options.figureTreeNodes.length > 0 &&
            event.pairEvent &&
            this.waitingForDeepSelect
        ) {
            const hit = options.figureTreeNodes[0];

            this.selectionController.deepSelect(hit);
        }

        if (this.selectionBox) {
            this.selectionController.selectFigures(
                this.figureController.getFiguresInArea(
                    this.selectionBox.item.bounds
                )
            );

            this.figureController.removeFigure(this.selectionBox);
            this.selectionBox = undefined;
        }
    }
}
