import { Figure } from '../figures/base/figure';

export interface Project {
    setSelectionTo(...figures: Figure[]): void;

    addToSelection(...figures: Figure[]): void;

    delete(...figures: Figure[]): void;
}
