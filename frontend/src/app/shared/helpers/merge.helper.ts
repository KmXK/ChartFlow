export function merge<T>(obj1: T, obj2: Partial<T>): T {
    const answer: Partial<T> = {};

    for (const key in obj1) {
        if (obj1[key] !== undefined && obj1[key] !== null)
            answer[key] = obj1[key];
    }
    for (const key in obj2) {
        if (obj2[key] !== undefined && obj2[key] !== null)
            answer[key] = obj2[key];
    }

    return answer as T;
}
