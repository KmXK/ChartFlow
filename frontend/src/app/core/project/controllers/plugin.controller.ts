import { Figure } from '@core/figures/base/figure';
import { IPluginInfo } from '@core/plugins/plugin';
import Controller from './base';

export interface PluginFigures {
    pluginName: string;
    figures: {
        name: string;
        factory: () => Figure;
    }[];
}

export default class PluginController extends Controller {
    constructor(private readonly plugins: IPluginInfo[]) {
        super();
    }

    public getPluginFigures(): PluginFigures[] {
        // TODO: Make some plugin container
        return this.plugins.map(x => ({
            pluginName: x.name,
            figures: x.figures.map(x => ({
                name: x.name,
                factory: x.factory
            }))
        }));
    }
}
