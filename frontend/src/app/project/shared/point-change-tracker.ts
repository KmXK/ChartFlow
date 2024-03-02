export class PointChangeTracker {
    private lastPoint: paper.Point | null = null;

    // Returns true if the point has changed
    public track(point: paper.Point): boolean {
        const result = this.lastPoint !== null && !point.equals(this.lastPoint);

        this.lastPoint = point;
        return result;
    }

    get point(): paper.Point | null {
        return this.lastPoint;
    }
}
