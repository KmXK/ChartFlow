import { inject } from '@core/di';
import { SelectionController } from '@core/project/controllers';
import Controller from '@core/project/controllers/base';
import { LineStartControlPoint } from '../figures/control-points/line-start.control-point';

export class LineStartController extends Controller {
    private readonly selectionController = inject(SelectionController);
    private points: LineStartControlPoint[] = [];

    public init(): void {
        this.selectionController.selection.on(figures => {
            console.log(figures);
            this.points.forEach(x => x.hide());
            this.points = figures.flatMap(x =>
                x.controlPoints.filter(
                    function (x): x is LineStartControlPoint {
                        return x instanceof LineStartControlPoint;
                    }
                )
            );
            this.points.forEach(x => x.show());
        });
    }
}
