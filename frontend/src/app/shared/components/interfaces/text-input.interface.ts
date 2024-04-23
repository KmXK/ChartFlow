import { Observable } from 'rxjs';
import { TextInputOptions } from '../options';

export interface ICanvasTextInputComponent {
    textChanging: Observable<string>;
    textChanged: Observable<string>;

    get text(): string;
    set text(value: string);

    setCenterPosition(point: { x: number; y: number }): void;
    setOptions(options: TextInputOptions): void;
    blur(): void;
}
