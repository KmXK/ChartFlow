import { inject } from '@core/di';
import { Figure } from '@core/figures/base/figure';
import {
    MouseButton,
    MouseEvent
} from '@core/project/shared/events/mouse.event';
import { StateMachine } from '@core/state/state-machine';
import paper from 'paper';
import { SelectionController } from '../controllers';
import { EventHandler, EventHandlerOptions } from './event-handler';

enum MoveState {
    Idle,
    Waiting,
    Movement
}

export class MoveEventHandler extends EventHandler {
    private readonly selectionController = inject(SelectionController);
    private readonly view = inject(paper.View);

    private figures: Figure[] | undefined;

    private readonly state = new StateMachine(MoveState, {
        initState: MoveState.Idle,
        denyTransitions: {
            [MoveState.Idle]: [MoveState.Movement]
        }
    });

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (event.repeatCount > 1) return;
        if (
            event.button === MouseButton.Left &&
            options.plainFigures.length > 0 &&
            this.selectionController.isSelected(options.plainFigures[0])
        ) {
            this.state.transit(MoveState.Waiting);

            this.view.element.style.cursor = 'move';
            this.figures = this.selectionController.getSelection();
        }
    }

    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figures && event.button === MouseButton.Left) {
            this.view.element.style.cursor = 'default';

            this.figures = undefined;
            this.state.transit(MoveState.Idle);

            options.stopPropagation();
        }
    }

    public onDrag(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.figures) {
            if (this.state.in(MoveState.Waiting)) {
                this.state.transit(MoveState.Movement);

                //TODO: Move to controller logic
                this.figures.forEach(x => x.item.bringToFront());
            }

            for (const figure of this.figures) {
                const item = figure.item;
                item.position = item.position.add(event.delta);
            }

            options.stopPropagation();
        }
    }
}
