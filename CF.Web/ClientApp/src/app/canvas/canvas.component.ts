import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CanvasService } from "./canvas.service";
import { WindowSizeService } from "../services/window-size.service";
import { Size } from "../shared/models/size.model";

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
    private observer: ResizeObserver | null = null;

    @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

    constructor(
        private windowSizeService: WindowSizeService,
        private canvasService: CanvasService
    ) {
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }

    ngAfterViewInit(): void {
        this.observer = new ResizeObserver(entries => {
            const { blockSize: height, inlineSize: width } = entries[0].borderBoxSize[0];
            
            this.canvas.nativeElement.width = width;
            this.canvas.nativeElement.height = height;
            this.canvasService.setSize(new Size(width, height));
        });

        this.observer.observe(this.canvas.nativeElement);

        this.canvasService.context = this.canvas.nativeElement.getContext('2d');
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
}
