import { MouseCallback, MouseInputEvent, MouseWheelCallback, MouseWheelInputEvent } from 'pal/input';
import { EventMouse } from '../../../cocos/core/platform/event-manager/events';
import { EventTarget } from '../../../cocos/core/event/event-target';
import { SystemEventType } from '../../../cocos/core/platform/event-manager/event-enum';

export class MouseInputSource {
    public support: boolean;
    private _eventTarget: EventTarget = new EventTarget();

    constructor () {
        this.support = false;  // TODO: pc-wechat
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
