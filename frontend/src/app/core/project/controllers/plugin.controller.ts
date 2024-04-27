import { Figure } from '@core/figures/base/figure';
import { plugins } from '../plugins';
import Controller from './base';

export interface PluginFigures {
    pluginName: string;
    figures: {
        name: string;
        factory: () => Figure;
    }[];
}

export class PluginController extends Controller {
    public getPluginFigures(): PluginFigures[] {
        // TODO: Make some plugin container
        return plugins.map(x => ({
            pluginName: x.name,
            figures: x.figures.map(x => ({
                name: x.name,
                factory: x.factory
            }))
        }));
    }
}
