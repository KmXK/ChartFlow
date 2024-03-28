import { inject } from '@core/di';
import { SizeControlPoint } from '@core/figures/control-points/size.control-point';
import { MouseEvent } from '@core/project/shared/events/mouse.event';
import paper from 'paper';
import { FigureController, SelectionController } from '../controllers';
import { ControlPointController } from '../controllers/control-point.controller';
import { EventHandler, EventHandlerOptions } from './event-handler';

enum SizeControlPointType {
    RightTop = 0,
    RightBottom = 1,
    LeftTop = 2,
    LeftBottom = 3
}

export class SizeControlPointEventHandler extends EventHandler {
    private readonly selectionController = inject(SelectionController);
    private readonly figureController = inject(FigureController);
    private readonly controlPointController = inject(ControlPointController);
    private readonly view = inject(paper.View);

    private data:
        | {
              controlPoint: SizeControlPoint;
              startTopLeft: paper.Point;
              startSize: paper.Size;
              startPointPosition: paper.Point;
              type: {
                  top: boolean;
                  left: boolean;
              };
          }
        | undefined;

    public onMouseMove(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.data) {
            if (
                options.plainFigures.length > 0 &&
                options.plainFigures[0] === this.data.controlPoint
            ) {
                return;
            }

            this.data = undefined;
            this.view.element.style.cursor = 'default';
        }

        if (
            options.plainFigures.length > 0 &&
            options.plainFigures[0] instanceof SizeControlPoint
        ) {
            const controlPoint = options.plainFigures[0];

            const figureItem = controlPoint.target.item;

            const sizePoints = controlPoint.target.controlPoints.filter(
                function (x): x is SizeControlPoint {
                    return x instanceof SizeControlPoint;
                }
            );

            console.log(sizePoints, controlPoint);

            if (sizePoints.length !== 4) {
                throw new Error(
                    'Invalid size control points count. Try to recheck logic.'
                );
            }

            if (!sizePoints.includes(controlPoint)) {
                throw new Error('Control point is not from this figure.');
            }

            const isLeft = sizePoints.some(
                p => p.item.position.x > controlPoint.item.position.x
            );
            const isTop = sizePoints.some(
                p => p.item.position.y > controlPoint.item.position.y
            );

            this.data = {
                controlPoint: controlPoint,
                startTopLeft: figureItem.bounds.topLeft,
                startSize: figureItem.bounds.size,
                startPointPosition: controlPoint.item.position,
                type: {
                    top: isTop,
                    left: isLeft
                }
            };

            this.view.element.style.cursor =
                +isTop ^ +isLeft ? 'nesw-resize' : 'nwse-resize';
        }
    }

    public onDrag(event: MouseEvent, options: EventHandlerOptions): void {
        if (this.data) {
            const item = this.data.controlPoint.target.item;

            const topLeft = new paper.Point(this.data.startTopLeft);
            const size = new paper.Size(this.data.startSize);

            const right = this.data.startTopLeft.x + this.data.startSize.width;
            const bottom =
                this.data.startTopLeft.y + this.data.startSize.height;

            // TODO: Change cursor type on inversing on size changing
            if (this.data.type.left) {
                if (event.point.x >= right) {
                    size.width = event.point.x - right;
                    topLeft.x = right;

                    this.view.element.style.cursor = 'nesw-resize';
                } else {
                    size.width = right - event.point.x;
                    topLeft.x = event.point.x;
                }
            } else {
                if (event.point.x <= topLeft.x) {
                    size.width = topLeft.x - event.point.x;
                    topLeft.x = event.point.x;
                } else {
                    size.width = event.point.x - topLeft.x;
                }
            }

            if (this.data.type.top) {
                if (event.point.y >= bottom) {
                    size.height = event.point.y - bottom;
                    topLeft.y = bottom;
                } else {
                    size.height = bottom - event.point.y;
                    topLeft.y = event.point.y;
                }
            } else {
                if (event.point.y <= this.data.startTopLeft.y) {
                    topLeft.y = event.point.y;
                    size.height = this.data.startTopLeft.y - event.point.y;
                } else {
                    size.height = event.point.y - topLeft.y;
                }
            }

            if (size.width === 0) size.width = 1;
            if (size.height === 0) size.height = 1;

            this.data.controlPoint.target.setSize(size);

            item.position = topLeft.add(size.divide(2));
        }
    }
}
