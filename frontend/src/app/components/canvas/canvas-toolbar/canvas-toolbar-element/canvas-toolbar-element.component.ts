import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FigureSettings, FigureSettingsType } from '@core/figure-settings';
import { MaterialModule } from '@material/material.module';

@Component({
    selector: 'app-canvas-toolbar-element',
    standalone: true,
    imports: [MaterialModule, AsyncPipe, FormsModule],
    templateUrl: './canvas-toolbar-element.component.html',
    styleUrl: './canvas-toolbar-element.component.scss'
})
export class CanvasToolbarElementComponent {
    @Input() public setting!: FigureSettings;
    public readonly Type = FigureSettingsType;
}
