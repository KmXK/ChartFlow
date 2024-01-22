import { FrameEvent } from '../../shared/events/frame.event';
import { Controller, ControllerOptions } from './controller.interface';

export class OffsetController implements Controller {
    private requiredOffset = new paper.Point(0, 0);
    private smoothTime = 1;

    constructor(private readonly view: paper.View) {
    }

    onFrame(event: FrameEvent, option: ControllerOptions) {
        this.updateOffset(event.delta);
    }

    onWheel(event: WheelEvent, options: ControllerOptions) {
        const modifierCount = +event.ctrlKey + +event.altKey + +event.shiftKey;
        const deltaOffset = Math.sign(event.deltaY) * 30 / this.view.zoom;

        if (modifierCount == 0) {
            this.changeOffset([0, deltaOffset]);
            event.preventDefault();
        } else if (modifierCount === 1 && event.shiftKey) {
            this.changeOffset([deltaOffset, 0]);
            event.preventDefault();
        }
    }

    private changeOffset(deltaOffset: paper.PointLike) {
        if (this.smoothTime > 0) {
            this.requiredOffset = this.requiredOffset.subtract(this.requiredOffset.multiply(this.smoothTime));
        }

        this.requiredOffset = this.requiredOffset.add(deltaOffset);
        this.smoothTime = 0;
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
