import paper from 'paper';
import { Figure } from '../base/figure';
import { SizeControlPoint } from '../control-points/size.control-point';

export class TextFigure<TItem extends paper.Item> extends Figure<paper.Group> {
    private readonly _text: paper.PointText;

    constructor(private readonly _baseItem: TItem) {
        const item = new paper.Group();

        item.addChild(_baseItem);

        super(item);

        const text = new paper.PointText([0, 0]);
        text.strokeColor = new paper.Color('white');
        text.fillColor = new paper.Color('white');
        text.strokeWidth = 0;
        text.fontSize = 12;

        this._text = text;
        item.addChild(this._text);
    }

    get baseItem(): TItem {
        return this._baseItem;
    }

    public setText(text: string): void {
        this._text.content = text;
        this.setSize(this._baseItem.bounds.size);
    }

    protected override setSizeImpl(size: paper.SizeLike): void {
        const sizeObj = new paper.Size(size);

        this._baseItem.bounds.size = sizeObj;
        this._text.position = this._baseItem.position;
        // this._text.bounds.size = sizeObj.subtract(this._text.strokeWidth);

        this.controlPoints.forEach(cp => {
            if (cp instanceof SizeControlPoint) {
                cp.item.position = this._baseItem.bounds.topLeft.add(
                    this._baseItem.bounds.size.multiply(cp.delta)
                );
            }
        });
    }
}
