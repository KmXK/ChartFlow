import { FigureSettings } from '@core/figure-settings/figure-settings';
import { fontSizeSetting } from '@core/figure-settings/settings';
import { event } from '@core/project/controllers/base/controller';
import paper from 'paper';
import { Figure } from '../base/figure';

export interface ITextContainer {
    setText(text: string): void;
}

export class TextFigure<TItem extends paper.Item>
    extends Figure<paper.Group>
    implements ITextContainer
{
    private readonly _text: paper.PointText;

    public readonly fontSizeChanged = event<[number]>();

    constructor(private readonly _baseItem: TItem) {
        const item = new paper.Group();

        item.addChild(_baseItem);

        super(item);

        const text = new paper.PointText([0, 0]);
        text.strokeColor = new paper.Color('black');
        text.fillColor = new paper.Color('black');
        text.strokeWidth = 0;
        text.fontSize = 12;
        text.fontFamily = 'Times New Roman';
        text.justification = 'center';

        this._text = text;
        item.addChild(this._text);
    }

    get baseItem(): TItem {
        return this._baseItem;
    }

    public setText(text: string): void {
        this._text.content = text.trim();
        this.setSize(this._baseItem.bounds.size);
    }

    get text(): string {
        return this._text.content;
    }

    get fontSize(): number {
        return +this._text.fontSize;
    }

    set fontSize(value: number) {
        this._text.fontSize = value;
        this.fontSizeChanged.fire(value);
    }

    get fontFamily(): string {
        return this._text.fontFamily;
    }

    set fontFamily(value: string) {
        this._text.fontFamily = value;
    }

    get textColor(): string {
        return this._text.fillColor!.toCSS(true);
    }

    set textColor(value: string) {
        this._text.fillColor = new paper.Color(value);
    }

    protected override setSizeImpl(size: paper.SizeLike): void {
        const sizeObj = new paper.Size(size);

        this._baseItem.bounds.size = sizeObj;
        this._text.position = this._baseItem.position;
    }

    public override createSettings(): FigureSettings[] {
        return [
            ...super.createSettings(),
            fontSizeSetting(this.fontSize, value => {
                this.fontSize = value;
            })
        ];
    }
}
