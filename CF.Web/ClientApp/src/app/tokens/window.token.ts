import { inject, InjectionToken } from "@angular/core";
import { DOCUMENT } from "@angular/common";

export const WINDOW = new InjectionToken<Window>(
    'An abstraction over global Window object',
    {
        factory: () => {
            const { defaultView } = inject(DOCUMENT) as Document;

            if (!defaultView) {
                throw new Error('Window object is not available');
            }

            return defaultView;
        }
    }
)
