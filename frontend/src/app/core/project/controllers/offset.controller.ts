import { inject } from '@core/di';
import { FrameEvent } from '@core/project/shared/events/frame.event';
import paper from 'paper';
import { BehaviorSubject } from 'rxjs';
import Controller from './base';

export default class OffsetController extends Controller {
    private view = inject(paper.View);
    private requiredOffset = new paper.Point(0, 0);
    private currentOffset = new paper.Point(0, 0);
    private smoothTime = 1;

    private readonly offsetChangedSubject = new BehaviorSubject<paper.Point>(
        new paper.Point(0, 0)
    );
    public readonly offsetChanged = this.offsetChangedSubject.asObservable();

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
        this.currentOffset = this.currentOffset.add(offset);
        this.requiredOffset = new paper.Point(0, 0);
        this.smoothTime = 1;

        this.offsetChangedSubject.next(this.currentOffset.clone());
    }

    get offset(): paper.Point {
        return this.currentOffset;
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

        this.currentOffset = this.currentOffset.add(distance);
        this.view.center = this.view.center.add(distance);

        this.offsetChangedSubject.next(this.currentOffset.clone());
    }
}
