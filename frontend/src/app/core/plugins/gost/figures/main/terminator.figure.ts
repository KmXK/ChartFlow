import * as paper from 'paper';
import { BaseGostFigure } from '../base.figure';

export class TerminatorFigure extends BaseGostFigure<paper.Path> {
    constructor() {
        const rect = new paper.Path();

        // TODO: Move color to options
        rect.strokeColor = new paper.Color('black');
        rect.fillColor = new paper.Color('white');
        super(rect);
    }

    // TODO: Add setFigureSizeImpl and call it from TextFigure.setSizeImpl and make it sealed to skip .bounds.size = size call
    protected override setSizeImpl(size: paper.SizeLike): paper.Size {
        const sizeObj = new paper.Size(size);

        super.setSizeImpl(sizeObj);

        const rect = this.baseItem;

        const position = this.baseItem.position;

        this.baseItem.position = new paper.Point(0, 0);
        this.baseItem.removeSegments();

        const radius = sizeObj.height / 2;
        const width = sizeObj.width;
        const height = sizeObj.height;

        const b_width = width - 2 * radius;

        const topLeft = this.baseItem.position.subtract(
            this.baseItem.bounds.size.divide(2)
        );

        rect.moveTo(topLeft.add([radius, 0]));
        rect.lineBy([b_width, 0]);
        rect.arcBy([radius, radius], [0, height]);
        rect.lineBy([-b_width, 0]);
        rect.arcBy([-radius, -radius], [0, -height]);

        rect.closePath();
        this.baseItem.position = position;

        return sizeObj;
    }

    public override validateSize(size: paper.SizeLike): paper.Size {
        const sizeObj = super.validateSize(size);

        if (sizeObj.width < sizeObj.height) {
            sizeObj.width = sizeObj.height;
        }

        return sizeObj;
    }
}
