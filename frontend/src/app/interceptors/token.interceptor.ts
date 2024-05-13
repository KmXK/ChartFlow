import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    catchError,
    filter,
    switchMap,
    take,
    throwError
} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);

    constructor(public authService: AuthService) {}

    public intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const token = this.authService.getToken();
        if (token) {
            request = this.addToken(request, token);
        }

        return next.handle(request).pipe(
            catchError(error => {
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    return this.handle401Error(request, next);
                } else {
                    return throwError(() => error);
                }
            })
        );
    }

    private addToken(
        request: HttpRequest<unknown>,
        token: string
    ): HttpRequest<unknown> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private handle401Error(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap(result => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(result.access);
                    return next.handle(this.addToken(request, result.access));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(result => {
                    return next.handle(this.addToken(request, result!));
                })
            );
        }
    }
}
