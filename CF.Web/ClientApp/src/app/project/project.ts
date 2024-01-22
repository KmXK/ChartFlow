import { Figure } from '../figures/base/figure';
import { Controller, ControllerMethodPicker, ControllerOptions } from './controllers/controller.interface';
import { OffsetController } from './controllers/offset.controller';
import { PlaceController } from './controllers/place.controller';
import { ZoomController } from './controllers/zoom.controller';
import { Project as IProject } from './project.interface';

export class Project implements IProject {
    private readonly controllers: Controller[];

    constructor(private readonly project: paper.Project) {
        console.log(this.project)
        this.controllers = [
            new ZoomController(this.project.view),
            new PlaceController(this.project),
            new OffsetController(this.project.view)
        ];

        this.project.view.element.onwheel = this.controllersCallback(c => c.onWheel);

        this.project.view.on({
            mouseDown: this.controllersCallback(c => c.onMouseDown),
            mouseUp: this.controllersCallback(c => c.onMouseUp),
            click: this.controllersCallback(c => c.onClick),
            frame: this.controllersCallback(c => c.onFrame)
        });
    }

    setSelectionTo(...figures: Figure[]): void {
        throw new Error('Method not implemented.');
    }

    addToSelection(...figures: Figure[]): void {
        throw new Error('Method not implemented.');
    }

    delete(...figures: Figure[]): void {
        throw new Error('Method not implemented.');
    }

    private controllersCallback<TEvent>(
        callback: ControllerMethodPicker<TEvent>
    ): ((event: TEvent) => void) {
        return event => {
            let propagationStopped = false;
            const options: ControllerOptions = {
                stopPropagation() {
                    propagationStopped = true;
                }
            };

            for (const controller of this.controllers) {
                if (propagationStopped) break;

                callback(controller)?.apply(controller, [event, options]);
            }
        };
    }
}
