import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface RegistrationUserDto {
    login: string;
    email: string;
    password: string;
}

export interface LoginUserDto {
    login: string;
    password: string;
}

export interface UserInfo {
    id: string;
    login: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly accessTokenKey = 'access_token';
    private readonly refreshTokenKey = 'refresh_token';

    private readonly userSubject = new BehaviorSubject<UserInfo | null>(
        this.getUserInfo()
    );

    public readonly user = this.userSubject.asObservable();

    constructor(private http: HttpClient) {}

    public getToken(): string | null {
        return localStorage.getItem(this.accessTokenKey);
    }

    public getUserInfo(): UserInfo | null {
        const token = this.getToken();

        if (!token) return null;

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decodedValue = jwtDecode<any>(token);

            console.log(decodedValue);

            return {
                id: decodedValue.Id,
                login: decodedValue.unique_name,
                email: decodedValue.email
            };
        } catch (error) {
            console.error('Token decoding error', error);
            return null;
        }
    }

    public register(user: RegistrationUserDto): Observable<{ id: string }> {
        return this.http
            .post<{
                id: string;
                access: string;
                refresh: string;
            }>(`/api/register`, user)
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
            }>(`/api/login`, user)
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
            }>(`/api/refresh`, { refreshToken })
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

        this.userSubject.next(this.getUserInfo());
    }

    private clearTokens(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);

        this.userSubject.next(null);
    }
}
