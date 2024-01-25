import { FrameEvent } from '../../shared/events/frame.event';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';

export class ZoomController implements Controller {
    private readonly view: paper.View;
    private prevZoom = 85;
    private currentZoom = 100;

    constructor(private readonly injector: Injector) {
        this.view = injector.view;
    }

    init() {}

    onFrame(event: FrameEvent) {}

    public setZoom(zoomSign: number, viewMousePosition: paper.PointLike) {
        const currentZoom = this.view.zoom;
        const newZoom =
            (zoomSign > 0 ? this.getIncreased() : this.getDecreased()) / 100;

        const projectMousePosition = this.view.viewToProject(viewMousePosition);

        const currentDistance = projectMousePosition.subtract(this.view.center);
        const newDistance = currentDistance
            .divide(newZoom)
            .multiply(currentZoom);

        this.view.center = projectMousePosition.subtract(newDistance);

        this.view.zoom = newZoom;
    }

    private getIncreased(): number {
        let newValue = this.currentZoom;

        if (this.currentZoom < 40) {
            newValue += 5;
        } else if (this.currentZoom < 70) {
            newValue += 10;
        } else if (this.currentZoom < 100) {
            newValue += 15;
        } else if (this.prevZoom < this.currentZoom) {
            const delta = this.currentZoom - this.prevZoom;
            newValue += delta + 5;
        } else {
            newValue = this.prevZoom;
        }

        return this.setCurrentZoom(newValue);
    }

    private getDecreased(): number {
        let newValue = this.currentZoom;

        if (this.currentZoom <= 40) {
            newValue -= 5;
        } else if (this.currentZoom <= 70) {
            newValue -= 10;
        } else if (this.currentZoom <= 100) {
            newValue -= 15;
        } else if (this.prevZoom > this.currentZoom) {
            const delta = this.prevZoom - this.currentZoom;
            newValue -= delta - 5;
        } else {
            newValue = this.prevZoom;
        }

        return this.setCurrentZoom(newValue);
    }

    private setCurrentZoom(zoom: number): number {
        zoom = this.clampZoom(zoom);

        if (this.currentZoom != zoom) {
            this.prevZoom = this.currentZoom;
            this.currentZoom = zoom;
        }

        return this.currentZoom;
    }

    private clampZoom(zoom: number): number {
        if (zoom > 16000) return 16000;
        if (zoom < 15) return 15;
        return zoom;
    }
}
