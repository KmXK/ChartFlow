import { GostPluginCreator } from '@core/plugins/gost/plugin';
import { IPluginCreator } from '@core/plugins/plugin';

export const pluginsCreators: Record<string, IPluginCreator> = {
    Gost: GostPluginCreator
    // TODO: add helper
};
