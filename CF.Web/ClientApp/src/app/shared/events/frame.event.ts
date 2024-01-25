export type FrameEvent = {
    count: number;
    time: number;
    delta: number;
};

export function mapFrameEvent(event: any): FrameEvent {
    return event;
}
