import { BaseUseCaseFigure } from '../base.figure';
import { ActionFigure } from '../main/action.figure';
import { ActorFigure } from '../main/actor.figure';
import { LineFigure } from './line.figure';

export class ConnectionLineFigure extends LineFigure {
    constructor(
        private readonly _data: [BaseUseCaseFigure, BaseUseCaseFigure]
    ) {
        super();
    }

    public update(): void {
        this.item.bringToFront();

        const fromTo = this._data[0].position
            .subtract(this._data[1].position)
            .normalize();

        let m1 = this.getModifier(this._data[0]);
        let m2 = this.getModifier(this._data[1]);

        if (
            m1 + m2 >
            this._data[0].position.getDistance(this._data[1].position)
        ) {
            const half =
                this._data[0].position.getDistance(this._data[1].position) / 2;
            m1 = m2 = half;
        }

        this.setStartTo(this._data[0].position.subtract(fromTo.multiply(m1)));
        this.setEndTo(this._data[1].position.add(fromTo.multiply(m2)));

        this._data[0].item.bringToFront();
        this._data[1].item.bringToFront();
    }

    get figures(): [BaseUseCaseFigure, BaseUseCaseFigure] {
        return [...this._data];
    }

    private getModifier(figure: BaseUseCaseFigure): number {
        if (figure instanceof ActorFigure) {
            return this.gipotenuse([
                figure.size.width / 2,
                figure.size.height / 2
            ]);
        } else if (figure instanceof ActionFigure) {
            return this.gipotenuse([
                figure.size.width / 2,
                figure.size.height / 2
            ]);
        }

        return 0;
    }

    private gipotenuse(value: [number, number]): number {
        return Math.sqrt(value[0] * value[0] + value[1] * value[1]);
    }
}
