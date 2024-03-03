import { Figure } from '@core/figures/base/figure';
import { FrameEvent } from '@core/shared/events/frame.event';
import Controller from './base';

export class RotateController extends Controller {
    private readonly figures = new Map<Figure, number>();

    public toggleRotation(figure: Figure): void {
        if (this.figures.has(figure)) {
            this.disableRotation(figure);
        } else {
            this.enableRotation(figure);
        }
    }

    public enableRotation(figure: Figure): void {
        if (this.figures.has(figure)) {
            return;
        }
        this.figures.set(figure, Math.random() * 50 - 25);
    }

    public disableRotation(figure: Figure): void {
        this.figures.delete(figure);
    }

    public onFrame(event: FrameEvent): void {
        for (const [figure, delta] of this.figures) {
            figure.getItem().rotate(event.delta * delta);
        }
    }
}
