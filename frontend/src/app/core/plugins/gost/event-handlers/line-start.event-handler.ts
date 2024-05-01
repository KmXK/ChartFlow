import { inject } from '@core/di';
import { EventHandler } from '@core/project/event-handlers';
import { EventHandlerOptions } from '@core/project/event-handlers/event-handler';
import { MouseEvent } from '@core/project/shared/events/mouse.event';
import { StateMachine } from '@core/state/state-machine';
import { ConnectionHintController } from '../controllers/connection-hint.controller';
import { LineStartController } from '../controllers/line-start.controller';
import { BaseGostFigure } from '../figures/base.figure';
import { LineStartControlPoint } from '../figures/control-points/line-start.control-point';

enum LineStartState {
    Unfocused,
    Focused,
    Line
}

export class LineStartEventHandler extends EventHandler {
    private readonly controller = inject(LineStartController);
    private readonly connectionHintController = inject(
        ConnectionHintController
    );

    private state = new StateMachine(LineStartState, {
        initState: LineStartState.Unfocused
    });

    public onMouseMove(event: MouseEvent, options: EventHandlerOptions): void {
        if (options.plainFigures?.[0] instanceof LineStartControlPoint) {
            const point = options.plainFigures[0] as LineStartControlPoint;
            this.controller.focusHint(point);
            this.state.transit(LineStartState.Focused);
        } else if (this.state.in(LineStartState.Focused)) {
            this.controller.unfocusHint();
            this.state.transit(LineStartState.Unfocused);
        }
    }

    public onDrag(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.state.in(LineStartState.Line)) {
            this.controller.moveLine(event.point);

            if (options.plainFigures?.[0] instanceof BaseGostFigure) {
                this.connectionHintController.hintConnection(
                    options.plainFigures?.[0] as BaseGostFigure
                );
            } else {
                this.connectionHintController.removeHintConnection();
            }
        }
    }

    public onMouseDown(event: MouseEvent, options: EventHandlerOptions): void {
        if (options.plainFigures?.[0] instanceof LineStartControlPoint) {
            const point = options.plainFigures?.[0];

            this.state.transit(LineStartState.Line);
            this.controller.startLine(point.target);
            this.controller.moveLine(event.point);
        }
    }

    public onMouseUp(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.state.in(LineStartState.Line)) {
            this.state.transit(
                options.plainFigures?.[0] instanceof LineStartControlPoint
                    ? LineStartState.Focused
                    : LineStartState.Unfocused
            );

            if (this.state.in(LineStartState.Unfocused)) {
                this.controller.unfocusHint();
            }

            this.connectionHintController.removeHintConnection();

            if (options.plainFigures?.[0] instanceof BaseGostFigure) {
                this.controller.stopLine(options.plainFigures?.[0]);
            } else {
                this.controller.stopLine();
            }
        }
    }
}
