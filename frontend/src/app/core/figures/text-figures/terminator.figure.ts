import paper from 'paper';
import { ControlPoint } from '../control-points/control-point';
import { SizeControlPoint } from '../control-points/size.control-point';
import { TextFigure } from './text.figure';

export class TerminatorFigure extends TextFigure<paper.Path.Rectangle> {
    constructor() {
        const rect = new paper.Path.Rectangle([0, 0], [1, 1]);
        rect.fillColor = new paper.Color('red');

        super(rect);
    }

    protected override setSizeImpl(size: paper.SizeLike): void {
        super.setSizeImpl(size);

        this.setCornerRadius(30);
    }

    private setCornerRadius(radius: number): void {
        for (let i = 0; i < 4; i++) {
            const segment = this.baseItem.segments[i];
            // Выставляем длину хэндлов (рукопожатий) в зависимости от радиуса
            segment.handleIn = segment.point
                .subtract(segment.previous.point)
                .normalize(radius);
            segment.handleOut = segment.point
                .subtract(segment.next.point)
                .normalize(radius);
        }
    }

    protected override createControlPoints(): ControlPoint[] {
        return [
            new SizeControlPoint(this, [0, 0]),
            new SizeControlPoint(this, [1, 0]),
            new SizeControlPoint(this, [0, 1]),
            new SizeControlPoint(this, [1, 1])
        ];
    }
}
