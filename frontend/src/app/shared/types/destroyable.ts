export type Destroyable<T> = T & { destroy: () => void };
