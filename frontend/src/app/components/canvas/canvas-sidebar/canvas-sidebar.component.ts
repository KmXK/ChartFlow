import { Component, OnInit, inject, signal } from '@angular/core';
import {
    PluginController,
    PluginFigures
} from '@core/project/controllers/plugin.controller';
import { CanvasService } from '../services/canvas.service';
import { CanvasSidebarElementComponent } from './canvas-sidebar-element/canvas-sidebar-element.component';

@Component({
    selector: 'app-canvas-sidebar',
    standalone: true,
    imports: [CanvasSidebarElementComponent],
    templateUrl: './canvas-sidebar.component.html',
    styleUrl: './canvas-sidebar.component.scss'
})
export class CanvasSidebarComponent implements OnInit {
    public elements = signal<PluginFigures[]>([]);

    public readonly canvasService = inject(CanvasService);

    public ngOnInit(): void {
        this.canvasService.sheet$.subscribe(sheet => {
            const pluginController = sheet.getService(PluginController);
            this.elements.set(pluginController.getPluginFigures());
        });
    }
}
