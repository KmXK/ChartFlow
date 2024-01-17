import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(
    AppComponent,
    {
        providers: [
            { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
        ]
    })
    .catch(e => console.error(e));
