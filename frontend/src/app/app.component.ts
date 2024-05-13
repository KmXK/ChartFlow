import { Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { CanvasComponent } from './components/canvas/canvas.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [CanvasComponent, HeaderComponent]
})
export class AppComponent {}
