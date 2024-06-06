import { IPluginCreator } from '../plugin';
import { LineController } from './controllers/line.controller';
import { LineEventHandler } from './event-handlers/line.event-handler';
import { ActorFigure } from './figures';
import { ActionFigure } from './figures/main/action.figure';

export const UseCasePluginCreator: IPluginCreator = {
    create: () => ({
        name: 'Use Case',
        controllers: [
            {
                token: LineController,
                factory: () => new LineController()
            }
        ],
        eventHandlers: [
            {
                token: LineEventHandler,
                factory: () => new LineEventHandler()
            }
        ],
        figures: [
            {
                name: 'Actor',
                factory: () => new ActorFigure()
            },
            {
                name: 'Action',
                factory: () => new ActionFigure()
            }
        ]
    })
};
