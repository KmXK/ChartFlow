import { Class } from '@core/shared/types/class';
import Controller from '../controllers/base';

import { Metadata } from '@core/di/metadata';
import 'reflect-metadata';

export interface Injector {
    get view(): paper.View;

    get project(): paper.Project;

    getController<TController extends Controller>(
        type: Class<TController>
    ): TController;
}

function getPropertyNameFromMetadataKey(metadataKey: string): string {
    return metadataKey.split(':')[1];
}

export function configureInjection<T extends object>(
    target: T,
    injector: Injector
): void {
    Reflect.getMetadataKeys(target.constructor).forEach(metadataKey => {
        const metadata: Metadata = Reflect.getMetadata(
            metadataKey,
            target.constructor
        );

        if (metadata && metadata.type) {
            const controller = injector.getController(
                metadata.type as unknown as Class<Controller>
            );

            Reflect.set(
                target,
                getPropertyNameFromMetadataKey(metadataKey),
                controller
            );
        }
    });
}
