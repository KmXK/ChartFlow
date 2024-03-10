import { InjectToken } from './types/type';

export class ServiceStorage {
    private readonly map: Map<InjectToken, unknown> = new Map();

    constructor(storage?: ServiceStorage) {
        if (storage) {
            this.map = new Map(storage.map);
        }
    }

    public add<T>(token: InjectToken<T>, service: T): void {
        this.checkRegistered(token);
        this.map.set(token, service);
    }

    public clear(): void {
        this.map.clear();
    }

    public get<T>(token: InjectToken<T>): T {
        const service = this.map.get(token) as T;

        if (!service) {
            throw new Error(`Service could not be resolved: ${token.name}`);
        }

        return service;
    }

    public getAll<T>(token: InjectToken<T>): T[] {
        const services = [...this.map.entries()]
            .filter(([key]) => key instanceof token!.constructor)
            .map(([key, value]) => value as T);

        return services;
    }

    // implement iterator
    public [Symbol.iterator](): IterableIterator<[InjectToken, unknown]> {
        return this.map.entries();
    }

    private checkRegistered(type: InjectToken): void {
        if (this.map.has(type)) {
            throw new Error(`Service was already registered: \${type.name}`);
        }
    }
}
