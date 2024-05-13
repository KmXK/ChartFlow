import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@tokens/api-url.token';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface RegistrationUserDto {
    email: string;
    password: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly accessTokenKey = 'access_token';
    private readonly refreshTokenKey = 'refresh_token';

    constructor(
        private http: HttpClient,
        @Inject(API_URL) private readonly apiUrl: string
    ) {}

    public getToken(): string | null {
        return localStorage.getItem(this.accessTokenKey);
    }

    public register(user: RegistrationUserDto): Observable<{ id: string }> {
        return this.http
            .post<{
                id: string;
                access: string;
                refresh: string;
            }>(`${this.apiUrl}/auth/register`, user)
            .pipe(
                tap(data => {
                    this.storeTokens(data.access, data.refresh);
                }),
                map(data => ({ id: data.id }))
            );
    }

    public login(user: LoginUserDto): Observable<void> {
        return this.http
            .post<{
                access: string;
                refresh: string;
            }>(`${this.apiUrl}/auth/login`, user)
            .pipe(
                tap(data => {
                    this.storeTokens(data.access, data.refresh);
                }),
                map(() => void 0)
            );
    }

    public refreshToken(): Observable<{ access: string }> {
        const refreshToken = localStorage.getItem(this.refreshTokenKey);
        return this.http
            .post<{
                access: string;
            }>(`${this.apiUrl}/auth/refresh`, { refreshToken })
            .pipe(
                map(data => {
                    this.storeTokens(data.access, refreshToken!);
                    return { access: data.access };
                })
            );
    }

    public logout(): void {
        this.clearTokens();
    }

    private storeTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    private clearTokens(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }
}
