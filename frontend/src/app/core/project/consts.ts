import {
    ActionController,
    CanvasController,
    ControlPointController,
    EventMapperController,
    ExportActionController,
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
import { HelpActionController } from './controllers/action-registration-controllers/help.action-controller';
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
    CanvasController,
    ActionController,
    ExportActionController,
    HelpActionController
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
