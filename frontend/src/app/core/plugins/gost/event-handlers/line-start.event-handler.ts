import { inject } from '@core/di';
import { EventHandler } from '@core/project/event-handlers';
import { EventHandlerOptions } from '@core/project/event-handlers/event-handler';
import { MouseEvent } from '@core/project/shared/events/mouse.event';
import paper from 'paper';
import { LineStartController } from '../controllers/line-start.controller';
import { LineStartControlPoint } from '../figures/control-points/line-start.control-point';

export class LineStartEventHandler extends EventHandler {
    private readonly controller = inject(LineStartController);
    private readonly view = inject(paper.View);

    private target?: LineStartControlPoint;

    public onMouseMove(event: MouseEvent, options: EventHandlerOptions): void {
        if (options.plainFigures?.[0] instanceof LineStartControlPoint) {
            this.target = options.plainFigures[0] as LineStartControlPoint;
            this.view.element.style.cursor = 'pointer';
        } else if (this.target) {
            this.target = undefined;
            this.view.element.style.cursor = 'default';
        }
    }
}
