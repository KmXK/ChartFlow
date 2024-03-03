import { Injectable } from '@angular/core';
import { Sheet } from '@core/project/project';
import paper from 'paper';

@Injectable()
export class CanvasService {
    private sheet!: Sheet;
    private scope!: paper.PaperScope;

    public setCanvas(canvasElement: HTMLCanvasElement): void {
        this.scope = new paper.PaperScope();
        this.sheet = new Sheet(new paper.Project(canvasElement));
    }
}
