import { Component } from '@angular/core';
import { CanvasService } from '@components/canvas/services/canvas.service';
import { HeaderComponent } from '@components/header/header.component';
import { CanvasComponent } from './components/canvas/canvas.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [CanvasComponent, HeaderComponent],
    styleUrl: './app.component.scss',
    providers: [CanvasService]
})
export class AppComponent {}
