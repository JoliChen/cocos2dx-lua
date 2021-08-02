import { MouseCallback, MouseInputEvent, MouseWheelCallback, MouseWheelInputEvent } from 'pal/input';
import { system } from 'pal/system';
import { EventMouse } from '../../../cocos/core/platform/event-manager/events';
import { EventTarget } from '../../../cocos/core/event/event-target';
import { Vec2 } from '../../../cocos/core/math';
import { SystemEventType } from '../../../cocos/core/platform/event-manager/event-enum';

export class MouseInputSource {
    public support: boolean;
    private _eventTarget: EventTarget = new EventTarget();

    constructor () {
        this.support = !system.isMobile;
        this._registerEvent();
    }

    private _getLocation (event: jsb.MouseEvent): Vec2 {
        return new Vec2(event.x, event.y);
    }

    private _registerEvent () {
        jsb.onMouseDown = this._createCallback(SystemEventType.MOUSE_DOWN);
        jsb.onMouseMove = this._createCallback(SystemEventType.MOUSE_MOVE);
        jsb.onMouseUp =  this._createCallback(SystemEventType.MOUSE_UP);
        jsb.onMouseWheel = (event: jsb.MouseWheelEvent) => {
            const location = this._getLocation(event);
            const viewSize = system.getViewSize();
            const matchStandardFactor = 120;
            const inputEvent: MouseWheelInputEvent = {
                type: SystemEventType.MOUSE_WHEEL,
                x: location.x,
                y: viewSize.height - location.y,
                button: event.button,
                deltaX: event.wheelDeltaX * matchStandardFactor, // scale up to match the web interface
                deltaY: event.wheelDeltaY * matchStandardFactor,
                timestamp: performance.now(),
            };
            this._eventTarget.emit(SystemEventType.MOUSE_WHEEL, inputEvent);
        };
    }

    private _createCallback (eventType: string) {
        return (event: jsb.MouseEvent) => {
            const location = this._getLocation(event);
            const viewSize = system.getViewSize();
            const inputEvent: MouseInputEvent = {
                type: eventType,
                x: location.x,
                y: viewSize.height - location.y,
                button: event.button,
                timestamp: performance.now(),
            };
            // emit web mouse event
            this._eventTarget.emit(eventType, inputEvent);
        };
    }

    onDown (cb: MouseCallback) {
        this._eventTarget.on(SystemEventType.MOUSE_DOWN, cb);
    }
    onMove (cb: MouseCallback) {
        this._eventTarget.on(SystemEventType.MOUSE_MOVE, cb);
    }
    onUp (cb: MouseCallback) {
        this._eventTarget.on(SystemEventType.MOUSE_UP, cb);
    }
    onWheel (cb: MouseWheelCallback) {
        this._eventTarget.on(SystemEventType.MOUSE_WHEEL, cb);
    }
}
