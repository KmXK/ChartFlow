import { Figure } from "../../figures/base/figure";
import { FigureUpdateInfo } from "./figure-update-info.model";

export class FigureUpdate {
    constructor(
        public figures: Figure[],
        public info: FigureUpdateInfo
    ) {
    }
}
