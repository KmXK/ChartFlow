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
        const figures = this.figureService
            .getFigures()
            .filter(figure => figure.containsPoint(point))
            .sort((f1, f2) => f1.zIndex - f2.zIndex);

        if (figures) {
            return figures[0];
        }

        return null;
    }
}
