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
var ReviveEvent = (function (_super) {
    __extends(ReviveEvent, _super);
    function ReviveEvent(bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, ReviveEvent.EventName, bubbles, cancelable) || this;
    }
    ReviveEvent.EventName = "ReviveEvent";
    return ReviveEvent;
}(egret.Event));
__reflect(ReviveEvent.prototype, "ReviveEvent");
//# sourceMappingURL=ReviveEvent.js.map