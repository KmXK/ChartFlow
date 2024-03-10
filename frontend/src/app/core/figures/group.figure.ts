import paper from 'paper';
import { Figure } from './base/figure';

export type GroupFigureOptions =
    | {
          solid?: boolean;
          figures: Figure[];
      }
    | Figure[];

export class GroupFigure extends Figure {
    private readonly _initialFigures: Figure[];
    private readonly _plainFigures: Figure[];
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

    get solid(): boolean {
        return this._solid;
    }

    private static calculatePlainFigures(figures: Figure[]): Figure[] {
        return figures.reduce<Figure[]>((acc, x) => {
            // спорное решение насчёт солид, порешаем потом на моменте группировки
            if (x instanceof GroupFigure && !x.solid) {
                acc.push(...x._plainFigures);
            } else {
                acc.push(x);
            }
            return acc;
        }, []);
    }
}
