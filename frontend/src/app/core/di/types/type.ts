/* eslint-disable @typescript-eslint/no-explicit-any */

export type ServiceType<T = unknown> = new (...args: any[]) => T;
export type AbstractServiceType<T = unknown> = abstract new (
    ...args: any[]
) => T;

export type ParameterlessServiceType<T = unknown> = new () => T;

export type InjectToken<T = unknown> = ServiceType<T> | AbstractServiceType<T>;
