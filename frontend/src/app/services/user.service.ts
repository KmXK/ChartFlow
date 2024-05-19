import { Injectable, inject } from '@angular/core';
import { Subscription } from '@models/subscription.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { SubscriptionService } from './subscription.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly authService = inject(AuthService);
    private readonly subscriptionService = inject(SubscriptionService);
    private readonly userSubscriptionSubject = new BehaviorSubject<
        Subscription | null | undefined
    >(undefined);

    public readonly userSubscription$ =
        this.userSubscriptionSubject.asObservable();

    constructor() {
        this.authService.user$.subscribe(userInfo => {
            if (!userInfo) {
                this.userSubscriptionSubject.next(undefined);
            } else {
                this.updateSubscription();
            }
        });
    }

    public updateSubscription(): void {
        this.userSubscriptionSubject.next(undefined);
        this.subscriptionService
            .getUserSubscription()
            .subscribe(subscription => {
                this.userSubscriptionSubject.next(subscription);
            });
    }
}
