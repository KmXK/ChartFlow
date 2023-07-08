import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from "rxjs";

@Injectable()
export class WindowSizeService {
    private width = new Subject<number>();
    private height = new Subject<number>();
    private size = new Subject<{ width: number, height: number }>();

    public currentWidth = 0;
    public currentHeight = 0;
    public currentSize = {width: 0, height: 0};

    public $width = this.width.asObservable();
    public $height = this.height.asObservable();
    public $size = this.size.asObservable();

    constructor() {
        window.addEventListener('resize', this.onResize.bind(this));
        this.onSizeChanged(window.innerWidth, window.innerHeight);
    }

    private onResize(event: any) {
        const [width, height] = [event.target!.innerWidth, event.target!.innerHeight];

        this.onSizeChanged(width, height);
    }

    private onSizeChanged(width: number, height: number) {
        this.width.next(width);
        this.height.next(height);
        this.size.next({ width, height });

        this.currentWidth = width;
        this.currentHeight = height;
        this.currentSize = {width, height};
    }
}
