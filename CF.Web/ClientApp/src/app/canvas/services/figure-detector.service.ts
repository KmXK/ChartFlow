import { Injectable } from "@angular/core";
import { Point } from "../../shared/models/point.model";
import { Figure } from "../../figures/base/figure";
import { FigureService } from "./figure.service";

@Injectable()
export class FigureDetectorService {
    constructor(
        private figureService: FigureService
    ) {
    }

    public getFigureByPoint(point: Point): Figure | null {
        let figures = this.figureService.getFigures();

        for (let i = 0; i < figures.length; i++) {
            if (figures[i].figures) {
                figures[i].figures.forEach(f => f.zIndex = figures[i].zIndex + 0.000001);
                figures.push(...figures[i].figures);
            }
        }

        figures = figures
            .filter(figure => figure.containsPoint(point))
            .sort((f1, f2) => f2.zIndex - f1.zIndex);

        if (figures) {
            return figures[0];
        }

        return null;
    }
}
