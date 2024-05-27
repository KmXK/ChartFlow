import { Component, OnInit, inject, signal } from '@angular/core';
import { FigureSettings } from '@core/figure-settings';
import { SelectionController } from '@core/project/controllers';
import { CanvasService } from '../services/canvas.service';
import { CanvasToolbarElementComponent } from './canvas-toolbar-element/canvas-toolbar-element.component';

@Component({
    selector: 'app-canvas-toolbar',
    standalone: true,
    imports: [CanvasToolbarElementComponent],
    templateUrl: './canvas-toolbar.component.html',
    styleUrl: './canvas-toolbar.component.scss'
})
export class CanvasToolbarComponent implements OnInit {
    private readonly canvasService = inject(CanvasService);

    public settings = signal<FigureSettings[]>([]);

    public ngOnInit(): void {
        this.canvasService.sheet$.subscribe(sheet => {
            const selectionController = sheet.getService(SelectionController);
            selectionController.selection.on(selection => {
                if (selection.length === 1) {
                    this.settings.set(selection[0].figure.createSettings());
                } else {
                    this.settings.set([]);
                }
                console.log(this.settings());
            });
        });
    }
}
