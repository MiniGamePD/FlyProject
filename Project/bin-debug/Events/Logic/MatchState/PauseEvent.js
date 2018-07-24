var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var PauseEvent = (function (_super) {
    __extends(PauseEvent, _super);
    function PauseEvent(bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, PauseEvent.EventName, bubbles, cancelable) || this;
    }
    PauseEvent.EventName = "PauseEvent";
    return PauseEvent;
}(egret.Event));
__reflect(PauseEvent.prototype, "PauseEvent");
//# sourceMappingURL=PauseEvent.js.map