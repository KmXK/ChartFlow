import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WindowSizeService } from "./services/window-size.service";
import { CanvasComponent } from './components/canvas/canvas.component';
import { CanvasService } from "./services/canvas.service";

@NgModule({
    declarations: [
        AppComponent,
        CanvasComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule
    ],
    providers: [
        WindowSizeService,
        CanvasService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
