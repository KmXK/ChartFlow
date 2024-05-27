import { Component, OnInit, inject, signal } from '@angular/core';
import PluginController, {
    PluginFigures
} from '@core/project/controllers/plugin.controller';
import { UserService } from '@services/user.service';
import { CanvasService } from '../services/canvas.service';
import { AdsComponent } from './ads/ads.component';
import { CanvasSidebarElementComponent } from './canvas-sidebar-element/canvas-sidebar-element.component';

@Component({
    selector: 'app-canvas-sidebar',
    standalone: true,
    imports: [CanvasSidebarElementComponent, AdsComponent],
    templateUrl: './canvas-sidebar.component.html',
    styleUrl: './canvas-sidebar.component.scss'
})
export class CanvasSidebarComponent implements OnInit {
    public elements = signal<PluginFigures[]>([]);

    public readonly canvasService = inject(CanvasService);
    public readonly userService = inject(UserService);

    public readonly showAds = signal(false);

    public ngOnInit(): void {
        this.canvasService.sheet$.subscribe(sheet => {
            const pluginController = sheet.getService(PluginController);
            this.elements.set(pluginController.getPluginFigures());
        });

        this.userService.userSubscription$.subscribe(subscription => {
            console.log(subscription);
            this.showAds.set(!subscription);
        });
    }
}
