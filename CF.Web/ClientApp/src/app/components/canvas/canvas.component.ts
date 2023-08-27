import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { WindowSizeService } from "../../services/window-size.service";
import { CanvasService } from "../../services/canvas.service";

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

    constructor(
        private windowSizeService: WindowSizeService,
        private canvasService: CanvasService
    ) {
        this.windowSizeService.size$.subscribe(size => {
            this.onSizeChanged(size.width, size.height);
        });
    }

    ngAfterViewInit(): void {
        this.canvasService.context = this.canvas.nativeElement.getContext('2d');

        this.onSizeChanged(this.windowSizeService.currentWidth, this.windowSizeService.currentHeight);
    }

    onScroll(event: WheelEvent) {
        const delta = event.deltaY ? event.deltaY / Math.abs(event.deltaY) * this.canvasService.scrollSensitivity : 0;

        if (event.shiftKey) {
            this.canvasService.move(delta, 0);
        } else {
            this.canvasService.move(0, delta);
        }
    }

    onMouseMove(event: MouseEvent) {
        this.canvasService.moveMouse(event.offsetX, event.offsetY);
    }

    private onSizeChanged(width: number, height: number) {
        this.canvas.nativeElement.width = width;
        this.canvas.nativeElement.height = height;

        this.canvasService.setSize({ width, height });
    }
}
