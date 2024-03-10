export type FrameEvent = {
    count: number;
    time: number;
    delta: number;
};

export function mapFrameEvent(event: {
    count: number;
    time: number;
    delta: number;
}): FrameEvent {
    return event;
}
