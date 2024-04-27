import { ServiceContainerBuilder } from '@core/di';
import { IPlugin } from './plugin';

export function loadPluginControllers(
    builder: ServiceContainerBuilder,
    plugin: IPlugin
): ServiceContainerBuilder {
    plugin.controllers.forEach(x => {
        builder.register(x.token, x.factory());
    });

    return builder;
}

export function loadPluginEventHandlers(
    builder: ServiceContainerBuilder,
    plugin: IPlugin
): ServiceContainerBuilder {
    plugin.eventHandlers.forEach(x => {
        builder.register(x.token, x.factory());
    });

    return builder;
}

export function loadPlugin(
    builder: ServiceContainerBuilder,
    plugin: IPlugin
): ServiceContainerBuilder {
    loadPluginControllers(builder, plugin);
    loadPluginEventHandlers(builder, plugin);
    return builder;
}

export function loadPlugins(
    builder: ServiceContainerBuilder,
    plugins: IPlugin[]
): ServiceContainerBuilder {
    plugins.forEach(p => loadPlugin(builder, p));
    return builder;
}
