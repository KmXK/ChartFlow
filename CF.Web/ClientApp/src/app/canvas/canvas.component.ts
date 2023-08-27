import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CanvasService } from "./canvas.service";
import { WindowSizeService } from "../services/window-size.service";
import { Size } from "../shared/models/size.model";
import { CanvasState } from "./canvas-state.enum";

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
    private observer: ResizeObserver | null = null;
    private state = CanvasState.Default;

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

            this.canvasService.setSize(new Size(width, height));
        });

        this.observer.observe(this.canvas.nativeElement.parentElement!);

        this.canvasService.context = this.canvas.nativeElement.getContext('2d');
    }

    onScroll(event: WheelEvent) {
        if (this.state !== CanvasState.Default) {
            return;
        }

        const delta = event.deltaY ? event.deltaY / Math.abs(event.deltaY) * this.canvasService.scrollSensitivity : 0;

        if (event.shiftKey) {
            this.canvasService.changeOffset(delta, 0);
        } else {
            this.canvasService.changeOffset(0, delta);
        }
    }

    onMouseMove(event: MouseEvent) {
        if (this.state === CanvasState.Offsetting) {
            console.log(event);
            this.canvasService.changeOffset(-event.movementX, -event.movementY);
        }
        
        this.canvasService.moveMouse(event.offsetX, event.offsetY);
    }

    onMouseDown(event: MouseEvent) {
        // Middle button
        if (event.button === 1) {
            this.state = CanvasState.Offsetting;
        }
    }

    onMouseUp(event: MouseEvent) {
        this.state = CanvasState.Default;
    }
}
