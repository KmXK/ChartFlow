import { Inject, Injectable } from "@angular/core";
import { DrawingContext } from "../../figures/base/contexts/drawing-context.model";
import { BehaviorSubject, combineLatest } from "rxjs";
import { RectangleFigure } from "../../figures/rectangle.figure";
import { Size } from "../../shared/models/size.model";
import { GridFigure } from "../../figures/grid.figure";
import { CanvasMousePosition } from "../models/canvas-mouse-position.model";
import { Point } from "../../shared/models/point.model";
import { MouseEventContext } from "../../figures/base/contexts/mouse-event-context.model";
import { WINDOW } from "../../tokens/window.token";
import { PointMappingService } from "./point-mapping.service";
import { Vector } from "../../shared/models/vector.model";
import { MousePointerFigure } from "../../figures/mouse-pointer.figure";
import { FigureService } from "./figure.service";
import { FigureDetectorService } from "./figure-detector.service";
import { Figure } from "../../figures/base/figure";

@Injectable()
export class CanvasService {
    public readonly scrollSensitivity = 12;
    public context: CanvasRenderingContext2D | null = null;

    private offset = new Point(0, 0);

    private size = new BehaviorSubject(new Size(0, 0));
    private clientMousePosition = new BehaviorSubject(new Point(0, 0));
    private currentOffset = new BehaviorSubject(new Point(0, 0));
    private interval = -1;
    private draggingFigure: Figure | null = null;

    constructor(
        @Inject(WINDOW) private window: Window,
        private pointMappingService: PointMappingService,
        private figureService: FigureService,
        private figureDetectorService: FigureDetectorService
    ) {
        combineLatest([
            this.size,
            this.clientMousePosition,
            this.currentOffset
        ])
            .subscribe(() => {
                this.draw();
            });

        figureService.addFigures([
            new GridFigure(),
            new MousePointerFigure(),
            new RectangleFigure(new Point(0, 0), new Size(100, 100))
        ]);
    }

    public setSize(size: Size) {
        this.size.next(new Size(size.width, size.height));
    }

    public mouseDown(x: number, y: number) {
        if (!this.context) {
            return;
        }

        let redrawIsRequested = false;

        const globalPosition = this.pointMappingService.clientToGlobal(new Point(x, y), this.currentOffset.value, 1);

        this.draggingFigure = this.figureDetectorService.getFigureByPoint(globalPosition);

        if (!this.draggingFigure) {
            return;
        }

        const context = this.getMouseEventContext();

        context.requireRedraw = () => {
            redrawIsRequested = true
        };

        this.draggingFigure.mouseDown(context);

        if (redrawIsRequested) {
            this.draw();
        }
    }

    public mouseUp(x: number, y: number) {
        if (!this.context) {
            return;
        }

        let redrawIsRequested = false;

        if (!this.draggingFigure) {
            return;
        }

        const context = this.getMouseEventContext();

        context.requireRedraw = () => {
            redrawIsRequested = true
        };

        this.draggingFigure.mouseUp(context);

        if (redrawIsRequested) {
            this.draw();
        }
    }

    public moveMouse(x: number, y: number) {
        this.clientMousePosition.next(new Point(x, y));
    }

    public changeOffset(dx: number, dy: number) {
        if (this.interval !== -1) this.window.clearInterval(this.interval);

        this.offset = this.offset.subtract(new Point(dx, dy));

        if (new Vector(this.currentOffset.value, this.offset).length < this.scrollSensitivity) {
            this.currentOffset.next(this.offset.clone());
            return;
        }

        this.interval = 0;

        const calculateOffset = () => {
            const currentOffset = this.currentOffset.value;

            if (this.offset.x === currentOffset.x &&
                this.offset.y === currentOffset.y &&
                this.interval > 0
            ) {
                clearInterval(this.interval);
                this.interval = -1;
                return;
            }

            const movementVector = new Vector(currentOffset, this.offset);

            const direction = movementVector.normalize();

            const distance = movementVector.length < 1
                ? movementVector.length
                : movementVector.length / this.scrollSensitivity * 4;

            this.currentOffset.next(currentOffset.translate(direction.multiply(distance)));
        };

        calculateOffset();
        if (this.interval === 0) {
            this.interval = this.window.setInterval(calculateOffset, 30);
        }
    }

    private draw() {
        window.requestAnimationFrame(() => {
            if (!this.context) {
                return;
            }

            const size = this.size.value;
            const offset = this.currentOffset.value;
            const mousePosition = this.pointMappingService.clientToGlobal(this.clientMousePosition.value, offset, 1);

            // TODO: Current logic calls little offset for grid while resizing window
            this.context.canvas.width = size.width;
            this.context.canvas.height = size.height;

            this.context.clearRect(0, 0, size.width, size.height);

            const figures = this.figureService.getFigures();

            const context = new DrawingContext(
                this.context,
                size,
                offset,
                mousePosition,
                figures.map(x => x.clone())
            );

            figures
                .sort((f1, f2) => f1.zIndex - f2.zIndex)
                .forEach(figure => {
                    this.context!.save();
                    figure.draw(context);
                    this.context!.restore();
                });
        });
    }

    private getMouseEventContext(): MouseEventContext {
        if (!this.context) {
            throw new Error('Context is not initialized');
        }

        return new MouseEventContext(
            this,
            this.context,
            this.size.value,
            this.currentOffset.value,
            new CanvasMousePosition(
                this.clientMousePosition.value,
                this.pointMappingService.clientToGlobal(this.clientMousePosition.value, this.currentOffset.value, 1)),
            () => {
            }
        );
    }
}
