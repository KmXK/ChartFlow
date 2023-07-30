import { Component } from '@angular/core';
import { CanvasService } from "../services/canvas.service";
import { combineLatest } from "rxjs";
import { Size } from "../shared/size.model";
import { Point } from "../shared/point.model";

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent {
    constructor(private readonly canvasService: CanvasService) {
        combineLatest([
            this.canvasService.sizeChanged$,
            this.canvasService.offsetChanged$,
            this.canvasService.mouseMoved$
        ])
            .subscribe(([size, offset, mousePos]) => {
                this.canvasService.draw(context => this.drawLines(context, size, offset, mousePos));
            });
    }

    private drawLines(context: CanvasRenderingContext2D, size: Size, offset: Point, mousePos: Point) {
        if (!context || !size) {
            return;
        }

        context.clearRect(0, 0, size.width, size.height);

        context.strokeStyle = '#000000';
        context.fillStyle = '#000000';
        context.lineWidth = 0.2;

        for (let x = offset.x % 20; x < size.width; x += 20) {
            context.save();
            if (Math.abs(mousePos.x - x) < 5) {
                context.strokeStyle = 'red';
                context.lineWidth = 2;
            } else {
                context.strokeStyle = '#000000';
            }

            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, size.height);
            context.stroke();

            context.restore();
        }

        for (let y = offset.y % 20; y < size.height; y += 20) {
            context.save();
            if (Math.abs(mousePos.y - y) < 5) {
                context.strokeStyle = 'red';
                context.lineWidth = 2;
            } else {
                context.strokeStyle = '#000000';
            }

            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(size.width, y);
            context.stroke();

            context.restore();
        }
    }
}
