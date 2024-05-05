import { inject } from '@core/di';
import paper from 'paper';
import { BehaviorSubject } from 'rxjs';
import Controller from '../base';

export default class CanvasController extends Controller {
    private readonly view = inject(paper.View);

    private readonly sizeChangedSubject = new BehaviorSubject<paper.Size>(
        new paper.Size(0, 0)
    );

    public readonly sizeChanged = this.sizeChangedSubject.asObservable();

    public init(): void {
        this.sizeChangedSubject.next(this.view.size.clone());
        this.view.onResize = () => {
            this.sizeChangedSubject.next(this.view.size.clone());
        };
    }
}
