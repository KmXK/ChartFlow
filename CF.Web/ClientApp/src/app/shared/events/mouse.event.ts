import * as paper from 'paper';

export enum MouseButton {
    Left = 1,
    Middle,
    Right
}

export interface MouseEvent extends paper.MouseEvent {
    button: MouseButton;
}

export function mapMouseEvent(event: paper.MouseEvent): MouseEvent {
    const e = event as MouseEvent;
    e.button = getMouseButton((event as any).event);
    return e;
}

function getMouseButton(event: any): MouseButton {
    return event.which
        ? event.which
        : event.button === 1
          ? 1
          : event.button === 2
            ? 3
            : event.button === 4
              ? 2
              : 1;
}
