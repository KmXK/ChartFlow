import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from "./canvas.component";
import { FigureService } from "./services/figure.service";
import { CanvasService } from "./services/canvas.service";
import { PointMappingService } from "./services/point-mapping.service";
import { FigureDetectorService } from "./services/figure-detector.service";

@NgModule({
    declarations: [CanvasComponent],
    imports: [CommonModule],
    exports: [CanvasComponent],
    providers: [
        CanvasService,
        PointMappingService,
        FigureService,
        FigureDetectorService
    ]
})
export class CanvasModule {
}
