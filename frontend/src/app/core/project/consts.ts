import {
    ControlPointController,
    EventMapperController,
    FigureController,
    FigureHitController,
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
    PositionController
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
