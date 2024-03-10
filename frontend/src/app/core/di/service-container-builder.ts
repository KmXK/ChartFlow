import { InjectionMetakey } from './consts';
import { Metadata } from './metadata';
import { ServiceContainer } from './service-container';
import { InjectionPlace } from './types/injection-place';
import { InjectToken, ParameterlessServiceType } from './types/type';

import 'reflect-metadata';

export class ServiceContainerBuilder {
    private readonly services = new Map<InjectToken, unknown>();

    public register<T>(token: InjectToken, service: T): void {
        this.checkRegistered(token);

        this.services.set(token, service);
    }

    public add<T>(type: ParameterlessServiceType<T>): void {
        this.checkRegistered(type);

        const service = new type();

        this.services.set(type, service);
    }

    public build(): ServiceContainer {
        this.resolveInjections();

        const container = new ServiceContainer(new Map(this.services));

        this.services.clear();

        return container;
    }

    private resolveInjections(): void {
        for (const [token, service] of this.services) {
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
                    const resolvedService = this.services.get(metadata.type);

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
                            this.services.get(value.type);
                    } else {
                        (service as Record<string, unknown>)[p] = [
                            ...this.services.entries()
                        ]
                            .filter(
                                ([key]) =>
                                    key instanceof value.type!.constructor
                            )
                            .map(([key, value]) => value);
                    }
                } else if (value instanceof Array) {
                    if (value.every(x => x instanceof InjectionPlace)) {
                        (service as Record<string, unknown>)[p] = (
                            value as InjectionPlace[]
                        ).map(x => this.services.get(x.type));
                    }
                }
            });
        }
    }

    private checkRegistered(type: InjectToken): void {
        if (this.services.has(type)) {
            throw new Error(`Service was already registered: \${type.name}`);
        }
    }
}
