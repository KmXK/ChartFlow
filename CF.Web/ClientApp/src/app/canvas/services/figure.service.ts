import { Injectable } from "@angular/core";
import { Figure } from "../../figures/base/figure";
import { Observable, Subject } from "rxjs";
import { FigureUpdateInfo } from "../models/figure-update-info.model";
import { FigureUpdate } from "../models/figure-update.model";
import { FigureUpdateType } from "../enums/figure-update-type.enum";

@Injectable()
export class FigureService {
    private figures: Figure[] = []
    private figureUpdates = new Subject<FigureUpdate>();

    public getFigures(): Figure[] {
        return this.figures.slice();
    }

    public getUpdates(): Observable<FigureUpdate> {
        return this.figureUpdates.asObservable();
    }

    public addFigure(figure: Figure): void {
        this.figureUpdates.next(new FigureUpdate(
            [...this.figures, figure],
            new FigureUpdateInfo(FigureUpdateType.Added, figure)));
        this.figures = [...this.figures, figure];
    }

    public addFigures(figures: Figure[]): void {
        figures.forEach(figure => this.addFigure(figure));
    }

    public removeFigure(figure: Figure): void {
        const figures = this.figures;

        const index = figures.indexOf(figure);

        if (index >= 0) {
            this.figureUpdates.next(new FigureUpdate(
                figures.splice(index, 1),
                new FigureUpdateInfo(FigureUpdateType.Removed, figure)));
            this.figures = figures.splice(index, 1);
        }
    }
}
