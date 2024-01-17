import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as paper from 'paper';
import { CanvasService } from './services/canvas.service';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrl: './canvas.component.scss',
    standalone: true,
    providers: [
        CanvasService
    ]
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

    private project!: paper.Project;

    public ngAfterViewInit() {
        this.project = new paper.Project(this.canvas.nativeElement);
    }
}
