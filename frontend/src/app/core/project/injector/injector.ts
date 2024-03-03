import { Class } from '@core/shared/types/class';
import Controller from '../controllers/base';

import 'reflect-metadata';

export interface Injector {
    get view(): paper.View;

    get project(): paper.Project;

    getController<TController extends Controller>(
        type: Class<TController>
    ): TController;
}

type InjectionBaseClasses = Controller;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DerivedClass<TBase> = new <T extends TBase>(injector: Injector) => T;

const metakey = 'injection_metatype:';
type Metadata = {
    type: Class<DerivedClass<InjectionBaseClasses>>;
};

export function Inject<T extends InjectionBaseClasses>(type: Class<T>) {
    return (target: object, propertyKey: string) => {
        const metadata = {
            type
        };

        return Reflect.defineMetadata(
            metakey + propertyKey,
            metadata,
            target.constructor
        );
    };
}

function getPropertyNameFromMetadataKey(metadataKey: string): string {
    return metadataKey.split(':')[1];
}

export function configureInjection<T extends InjectionBaseClasses>(
    target: T,
    injector: Injector
): void {
    Reflect.getMetadataKeys(target.constructor).forEach(metadataKey => {
        const metadata: Metadata = Reflect.getMetadata(
            metadataKey,
            target.constructor
        );

        if (metadata && metadata.type) {
            const controller = injector.getController(
                metadata.type as unknown as Class<Controller>
            );

            Reflect.set(
                target,
                getPropertyNameFromMetadataKey(metadataKey),
                controller
            );
        }
    });
}
