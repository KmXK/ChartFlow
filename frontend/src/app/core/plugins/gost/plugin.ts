import { IPlugin } from '../plugin';
import { TerminatorFigure } from './figures/terminator.figure';

export const GostPlugin: IPlugin = {
    name: 'Gost',
    controllers: [],
    eventHandlers: [],
    figures: [
        {
            name: 'Terminator',
            factory: () => new TerminatorFigure()
        }
    ]
};
