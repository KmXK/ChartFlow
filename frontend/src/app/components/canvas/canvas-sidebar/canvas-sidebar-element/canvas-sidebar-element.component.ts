import { Component, Input, inject } from '@angular/core';
import { CanvasService } from '@components/canvas/services/canvas.service';
import { Figure } from '@core/figures/base/figure';
import { PlaceController } from '@core/project/controllers';

@Component({
    selector: 'app-canvas-sidebar-element',
    standalone: true,
    imports: [],
    templateUrl: './canvas-sidebar-element.component.html',
    styleUrl: './canvas-sidebar-element.component.scss'
})
export class CanvasSidebarElementComponent {
    @Input({ required: true }) public text!: string;
    @Input({ required: true }) public figureCreator!: () => Figure;

    private readonly canvasService = inject(CanvasService);

    public createElement(): void {
        const placeController = this.canvasService
            .getSheet()
            .getService(PlaceController);

        placeController.placeFigure(this.figureCreator());

        // placeController.placeSquare({
        //     position: [0, 0],
        //     text,
        //     size: [100, 100]
        // });
    }
}
