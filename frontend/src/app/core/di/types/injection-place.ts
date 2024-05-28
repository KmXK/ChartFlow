import { InjectToken, ServiceType } from './type';

export class InjectionPlace<T = unknown> {
    constructor(
        public readonly type: InjectToken<T>,
        public readonly takeAll: boolean = false
    ) {}
}

export class InjectionPredicate<T extends object> {
    constructor(
        public readonly predicate: (service: ServiceType<T>) => boolean
    ) {}
}
