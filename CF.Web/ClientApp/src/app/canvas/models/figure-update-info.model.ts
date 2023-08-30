import { FigureUpdateType } from "../enums/figure-update-type.enum";
import { Figure } from "../../figures/base/figure";

export class FigureUpdateInfo {
    constructor(
        public type: FigureUpdateType,
        public figure: Figure
    ) {
    }
}
