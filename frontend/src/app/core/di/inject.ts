import { InjectionMetakey } from './consts';
import { InjectionPlace, InjectionPredicate } from './types/injection-place';
import { InjectToken, ServiceType } from './types/type';

export function Inject<T extends object>(type: ServiceType<T>) {
    return (target: object, propertyKey: string) => {
        const metadata = {
            type
        };

        return Reflect.defineMetadata(
            InjectionMetakey + propertyKey,
            metadata,
            target.constructor
        );
    };
}

export function inject(type: InjectToken[]): unknown[];
export function inject<T>(type: InjectToken<T>): T;
export function inject<T>(type: InjectToken<T> | InjectToken[]): T | unknown[] {
    if (type instanceof Array) {
        return type.map(t => inject(t));
    }

    return new InjectionPlace(type) as T;
}

export function injectIf<T>(predicate: (type: InjectToken) => boolean): T[] {
    return new InjectionPredicate(predicate) as unknown as T[];
}

export function injectAll<T>(type: InjectToken<T>): T[] {
    return new InjectionPlace(type, true) as unknown as T[];
}
