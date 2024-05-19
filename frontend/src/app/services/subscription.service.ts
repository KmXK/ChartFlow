import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SubscriptionPlan } from '@models/subscription-plan.model';
import { Subscription } from '@models/subscription.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {
    private http = inject(HttpClient);

    public getPlans(): Observable<SubscriptionPlan[]> {
        return this.http.get<SubscriptionPlan[]>('/api/active-plans');
    }

    public purchaseSubscription(planId: number): Observable<void> {
        return this.http.post<void>(`/api/purchase/${planId}`, {});
    }

    public getUserSubscription(): Observable<Subscription | undefined> {
        return this.http.get<Subscription | undefined>(`/api/subscription`);
    }
}
