import { ICanvasTextInputComponent } from '@shared/components/interfaces/text-input.interface';
import * as paper from 'paper';
import OffsetController from '../../offset.controller';
import ZoomController from '../../zoom.controller';

export class TextInputElement {
    constructor(
        private readonly element: ICanvasTextInputComponent,
        private readonly destroyCallback: () => void,
        private readonly offsetController: OffsetController,
        private readonly zoomController: ZoomController
    ) {}

    public setPosition(point: { x: number; y: number }): void {
        const position = new paper.Point(point)
            .add(this.offsetController.offset)
            .multiply(this.zoomController.zoom);

        this.element.setCenterPosition(position);
    }

    set text(value: string) {
        this.element.text = value;
    }

    get text(): string {
        return this.element.text;
    }

    public destroy(): void {
        this.element.blur();
        this.destroyCallback();
    }
}
