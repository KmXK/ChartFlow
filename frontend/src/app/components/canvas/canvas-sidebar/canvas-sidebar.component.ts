import { Component } from '@angular/core';
import { TerminatorFigure } from '@core/figures/gost/terminator.figure';
import { CanvasSidebarElementComponent } from './canvas-sidebar-element/canvas-sidebar-element.component';

@Component({
    selector: 'app-canvas-sidebar',
    standalone: true,
    imports: [CanvasSidebarElementComponent],
    templateUrl: './canvas-sidebar.component.html',
    styleUrl: './canvas-sidebar.component.scss'
})
export class CanvasSidebarComponent {
    public elements = [
        {
            name: 'Terminator',
            creator: () => new TerminatorFigure(),
            defaultOptions: {
                size: [100, 40],
                text: 'Terminator'
            }
        }
    ];
}
