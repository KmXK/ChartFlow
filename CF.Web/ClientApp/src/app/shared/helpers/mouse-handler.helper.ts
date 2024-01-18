type TEvent = paper.MouseEvent;

// `stopPropagation` is `true` by default
export type MouseHandler =
    ((event: TEvent) => void) |
    {
        handler: (event: TEvent) => void,
        stopPropagation?: boolean
    };

export type MouseHandlers = {
    leftButtonHandler?: MouseHandler,
    rightButtonHandler?: MouseHandler,
    middleButtonHandler?: MouseHandler
};

export function selectMouseHandlerByButton(handlers: MouseHandlers): (event: TEvent) => void {
    const handlersMap: Record<number, MouseHandler | undefined> = {
        0: handlers.leftButtonHandler,
        2: handlers.rightButtonHandler,
        1: handlers.middleButtonHandler
    };

    return event => {
        const baseEvent = (event as any).event as MouseEvent;
        const button = baseEvent.button as number;
        const handler = handlersMap[button];

        if (handler) {
            if ('handler' in handler) {
                handler.handler(event);

                if (handler.stopPropagation !== false) {
                    event.stopPropagation();
                }
            } else {
                handler(event);
                event.stopPropagation();
            }
        }
    }
}
