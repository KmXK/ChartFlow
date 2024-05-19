import { SubscriptionPlan } from './subscription-plan.model';

export interface Subscription {
    id: string;
    plan: SubscriptionPlan;
}
