import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TokenInterceptor } from '@interceptors/token.interceptor';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

export function getBaseUrl(): string {
    return document.getElementsByTagName('base')[0].href;
}

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        importProvidersFrom(HttpClientModule),
        provideAnimationsAsync()
    ]
}).catch(e => console.error(e));
