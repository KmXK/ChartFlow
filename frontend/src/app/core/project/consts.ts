import {
    ControlPointController,
    EventMapperController,
    FigureController,
    FigureHitController,
    HtmlElementController,
    MouseEventCounter,
    OffsetController,
    PlaceController,
    SelectionController,
    ZoomController
} from './controllers';
import { PluginController } from './controllers/plugin.controller';
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
    PluginController
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
