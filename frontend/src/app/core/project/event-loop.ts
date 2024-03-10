import { inject, injectAll } from '@core/di';
import paper from 'paper';
import { Optional } from '../shared/types/optional';
import {
    EventMapperController,
    FigureController,
    FigureHitController
} from './controllers';
import Controller from './controllers/base';
import {
    EventHandlerMethodPicker,
    EventHandlerOptions
} from './event-handlers/event-handler';
import { EventHandlerPipe } from './shared/event-handler-pipe';
import { FrameEvent, mapFrameEvent } from './shared/events/frame.event';
import { MouseEvent } from './shared/events/mouse.event';
import { mergeEventCallbacks } from './shared/helpers/callback.helper';

export class EventLoop {
    private readonly eventHandlerContainer = inject(EventHandlerPipe);
    private readonly view = inject(paper.View);
    private readonly figureHitController = inject(FigureHitController);
    private readonly figureController = inject(FigureController);
    private readonly eventMapperController = inject(EventMapperController);

    private readonly controllers = injectAll(Controller);

    // Нужно добавить регистрацию событий (лучше через декораторы для простоты)
    // внутрь контроллеров и возможность на них подписываться
    // Сами контроллеры будут события вызывать, а другие подписываться
    // После этого добавим контроллер, который будет включать/выключать контрольные точки для "выделения"

    public start(): void {
        this.view.element.onwheel = this.eventHandlerCallback(options =>
            this.eventHandlerContainer.eventHandlerCallback(
                x => x.onWheel,
                options
            )
        );

        const getMouseCallback = (
            methodPicker: EventHandlerMethodPicker<MouseEvent>
        ): ((event: paper.MouseEvent) => void) =>
            this.eventHandlerCallback(options =>
                this.eventHandlerContainer.eventHandlerCallback(
                    methodPicker,
                    options,
                    this.eventMapperController.mapMouseEvent.bind(
                        this.eventMapperController
                    )
                )
            );

        this.view.on({
            mousedown: getMouseCallback(x => x.onMouseDown),
            mouseup: getMouseCallback(x => x.onMouseUp),
            mousedrag: getMouseCallback(x => x.onDrag),
            // we use custom "click" event fired as a copy of "mouseup", see below
            // click: getMouseCallback(x => x.onClick),
            mousemove: getMouseCallback(x => x.onMouseMove),
            frame: this.eventHandlerCallback<FrameEvent>(options =>
                mergeEventCallbacks([
                    event => this.controllers.forEach(c => c.onFrame?.(event)),
                    this.eventHandlerContainer.eventHandlerCallback(
                        x => x.onFrame,
                        options,
                        mapFrameEvent
                    )
                ])
            )
        });
    }

    private eventHandlerCallback<TEvent>(
        callback: (
            options: Optional<EventHandlerOptions, 'stopPropagation'>
        ) => (event: TEvent) => boolean | void
    ): (event: TEvent) => void {
        return event => {
            const point = (event as { point?: paper.Point }).point;

            const figures =
                this.figureHitController.getFiguresUnderMouse(point);

            const options: Optional<EventHandlerOptions, 'stopPropagation'> = {
                figureTreeNodes:
                    this.figureController.foldPlainFigures(figures),
                plainFigures: figures
            };

            const stopped = callback(options)(event);

            // if "mouseup" hasn't been stopped in pipe,
            // fire "click" event with same information

            // "click" event is comfortable for easy plane handlers
            // who don't want to calculate mouse duration and want just to
            // handle click situation
            if (stopped === true) return;

            const mouseUpEvent = event as {
                type?: string;
                pairEvent: MouseEvent;
            };

            if (mouseUpEvent.type === 'mouseup' && mouseUpEvent.pairEvent) {
                const clickEvent: Optional<typeof mouseUpEvent, 'pairEvent'> =
                    mouseUpEvent;
                clickEvent.type = 'click';
                delete clickEvent.pairEvent;

                this.eventHandlerContainer.eventHandlerCallback(
                    x => x.onClick,
                    options,
                    this.eventMapperController.mapMouseEvent.bind(
                        this.eventMapperController
                    )
                )(clickEvent as MouseEvent);
            }
        };
    }
}
