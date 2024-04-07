import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export function getBaseUrl(): string {
    return document.getElementsByTagName('base')[0].href;
}

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [{ provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }, provideAnimationsAsync()]
}).catch(e => console.error(e));
