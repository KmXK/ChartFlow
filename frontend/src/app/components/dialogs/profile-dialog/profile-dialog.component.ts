import { DialogRef } from '@angular/cdk/dialog';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { AuthService } from '@services/auth.service';
import { SubscriptionService } from '@services/subscription.service';
import { UserService } from '@services/user.service';
import { SubscriptionPlan } from './../../../models/subscription-plan.model';

@Component({
    selector: 'app-profile-dialog',
    standalone: true,
    imports: [MaterialModule, AsyncPipe],
    templateUrl: './profile-dialog.component.html',
    styleUrl: './profile-dialog.component.scss'
})
export class ProfileDialogComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly subscriptionService = inject(SubscriptionService);
    private readonly userService = inject(UserService);
    private readonly dialogRef = inject(DialogRef);

    public plans = signal<SubscriptionPlan[]>([]);
    public subscription = this.userService.userSubscription$;
    public isLoading = signal(false);

    public ngOnInit(): void {
        this.subscriptionService.getPlans().subscribe(plans => {
            this.plans.set(plans);
        });
    }

    public purchaseSubscription(planId: number): void {
        this.isLoading.set(true);
        this.subscriptionService.purchaseSubscription(planId).subscribe(() => {
            this.userService.updateSubscription();
            this.isLoading.set(false);
        });
    }

    public logout(): void {
        this.authService.logout();
        this.dialogRef.close();
    }
}
