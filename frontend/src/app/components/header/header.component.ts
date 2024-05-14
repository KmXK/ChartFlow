import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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

    public readonly currentUser = signal<UserInfo | null>(null);

    public ngOnInit(): void {
        this.authService.user.subscribe(user => {
            this.currentUser.set(user);
            console.log(user);
        });
    }

    public signIn(): void {
        this.authService
            .login({
                login: 'KmX',
                password: '1'
            })
            .subscribe(() => {});
    }
}
