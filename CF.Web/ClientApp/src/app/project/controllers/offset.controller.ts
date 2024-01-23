import * as paper from 'paper';
import { FrameEvent } from '../../shared/events/frame.event';
import { Injector } from '../injector/injector';
import { Controller } from './base/controller.interface';

export class OffsetController implements Controller {
    private view!: paper.View;
    private requiredOffset = new paper.Point(0, 0);
    private smoothTime = 1;

    constructor(private readonly injector: Injector) {
    }

    init() {
        this.view = this.injector.view;
    }

    public onFrame(event: FrameEvent) {
        this.updateOffset(event.delta);
    }

    public changeOffset(deltaOffset: paper.PointLike) {
        if (this.smoothTime > 0) {
            this.requiredOffset = this.requiredOffset.subtract(this.requiredOffset.multiply(this.smoothTime));
        }

        this.requiredOffset = this.requiredOffset.add(deltaOffset);
        this.smoothTime = 0;
    }

    public setOffset(offset: paper.PointLike) {
        this.view.center = this.view.center.add(offset);
        this.smoothTime = 1;
    }

    private updateOffset(deltaTime: number) {
        if (this.smoothTime >= 1) return;

        // можно отключить анимацию скроллинга
        this.smoothUpdateOffset(deltaTime);
    }

    private smoothUpdateOffset(deltaTime: number) {
        const prevSmoothTime = this.smoothTime;

        this.smoothTime += deltaTime / 0.1;

        if (this.smoothTime > 1) this.smoothTime = 1;

        const distance = this.requiredOffset.multiply(this.smoothTime - prevSmoothTime);

        this.view.center = this.view.center.add(distance);
    }
}
