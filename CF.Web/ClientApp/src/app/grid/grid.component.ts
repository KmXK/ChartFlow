import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { WindowSizeService } from "../services/window-size.service";

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
    private sensitivity = 12;

    @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
    context!: CanvasRenderingContext2D;

    size = { width: 0, height: 0 };
    delta = {x: 0, y: 0};
    isHorizontalScroll = false;

    constructor(private readonly windowSizeService: WindowSizeService) {
    }

    ngOnInit(): void {
        this.windowSizeService.$size.subscribe(size => {
            this.onSizeChanged(size.width, size.height);
            this.drawLines();
        });
    }

    ngAfterViewInit(): void {
        this.context = this.canvas.nativeElement.getContext('2d')!;

        this.onSizeChanged(this.windowSizeService.currentWidth, this.windowSizeService.currentHeight);

        this.drawLines();
    }

    @HostListener('window:wheel', ['$event'])
    onScroll(event: WheelEvent) {
        const delta = event.deltaY ? event.deltaY / Math.abs(event.deltaY) * this.sensitivity : 0;

        console.log(this.isHorizontalScroll);

        if (this.isHorizontalScroll) {
            this.delta.x -= delta;
        } else {
            this.delta.y -= delta;
        }

        this.drawLines();
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if ('ShiftLeft' === event.code) {
            this.isHorizontalScroll = true;
        }
    }

    @HostListener('window:keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        console.log(event);
        if ('ShiftLeft' === event.code) {
            this.isHorizontalScroll = false;
        }
    }

    private drawLines() {
        this.context.clearRect(0, 0, this.size.width, this.size.height);

        this.context.strokeStyle = '#000000';
        this.context.fillStyle = '#000000';
        this.context.lineWidth = 0.2;

        for (let x = this.delta.x % 20; x < this.size.width; x += 20) {
            this.context.beginPath();
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.size.height);
            this.context.stroke();
        }

        for (let y = this.delta.y % 20; y < this.size.height; y += 20) {
            this.context.beginPath();
            this.context.moveTo(0, y);
            this.context.lineTo(this.size.width, y);
            this.context.stroke();
        }
    }

    private onSizeChanged(width: number, height: number) {
        this.canvas.nativeElement.width = width;
        this.canvas.nativeElement.height = height;

        this.size = { width, height };
    }
}
