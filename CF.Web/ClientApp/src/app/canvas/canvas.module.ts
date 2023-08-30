import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from "./canvas.component";
import { CanvasService } from "./canvas.service";
import { PointMappingService } from "./point-mapping.service";

@NgModule({
    declarations: [CanvasComponent],
    imports: [CommonModule],
    exports: [CanvasComponent],
    providers: [CanvasService, PointMappingService]
})
export class CanvasModule {
}
