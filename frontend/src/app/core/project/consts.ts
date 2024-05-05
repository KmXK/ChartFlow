import {
    CanvasController,
    ControlPointController,
    EventMapperController,
    FigureController,
    FigureHitController,
    GridController,
    HtmlElementController,
    MouseEventCounter,
    OffsetController,
    PlaceController,
    PositionController,
    SelectionController,
    ZoomController
} from './controllers';
import {
    MoveEventHandler,
    OffsetEventHandler,
    PlaceEventHandler,
    SelectionEventHandler,
    SizeControlPointEventHandler,
    TextEditEventHandler,
    ZoomEventHandler
} from './event-handlers';

export const controllersClasses = [
    ZoomController,
    FigureController,
    FigureHitController,
    PlaceController,
    OffsetController,
    SelectionController,
    EventMapperController,
    MouseEventCounter,
    ControlPointController,
    HtmlElementController,
    PositionController,
    GridController,
    CanvasController
];

export const eventHandlers = [
    ZoomEventHandler,
    OffsetEventHandler,
    SelectionEventHandler,
    MoveEventHandler,
    SizeControlPointEventHandler,
    PlaceEventHandler,
    TextEditEventHandler
];
