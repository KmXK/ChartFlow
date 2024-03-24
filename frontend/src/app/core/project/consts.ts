import {
    EventMapperController,
    FigureController,
    FigureHitController,
    MouseEventCounter,
    OffsetController,
    PlaceController,
    SelectionController,
    ZoomController
} from './controllers';
import { ControlPointController } from './controllers/control-point.controller';
import { MoveEventHandler } from './event-handlers/move.event-handler';
import { OffsetEventHandler } from './event-handlers/offset.event-handler';
import { PlaceEventHandler } from './event-handlers/place.event-handler';
import { SelectionEventHandler } from './event-handlers/selection.event-handler';
import { SizeControlPointEventHandler } from './event-handlers/size-control-point.event-handler';
import { ZoomEventHandler } from './event-handlers/zoom.event-handler';

export const controllersClasses = [
    ZoomController,
    FigureController,
    FigureHitController,
    PlaceController,
    OffsetController,
    SelectionController,
    EventMapperController,
    MouseEventCounter,
    ControlPointController
];

export const eventHandlers = [
    ZoomEventHandler,
    OffsetEventHandler,
    SelectionEventHandler,
    MoveEventHandler,
    SizeControlPointEventHandler,
    PlaceEventHandler
];
