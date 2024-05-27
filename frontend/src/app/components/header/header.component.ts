import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ExtensionsDialogComponent } from '@components/dialogs/extensions-dialog/extensions-dialog.component';
import { LoginDialogComponent } from '@components/dialogs/login-dialog/login-dialog.component';
import { ProfileDialogComponent } from '@components/dialogs/profile-dialog/profile-dialog.component';
import { AuthService } from '@services/auth.service';
import { UserInfo } from './../../services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly matDialog = inject(MatDialog);

    public readonly currentUser = signal<UserInfo | null>(null);

    public ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.currentUser.set(user);
            console.log(user);
        });
    }

    public signIn(): void {
        this.matDialog
            .open(LoginDialogComponent)
            .afterClosed()
            .subscribe(result => {});
    }

    public openProfile(): void {
        this.matDialog
            .open(ProfileDialogComponent)
            .afterClosed()
            .subscribe(() => {});
    }

    public manageExtensions(): void {
        this.matDialog
            .open(ExtensionsDialogComponent)
            .afterClosed()
            .subscribe(() => {});
    }

    public logout(): void {
        this.authService.logout();
    }
}
