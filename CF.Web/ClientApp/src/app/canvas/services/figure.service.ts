import { Injectable } from '@angular/core';
import { Figure } from '../../figures/base/figure';

@Injectable()
export class FigureService {
    private figures: Figure[] = []

    public getFigures(): Figure[] {
        return this.figures.slice();
    }


    public addFigure(figure: Figure): void {
        this.figures = [...this.figures, figure];
    }

    public addFigures(figures: Figure[]): void {
        figures.forEach(figure => this.addFigure(figure));
    }

    public removeFigure(figure: Figure): void {
        const figures = this.figures;

        const index = figures.indexOf(figure);

        if (index >= 0) {
            this.figures = figures.splice(index, 1);
        }
    }
}
