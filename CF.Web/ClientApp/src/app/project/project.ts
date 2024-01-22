import { Figure } from '../figures/base/figure';
import { Project as IProject } from './project.interface';

export class Project implements IProject {
    constructor(private readonly project: paper.Project) {
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

}
