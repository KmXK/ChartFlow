import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CanvasZoomService {
    private _prevZoom = 85;
    private _currentZoom = 100;

    public getIncreased(): number {
        let newValue = this._currentZoom;

        if (this._currentZoom < 40) {
            newValue += 5;
        } else if (this._currentZoom < 70) {
            newValue += 10;
        } else if (this._currentZoom < 100) {
            newValue += 15;
        } else if (this._prevZoom < this._currentZoom) {
            const delta = this._currentZoom - this._prevZoom;
            newValue += (delta + 5);
        } else {
            newValue = this._prevZoom;
        }

        return this.setCurrentZoom(newValue);
    }

    public getDecreased(): number {
        let newValue = this._currentZoom;

        if (this._currentZoom <= 40) {
            newValue -= 5;
        } else if (this._currentZoom <= 70) {
            newValue -= 10;
        } else if (this._currentZoom <= 100) {
            newValue -= 15;
        } else if (this._prevZoom > this._currentZoom) {
            const delta = this._prevZoom - this._currentZoom;
            newValue -= (delta - 5);
        } else {
            newValue = this._prevZoom;
        }

        return this.setCurrentZoom(newValue);
    }

    private setCurrentZoom(zoom: number): number {
        zoom = this.clampZoom(zoom);

        if (this._currentZoom != zoom) {
            this._prevZoom = this._currentZoom;
            this._currentZoom = zoom;
        }

        return this._currentZoom;
    }

    private clampZoom(zoom: number): number {
        if (zoom > 16000) return 16000;
        if (zoom < 15) return 15;
        return zoom;
    }
}
