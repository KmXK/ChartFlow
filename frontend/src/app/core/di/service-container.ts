import { InjectToken, ServiceType } from './types/type';

export class ServiceContainer {
    constructor(private readonly services: Map<InjectToken, unknown>) {}

    public get<T>(type: ServiceType<T>): T {
        const service = this.services.get(type) as T;

        if (!service) {
            throw new Error(`Service could not be resolved: ${type.name}`);
        }

        return service;
    }
}
