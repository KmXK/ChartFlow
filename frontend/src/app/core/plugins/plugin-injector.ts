import { ServiceContainerBuilder } from '@core/di';
import { IPluginCreator, IPluginInfo } from './plugin';

export function loadPluginControllers(
    builder: ServiceContainerBuilder,
    plugin: IPluginInfo
): ServiceContainerBuilder {
    plugin.controllers.forEach(x => {
        builder.register(x.token, x.factory());
    });

    return builder;
}

export function loadPluginEventHandlers(
    builder: ServiceContainerBuilder,
    plugin: IPluginInfo
): ServiceContainerBuilder {
    plugin.eventHandlers.forEach(x => {
        builder.register(x.token, x.factory());
    });

    return builder;
}

export function loadPlugin(
    builder: ServiceContainerBuilder,
    plugin: IPluginInfo
): ServiceContainerBuilder {
    loadPluginControllers(builder, plugin);
    loadPluginEventHandlers(builder, plugin);
    return builder;
}

export function loadPlugins(
    builder: ServiceContainerBuilder,
    pluginsOrCreators: (IPluginInfo | IPluginCreator)[]
): IPluginInfo[] {
    const plugins: IPluginInfo[] = [];

    pluginsOrCreators.forEach(p => {
        const plugin = 'create' in p ? p.create() : p;
        loadPlugin(builder, plugin);
        plugins.push(plugin);
    });

    return plugins;
}
