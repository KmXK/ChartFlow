import { inject, Injectable } from '@angular/core';
import * as paper from 'paper';
import { SquareFigure } from '../../figures/square.figure';
import { selectMouseHandlerByButton } from '../../shared/helpers/mouse-handler.helper';
import { CanvasOffsetService } from './canvas-offset.service';
import { CanvasZoomService } from './canvas-zoom.service';

@Injectable()
export class CanvasService {
    private canvasElement!: HTMLCanvasElement;

    private scope = new paper.PaperScope();
    private project!: paper.Project;

    private canvasZoomService = inject(CanvasZoomService);
    private canvasOffsetService = inject(CanvasOffsetService);

    public setCanvas(canvasElement: HTMLCanvasElement) {
        this.canvasElement = canvasElement;
        this.project = new paper.Project(canvasElement);
        this.init();

        this.canvasOffsetService.setView(this.project.view);
    }

    private init() {
        this.registerEventHandlers();
    }

    private registerEventHandlers() {
        this.canvasElement.onwheel = this.mouseWheelHandler.bind(this);

        this.project.view.on({
            mousedown: selectMouseHandlerByButton({}),
            mouseup: selectMouseHandlerByButton({
                leftButtonHandler: event => this.leftMouseButtonUpHandler(event),
                rightButtonHandler: () => console.log('RIGHT'),
                middleButtonHandler: event => console.log(event)
            }),
            click: selectMouseHandlerByButton({
                leftButtonHandler: event => this.leftMouseButtonClickHandler(event)
            })
        });

        this.project.view.onFrame = (event: { delta: number }) => {
            this.canvasOffsetService.updateOffset(event.delta);
        }
    }

    private leftMouseButtonClickHandler(event: paper.MouseEvent) {
        this.project.activeLayer.addChild(new SquareFigure({
            leftTopCornerPosition: event.point.add(-25),
            size: [50, 50]
        }).getItem());
    }

    private leftMouseButtonUpHandler(event: paper.MouseEvent) {
    }

    private mouseWheelHandler(event: WheelEvent) {
        const modifierCount = +event.ctrlKey + +event.altKey + +event.shiftKey;

        // up - negative, down - positive
        const scrollSign = Math.sign(event.deltaY);
        const deltaOffset = scrollSign * 30 / this.project.view.zoom;

        if (modifierCount === 0) {
            this.canvasOffsetService.changeOffset([0, deltaOffset]);
            event.preventDefault();
        } else if (event.ctrlKey) {
            this.setZoom(-scrollSign, [event.clientX, event.clientY]);
            event.preventDefault();
        } else if (modifierCount === 1) {
            if (event.shiftKey) {
                this.canvasOffsetService.changeOffset([deltaOffset, 0]);
                event.preventDefault();
            }
        }
    }

    private setZoom(zoomSign: number, viewMousePosition: paper.PointLike) {
        const currentZoom = this.project.view.zoom;
        const newZoom = (zoomSign > 0
            ? this.canvasZoomService.getIncreased()
            : this.canvasZoomService.getDecreased()) / 100;

        const projectMousePosition = this.project.view.viewToProject(viewMousePosition);

        const currentDistance = projectMousePosition.subtract(this.project.view.center);
        const newDistance = currentDistance.divide(newZoom).multiply(currentZoom);

        this.project.view.center = projectMousePosition.subtract(newDistance);

        this.project.view.zoom = newZoom;
    }
}
