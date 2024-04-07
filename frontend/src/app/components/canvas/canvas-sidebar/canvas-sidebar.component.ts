import { Component } from '@angular/core';
import { CanvasSidebarElementComponent } from './canvas-sidebar-element/canvas-sidebar-element.component';

@Component({
    selector: 'app-canvas-sidebar',
    standalone: true,
    imports: [CanvasSidebarElementComponent],
    templateUrl: './canvas-sidebar.component.html',
    styleUrl: './canvas-sidebar.component.scss'
})
export class CanvasSidebarComponent {
    public elements = ['Прямоугольник', 'Терминатор'];
}
