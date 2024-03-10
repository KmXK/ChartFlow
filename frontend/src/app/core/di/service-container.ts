import { ServiceStorage } from './service-storage';
import { InjectToken } from './types/type';

export class ServiceContainer {
    constructor(private readonly storage: ServiceStorage) {}

    public get<T>(type: InjectToken<T>): T {
        return this.storage.get(type);
    }

    public getAll<T>(type: InjectToken<T>): T[] {
        return this.storage.getAll(type);
    }
}
