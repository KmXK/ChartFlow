export class CacheGate {
    private readonly storage: (() => void)[] = [];

    private isClose: boolean = true;

    public open(): void {
        this.isClose = false;
        this.storage.forEach(x => x());
    }

    public close(): void {
        this.isClose = true;
    }

    public perform(action: () => void): void {
        if (!this.isClose) action();
        else this.storage.push(action);
    }
}
