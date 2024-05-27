import {
    AfterViewInit,
    Component,
    ElementRef,
    inject,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { CanvasSidebarComponent } from './canvas-sidebar/canvas-sidebar.component';
import { CanvasToolbarComponent } from './canvas-toolbar/canvas-toolbar.component';
import { CanvasService } from './services/canvas.service';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrl: './canvas.component.scss',
    standalone: true,
    imports: [CanvasSidebarComponent, CanvasToolbarComponent],
    providers: [CanvasService]
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas') private canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('textInputContainer', { read: ViewContainerRef })
    private container!: ViewContainerRef;

    private readonly canvasService = inject(CanvasService);

    public ngAfterViewInit(): void {
        this.canvasService.setTextElementsContainer(this.container);
        this.canvasService.setCanvas(this.canvas.nativeElement);
    }
}
