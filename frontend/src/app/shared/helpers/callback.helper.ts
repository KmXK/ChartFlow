export function mergeEventCallbacks<TEvent>(
    callbacks: ((event: TEvent) => void)[]
): (event: TEvent) => void {
    return event => callbacks.forEach(c => c(event));
}
