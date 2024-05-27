import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { CanvasTextInputComponent } from '@components/shared/canvas-text-input/canvas-text-input.component';
import { TextFigure } from '@core/figures/text-figures/text.figure';
import { Sheet } from '@core/project/sheet';
import { ICanvasTextInputComponent } from '@shared/components/interfaces/text-input.interface';
import { TextInputOptions } from '@shared/components/options';
import { Destroyable } from '@shared/types/destroyable';
import paper from 'paper';
import { Observable, ReplaySubject, take } from 'rxjs';

@Injectable()
export class CanvasService {
    private sheetSubject = new ReplaySubject<Sheet>(1);
    private scope!: paper.PaperScope;
    private container!: ViewContainerRef;

    public setCanvas(canvasElement: HTMLCanvasElement): void {
        this.scope = new paper.PaperScope();
        this.scope.settings.insertItems = false;

        this.sheetSubject.next(
            new Sheet(new paper.Project(canvasElement), this)
        );
    }

    public setTextElementsContainer(container: ViewContainerRef): void {
        console.log(container);
        this.container = container;
    }

    get sheet$(): Observable<Sheet> {
        return this.sheetSubject;
    }

    public execute(action: (sheet: Sheet) => void): void {
        this.sheet$.pipe(take(1)).subscribe(sheet => action(sheet));
    }

    public createTextElement(
        figure: TextFigure<paper.Item>,
        options: TextInputOptions
    ): Destroyable<ICanvasTextInputComponent> {
        const component = this.container.createComponent(
            CanvasTextInputComponent
        );

        component.instance.setOptions(options);

        const fontSizeHandler = (value: number) => {
            component.instance.setOptions({ ...options, fontSize: value });
        };

        figure.fontSizeChanged.on(fontSizeHandler);

        return this.makeDestroyable(component, () => {
            figure.fontSizeChanged.off(fontSizeHandler);
        });
    }

    private makeDestroyable<T>(
        component: ComponentRef<T>,
        action?: () => void
    ): Destroyable<T> {
        const element = component.instance as unknown as Destroyable<T>;
        element.destroy = () => {
            component.destroy();
            action?.();
        };

        return element;
    }
}
