import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from '@models/comment.model';
import { Extension } from '@models/extension.model';
import { Observable, ReplaySubject, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExtensionService {
    private http = inject(HttpClient);

    private readonly extensionsSubject = new ReplaySubject<Extension[]>(1);

    public readonly extensions$ = this.extensionsSubject.asObservable();

    constructor() {
        this.updateInstalledExtensions();
    }

    public getExtensions(): Observable<Extension[]> {
        return this.http.get<Extension[]>('/api/extension');
    }

    public installExtensions(extensionIdsToInstall: string[]): void {
        this.http
            .post<void>('/api/extension/install', {
                ids: extensionIdsToInstall
            })
            .subscribe(() => {
                window.location.reload();
            });
    }

    public updateInstalledExtensions(): void {
        this.http
            .get<Extension[]>('/api/extension?installed=true')
            .subscribe(extensions => {
                this.extensionsSubject.next(extensions);
            });
    }

    public getComments(id: string): Observable<Comment[]> {
        return this.http
            .get<
                Comment[] & { modifiedTime: string }
            >(`/api/extension/${id}/comments`)
            .pipe(
                map(comments =>
                    comments.map(comment => ({
                        ...comment,
                        modifiedTime: new Date(comment.modifiedTime)
                    }))
                )
            );
    }

    public addComment(
        extensionId: string,
        text: string,
        rating: number
    ): Observable<void> {
        return this.http.post<void>(`/api/extension/${extensionId}/comments`, {
            text,
            rating
        });
    }
}
