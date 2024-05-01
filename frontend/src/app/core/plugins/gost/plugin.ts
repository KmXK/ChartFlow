import { IPluginCreator } from '../plugin';
import { LineStartController } from './controllers/line-start.controller';
import { LineStartEventHandler } from './event-handlers/line-start.event-handler';
import {
    ConditionFigure,
    DataFigure,
    ProcessFigure,
    SpecificProcessFigure,
    TerminatorFigure
} from './figures';

export const GostPluginCreator: IPluginCreator = {
    create: () => ({
        name: 'Gost',
        controllers: [
            // TODO: При комменте этих строк всё норм, почему???!?!?!?!?!?!?!?!
            {
                token: LineStartController,
                factory: () => new LineStartController()
            }
        ],
        eventHandlers: [
            {
                token: LineStartEventHandler,
                factory: () => new LineStartEventHandler()
            }
        ],
        figures: [
            {
                name: 'Terminator',
                factory: () => new TerminatorFigure()
            },
            {
                name: 'Process',
                factory: () => new ProcessFigure()
            },
            {
                name: 'Specific Process',
                factory: () => new SpecificProcessFigure()
            },
            {
                name: 'Condition',
                factory: () => new ConditionFigure()
            },
            {
                name: 'Data',
                factory: () => new DataFigure()
            }
        ]
    })
};
