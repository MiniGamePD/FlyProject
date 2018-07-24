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
var SpecialEliminateRequestEvent = (function (_super) {
    __extends(SpecialEliminateRequestEvent, _super);
    function SpecialEliminateRequestEvent(bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, SpecialEliminateRequestEvent.EventName, bubbles, cancelable) || this;
    }
    SpecialEliminateRequestEvent.EventName = "SpecialEliminateRequestEvent";
    return SpecialEliminateRequestEvent;
}(egret.Event));
__reflect(SpecialEliminateRequestEvent.prototype, "SpecialEliminateRequestEvent");
//# sourceMappingURL=SpecialEliminateRequestEvent.js.map