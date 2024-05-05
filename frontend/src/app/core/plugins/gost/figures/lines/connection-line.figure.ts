import { AnchorControlPoint } from '../control-points/anchor.control-point';
import { LineFigure } from './line.figure';

export class ConnectionLineFigure extends LineFigure {
    constructor(
        private readonly _data: [AnchorControlPoint, AnchorControlPoint]
    ) {
        super(_data[0].vector, _data[1].vector);
    }

    public update(): void {
        this.item.bringToFront();
        this.setStartTo(this._data[0].position);
        this.setEndTo(this._data[1].position, this._data[1].vector);
    }

    get figures(): [AnchorControlPoint, AnchorControlPoint] {
        return [...this._data];
    }
}
