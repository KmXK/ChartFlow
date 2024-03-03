import { InjectToken } from './type';

export class InjectionPlace<T = unknown> {
    constructor(
        public readonly type: InjectToken<T>,
        public readonly takeAll: boolean = false
    ) {}
}

export class InjectionPredicate {
    constructor(public readonly predicate: (type: InjectToken) => boolean) {}
}
