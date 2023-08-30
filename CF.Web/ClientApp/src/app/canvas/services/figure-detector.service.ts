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

    public getFiguresByPoint(point: Point): Figure[] {
        return this.figureService.getFigures().filter(figure => figure.containsPoint(point));
    }
}
