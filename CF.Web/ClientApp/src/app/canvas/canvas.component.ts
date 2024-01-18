import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CanvasOffsetService } from './services/canvas-offset.service';
import { CanvasZoomService } from './services/canvas-zoom.service';
import { CanvasService } from './services/canvas.service';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrl: './canvas.component.scss',
    standalone: true,
    providers: [
        CanvasService,
        CanvasZoomService,
        CanvasOffsetService
    ]
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

    private readonly canvasService = inject(CanvasService);

    public ngAfterViewInit() {
        this.canvasService.setCanvas(this.canvas.nativeElement);
    }
}
