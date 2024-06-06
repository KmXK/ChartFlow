import { GostPluginCreator } from '@core/plugins/gost/plugin';
import { IPluginCreator } from '@core/plugins/plugin';
import { UseCasePluginCreator } from '@core/plugins/usecase/plugin';

export const pluginsCreators: Record<string, IPluginCreator> = {
    Gost: GostPluginCreator,
    'Use Case': UseCasePluginCreator
    // TODO: add helper
};
