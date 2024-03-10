import { InjectionMetakey } from './consts';
import { Metadata } from './metadata';
import { ServiceContainer } from './service-container';
import { ServiceStorage } from './service-storage';
import { InjectionPlace } from './types/injection-place';
import { InjectToken, ParameterlessServiceType } from './types/type';

import 'reflect-metadata';

export class ServiceContainerBuilder {
    private readonly storage = new ServiceStorage();

    public register<T>(token: InjectToken, service: T): void {
        this.storage.add(token, service);
    }

    public add<T>(type: ParameterlessServiceType<T>): void {
        const service = new type();

        this.storage.add(type, service);
    }

    public build(): ServiceContainer {
        this.resolveInjections();

        const container = new ServiceContainer(
            new ServiceStorage(this.storage)
        );

        this.storage.clear();

        return container;
    }

    private resolveInjections(): void {
        for (const [token, service] of this.storage) {
            Reflect.getMetadataKeys(token.constructor).forEach(metadataKey => {
                if (
                    typeof metadataKey !== 'string' ||
                    !metadataKey.startsWith(InjectionMetakey)
                ) {
                    return;
                }

                const metadata: Metadata = Reflect.getMetadata(
                    metadataKey,
                    token.constructor
                );

                if (metadata && metadata.type) {
                    const resolvedService = this.storage.get(metadata.type);

                    if (!resolvedService) {
                        throw new Error(
                            `Service ${token.name} could not be resolved: service ${metadata.type.name} wasn't registered in container`
                        );
                    }

                    const propertyName = metadataKey.split(':')[1];

                    Reflect.set(
                        service as object,
                        propertyName,
                        resolvedService,
                        service
                    );
                }
            });

            Object.getOwnPropertyNames(service).forEach(p => {
                const value = (service as Record<string, unknown>)[p];

                if (value instanceof InjectionPlace) {
                    if (!value.takeAll) {
                        (service as Record<string, unknown>)[p] =
                            this.storage.get(value.type);
                    } else {
                        // (service as Record<string, unknown>)[p] = [
                        //     ...this.services.entries()
                        // ]
                        //     .filter(
                        //         ([key]) =>
                        //             key instanceof value.type!.constructor
                        //     )
                        //     .map(([key, value]) => value);
                        (service as Record<string, unknown>)[p] =
                            this.storage.getAll(value.type);
                    }
                } else if (value instanceof Array) {
                    if (value.every(x => x instanceof InjectionPlace)) {
                        (service as Record<string, unknown>)[p] = (
                            value as InjectionPlace[]
                        ).map(x => this.storage.get(x.type));
                    }
                }
            });
        }
    }
}
