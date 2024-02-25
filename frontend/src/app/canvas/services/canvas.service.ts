import { Injectable } from '@angular/core';
import * as paper from 'paper';
import { Project } from '../../project/project';

@Injectable()
export class CanvasService {
    private project!: Project;
    private scope!: paper.PaperScope;

    public setCanvas(canvasElement: HTMLCanvasElement): void {
        this.scope = new paper.PaperScope();
        this.project = new Project(new paper.Project(canvasElement));
    }
}
