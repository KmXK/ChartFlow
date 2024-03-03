import { Injectable } from '@angular/core';
import { Project } from '@core/project/project';
import * as paper from 'paper';

@Injectable()
export class CanvasService {
    private project!: Project;
    private scope!: paper.PaperScope;

    public setCanvas(canvasElement: HTMLCanvasElement): void {
        this.scope = new paper.PaperScope();
        this.project = new Project(new paper.Project(canvasElement));
    }
}
