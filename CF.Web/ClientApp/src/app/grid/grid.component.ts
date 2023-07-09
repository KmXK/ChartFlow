import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { WindowSizeService } from "../services/window-size.service";
import { Point } from "../shared/point";
import { Vector } from "../shared/vector";

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
    private scrollSensitivity = 12;

    @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
    context!: CanvasRenderingContext2D;

    size = { width: 0, height: 0 };
    delta = new Point(0, 0);
    currentDelta = new Point(0, 0);
    interval = -1;



    constructor(private readonly windowSizeService: WindowSizeService) {
    }

    ngOnInit(): void {
        this.windowSizeService.$size.subscribe(size => {
            this.onSizeChanged(size.width, size.height);
            window.requestAnimationFrame(() => this.drawLines());
        });
    }

    ngAfterViewInit(): void {
        this.context = this.canvas.nativeElement.getContext('2d')!;

        this.onSizeChanged(this.windowSizeService.currentWidth, this.windowSizeService.currentHeight);

        window.requestAnimationFrame(this.drawLines.bind(this));
    }

    onScroll(event: WheelEvent) {
        const delta = event.deltaY ? event.deltaY / Math.abs(event.deltaY) * this.scrollSensitivity : 0;

        if (event.shiftKey) {
            this.move(delta, 0);
        } else {
            this.move(0, delta);
        }
    }

    private move(dx: number, dy: number) {
        if (this.interval !== -1) clearInterval(this.interval);

        this.delta.x -= dx;
        this.delta.y -= dy;

        this.interval = setInterval(() => {
            console.log(`delta: ${this.delta}, current delta: ${this.currentDelta}`)
            if (this.delta.x === this.currentDelta.x && this.delta.y === this.currentDelta.y) {
                clearInterval(this.interval);
                this.interval = -1;
                return;
            }

            const movementVector = new Vector(this.currentDelta, this.delta);

            const direction = movementVector.normalize();

            const distance = movementVector.length < 1
                ? movementVector.length
                : movementVector.length / this.scrollSensitivity * 4;

            console.log(`movementVector.normalize(): ${movementVector.normalize()}`);

            this.currentDelta = this.currentDelta.move(direction.multiply(distance));

            window.requestAnimationFrame((() => {
                this.drawLines();
            }));
        }, 10);
    }

    private drawLines() {
        this.context.clearRect(0, 0, this.size.width, this.size.height);

        this.context.strokeStyle = '#000000';
        this.context.fillStyle = '#000000';
        this.context.lineWidth = 0.2;

        for (let x = this.currentDelta.x % 20; x < this.size.width; x += 20) {
            this.context.beginPath();
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.size.height);
            this.context.stroke();
        }

        for (let y = this.currentDelta.y % 20; y < this.size.height; y += 20) {
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
