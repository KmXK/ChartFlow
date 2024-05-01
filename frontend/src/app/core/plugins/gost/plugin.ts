import { IPluginCreator } from '../plugin';
import { ConnectionHintController } from './controllers/connection-hint.controller';
import { LineStartController } from './controllers/line-start.controller';
import { LineController } from './controllers/line.controller';
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
            {
                token: LineStartController,
                factory: () => new LineStartController()
            },
            {
                token: ConnectionHintController,
                factory: () => new ConnectionHintController()
            },
            {
                token: LineController,
                factory: () => new LineController()
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
