import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CanvasService } from '@components/canvas/services/canvas.service';
import { Action } from '@core/actions/action';
import { ActionController } from '@core/project/controllers';
import { MaterialModule } from '@material/material.module';

@Component({
    selector: 'app-header-menu',
    standalone: true,
    imports: [MaterialModule, KeyValuePipe, AsyncPipe],
    templateUrl: './header-menu.component.html',
    styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent implements OnInit {
    private readonly canvasService = inject(CanvasService);

    public readonly groups = signal<Record<string, Action[]>>({});

    private readonly actionController = signal<ActionController>(undefined!);

    public ngOnInit(): void {
        this.canvasService.sheet$.subscribe(sheet => {
            this.actionController.set(sheet.getService(ActionController));
            this.groups.set(this.actionController().groups);
        });
    }
}
