import { InjectToken } from '@core/di/types/type';
import { Figure } from '@core/figures/base/figure';
import Controller from '@core/project/controllers/base';
import { EventHandler } from '@core/project/event-handlers';

export interface IFigurePluginInfo {
    name: string;
    factory: () => Figure;
}

// TODO: может заюзать конструкторы, тогда можно будет метод add заюзать и не передавать токен отдельно
export interface IEventHandlerPluginInfo {
    token: InjectToken;
    factory: () => EventHandler;
}

export interface IControllerPluginInfo {
    token: InjectToken;
    factory: () => Controller;
}

export interface IPluginInfo {
    name: string;
    figures: IFigurePluginInfo[];
    eventHandlers: IEventHandlerPluginInfo[];
    controllers: IControllerPluginInfo[];
}

export interface IPluginCreator {
    create: () => IPluginInfo;
}
