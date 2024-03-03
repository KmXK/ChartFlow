import { inject } from '@core/di';
import { FrameEvent } from '@core/shared/events/frame.event';
import * as paper from 'paper';
import Controller from './base';

export default class OffsetController extends Controller {
    private view = inject(paper.View);
    private requiredOffset = new paper.Point(0, 0);
    private smoothTime = 1;

    public onFrame(event: FrameEvent): void {
        this.updateOffset(event.delta);
    }

    public changeOffset(deltaOffset: paper.PointLike): void {
        if (this.smoothTime > 0) {
            this.requiredOffset = this.requiredOffset.subtract(
                this.requiredOffset.multiply(this.smoothTime)
            );
        }

        this.requiredOffset = this.requiredOffset.add(deltaOffset);
        this.smoothTime = 0;
    }

    public setOffset(offset: paper.PointLike): void {
        this.view.center = this.view.center.add(offset);
        this.smoothTime = 1;
    }

    private updateOffset(deltaTime: number): void {
        if (this.smoothTime >= 1) return;

        // можно отключить анимацию скроллинга
        this.smoothUpdateOffset(deltaTime);
    }

    private smoothUpdateOffset(deltaTime: number): void {
        const prevSmoothTime = this.smoothTime;

        this.smoothTime += deltaTime / 0.1;

        if (this.smoothTime > 1) this.smoothTime = 1;

        const distance = this.requiredOffset.multiply(
            this.smoothTime - prevSmoothTime
        );

        this.view.center = this.view.center.add(distance);
    }
}
