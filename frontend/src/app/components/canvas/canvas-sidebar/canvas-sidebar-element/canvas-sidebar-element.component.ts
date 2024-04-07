import { Component, Input, inject } from '@angular/core';
import { CanvasService } from '@components/canvas/services/canvas.service';
import { PlaceController } from '@core/project/controllers';

@Component({
    selector: 'app-canvas-sidebar-element',
    standalone: true,
    imports: [],
    templateUrl: './canvas-sidebar-element.component.html',
    styleUrl: './canvas-sidebar-element.component.scss'
})
export class CanvasSidebarElementComponent {
    @Input() public text: string = '';

    private readonly canvasService = inject(CanvasService);

    public createElement(text: string): void {
        const placeController = this.canvasService
            .getSheet()
            .getService(PlaceController);

        placeController.placeSquare({
            position: [0, 0],
            text,
            size: [100, 100]
        });
    }
}
