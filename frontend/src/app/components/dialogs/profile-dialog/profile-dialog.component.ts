import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-profile-dialog',
    standalone: true,
    imports: [MaterialModule],
    templateUrl: './profile-dialog.component.html',
    styleUrl: './profile-dialog.component.scss'
})
export class ProfileDialogComponent {
    private readonly authService = inject(AuthService);
    private readonly dialogRef = inject(DialogRef);

    public subscriptionStatus = 'None';

    public purchaseSubscription(): void {
        console.log('purchase');
    }

    public logout(): void {
        console.log(this.authService);
        this.authService.logout();
        this.dialogRef.close();
    }
}
