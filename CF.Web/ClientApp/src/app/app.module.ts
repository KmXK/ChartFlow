import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { WindowSizeService } from "./services/window-size.service";

@NgModule({
    declarations: [
        AppComponent,
        GridComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule
    ],
    providers: [WindowSizeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
