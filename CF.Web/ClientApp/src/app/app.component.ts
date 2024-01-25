import { Component } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [CanvasComponent]
})
export class AppComponent {}
