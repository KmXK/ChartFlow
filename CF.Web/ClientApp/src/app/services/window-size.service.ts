import { Inject, Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { WINDOW } from "../tokens/window.token";

@Injectable({ providedIn: 'root' })
export class WindowSizeService {
    public currentWidth = 0;
    public currentHeight = 0;
    public currentSize = { width: 0, height: 0 };
    private width = new Subject<number>();
    public width$ = this.width.asObservable();
    private height = new Subject<number>();
    public height$ = this.height.asObservable();
    private size = new Subject<{ width: number, height: number }>();
    public size$ = this.size.asObservable();

    constructor(@Inject(WINDOW) private windowRef: Window) {
        windowRef.addEventListener('resize', this.onResize.bind(this));
        this.onSizeChanged(windowRef.innerWidth, windowRef.innerHeight);
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
        this.currentSize = { width, height };
    }
}
