import { Injectable } from '@angular/core';

@Injectable()
export class CanvasOffsetService {
    private _view!: paper.View;
    private _requiredOffset = new paper.Point(0, 0);
    private _smoothTime = 1;

    public setView(view: paper.View) {
        this._view = view;

        this._requiredOffset = new paper.Point(0, 0);
    }

    public changeOffset(deltaOffset: paper.PointLike) {
        if (!this._view) throw new Error('Not initialized view.');

        if (this._smoothTime > 0) {
            this._requiredOffset = this._requiredOffset.subtract(this._requiredOffset.multiply(this._smoothTime));
        }

        this._requiredOffset = this._requiredOffset.add(deltaOffset);
        this._smoothTime = 0;
    }

    public updateOffset(deltaTime: number) {
        if (!this._view) throw new Error('Not initialized view.');
        if (this._smoothTime >= 1) return;

        // можно отключить анимацию скроллинга
        this.smoothUpdateOffset(deltaTime);
    }

    private smoothUpdateOffset(deltaTime: number) {
        const prevSmoothTime = this._smoothTime;

        this._smoothTime += deltaTime / 0.1;

        if (this._smoothTime > 1) this._smoothTime = 1;

        const distance = this._requiredOffset.multiply(this._smoothTime - prevSmoothTime);

        this._view.center = this._view.center.add(distance);
    }
}
