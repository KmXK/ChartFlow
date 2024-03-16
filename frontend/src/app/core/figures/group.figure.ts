import { Figure } from '@core/figures/base/figure';
import paper from 'paper';

export type GroupFigureOptions =
    | {
          solid?: boolean;
          figures: Figure[];
      }
    | Figure[];

export class GroupFigure extends Figure {
    private readonly _initialFigures: Figure[];
    private readonly _plainFigures: Set<Figure>;
    private readonly _solid: boolean;

    constructor(options: GroupFigureOptions) {
        const figures = Array.isArray(options) ? options : options.figures;

        super(new paper.Group(figures.map(x => x.item)));
        this._initialFigures = figures;
        this._plainFigures = GroupFigure.calculatePlainFigures(figures);

        this._solid = !!('solid' in options && options.solid);
    }

    public getFigures(): Figure[] {
        return [...this._plainFigures];
    }

    get childrenCount(): number {
        return this._initialFigures.length;
    }

    get children(): Figure[] {
        return [...this._initialFigures];
    }

    get solid(): boolean {
        return this._solid;
    }

    private containsFigure(figure: Figure): boolean {
        return this._plainFigures.has(figure);
    }

    private static calculatePlainFigures(figures: Figure[]): Set<Figure> {
        return figures.reduce((acc, x) => {
            // спорное решение насчёт солид, порешаем потом на моменте группировки
            // TODO: мб добавить solid
            if (x instanceof GroupFigure) {
                for (const figure of x._plainFigures.values()) {
                    acc.add(figure);
                }
            } else {
                acc.add(x);
            }
            return acc;
        }, new Set<Figure>());
    }
}
