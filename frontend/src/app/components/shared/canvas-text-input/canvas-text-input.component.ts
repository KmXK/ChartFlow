import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
    signal
} from '@angular/core';
import { ICanvasTextInputComponent } from '@shared/components/interfaces/text-input.interface';
import { TextInputOptions } from '@shared/components/options';
import { merge } from '@shared/helpers/merge.helper';
import { BehaviorSubject, take } from 'rxjs';

const defaultOptions: TextInputOptions = {
    fontFamily: 'Times New Roman',
    fontSize: 10,
    textColor: 'black',
    backgroundColor: 'white',
    center: { x: 0, y: 0 }
};

@Component({
    selector: 'app-canvas-text-input',
    standalone: true,
    imports: [],
    templateUrl: './canvas-text-input.component.html',
    styleUrl: './canvas-text-input.component.scss'
})
export class CanvasTextInputComponent
    implements AfterViewInit, ICanvasTextInputComponent
{
    @ViewChild('element') private element?: ElementRef<HTMLSpanElement>;

    @Output() public textChanging = new EventEmitter<string>();
    @Output() public textChanged = new EventEmitter<string>();

    public options = signal<TextInputOptions>(defaultOptions);

    public width = signal(1);
    public height = signal('auto');

    private _textSubject = new BehaviorSubject<string>('');

    public ngAfterViewInit(): void {
        this.element?.nativeElement.focus();

        this._textSubject.pipe(take(1)).subscribe(x => {
            console.log(x);
            this.text = x;
            window
                .getSelection()
                ?.selectAllChildren(this.element!.nativeElement);
        });
    }

    public setOptions(options: Partial<TextInputOptions>): void {
        this.options.set(merge(defaultOptions, options));
    }

    public setCenterPosition(point: { x: number; y: number }): void {
        this.options.update(x => ({ ...x, center: point }));
    }

    set text(value: string) {
        if (!this.element) {
            console.log();
            this._textSubject.next(value);
            return;
        }

        this.element!.nativeElement.innerText = value;
    }

    get text(): string {
        if (!this.element) return '';

        return this.element!.nativeElement.innerText;
    }

    public blur(): void {
        this.element?.nativeElement.blur();
    }

    public input(): void {
        this.textChanged.emit(this.text);
    }
}
