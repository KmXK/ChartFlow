import { inject, Injectable } from '@angular/core';
import * as paper from 'paper';
import { selectMouseHandlerByButton } from '../../shared/helpers/mouse-handler.helper';
import { CanvasZoomService } from './canvas-zoom.service';

@Injectable()
export class CanvasService {
    private scope = new paper.PaperScope();
    private project!: paper.Project;

    private canvasZoomService = inject(CanvasZoomService);

    public setCanvas(canvasElement: HTMLCanvasElement) {
        this.project = new paper.Project(canvasElement);
        this.init(canvasElement);
    }

    private init(canvasElement: HTMLCanvasElement) {
        canvasElement.onwheel = this.mouseWheelHandler.bind(this);

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
    }

    private leftMouseButtonClickHandler(event: paper.MouseEvent) {
        const rect = new paper.Path.Rectangle(event.point.add(-25), [50, 50]);
        rect.strokeColor = new paper.Color(0, 1);
        rect.fillColor = new paper.Color('red');

        rect.onFrame = () => {
            rect.rotate(1);
            rect.fillColor!.hue += 1;
        };

        this.project.activeLayer.addChild(rect);
    }

    private leftMouseButtonUpHandler(event: paper.MouseEvent) {
    }

    private mouseWheelHandler(event: WheelEvent) {
        if (event.ctrlKey) {
            const zoomSign = -Math.sign(event.deltaY);
            this.setZoom(zoomSign, [event.clientX, event.clientY]);
            event.preventDefault();
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
