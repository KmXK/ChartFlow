import { Injectable } from '@angular/core';
import { Sheet } from '@core/project/sheet';
import paper from 'paper';

@Injectable()
export class CanvasService {
    private sheet!: Sheet;
    private scope!: paper.PaperScope;

    public setCanvas(canvasElement: HTMLCanvasElement): void {
        this.scope = new paper.PaperScope();
        this.scope.settings.insertItems = false;

        this.sheet = new Sheet(new paper.Project(canvasElement));
    }

    public getSheet(): Sheet {
        return this.sheet;
    }
}
