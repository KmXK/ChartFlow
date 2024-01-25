import {
    AfterViewInit,
    Component,
    ElementRef,
    inject,
    ViewChild
} from '@angular/core';
import { CanvasService } from './services/canvas.service';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrl: './canvas.component.scss',
    standalone: true,
    providers: [CanvasService]
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

    private readonly canvasService = inject(CanvasService);

    public ngAfterViewInit() {
        this.canvasService.setCanvas(this.canvas.nativeElement);
    }
}
