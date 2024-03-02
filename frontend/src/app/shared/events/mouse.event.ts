import * as paper from 'paper';

export enum MouseButton {
    Left = 1,
    Middle,
    Right
}

export interface MouseEvent extends paper.MouseEvent {
    button: MouseButton;
    repeatCount: number;
}

export function getMouseButton(event: {
    which?: number;
    button: number;
}): MouseButton {
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
