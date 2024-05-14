import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';
import { RegistrationUserDto } from './../../../services/auth.service';

@Component({
    selector: 'app-login-dialog',
    standalone: true,
    imports: [MaterialModule, FormsModule],
    templateUrl: './login-dialog.component.html',
    styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
    private readonly authService = inject(AuthService);
    private readonly dialogRef = inject(DialogRef);

    public isLogin = false;
    public form!: FormGroup;
    public error = '';

    public loginData!: { login: string; password: string; email?: string };

    constructor() {
        this.init(false);
    }

    public init(isLogin: boolean): void {
        this.error = '';
        this.isLogin = isLogin;
        this.loginData = { login: '', password: '' };

        if (!isLogin) {
            this.loginData.email = '';
        }
    }

    public onSubmit(): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let stream: Observable<any>;

        if (this.isLogin) {
            stream = this.authService.login(this.loginData);
        } else {
            stream = this.authService.register(
                this.loginData as RegistrationUserDto
            );
        }

        stream.subscribe({
            next: result => {
                this.dialogRef.close(result);
            },
            error: result => {
                this.error = result.error;
            }
        });
    }
}
