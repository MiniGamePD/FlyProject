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
var SpecialBoxEliminateEvent = (function (_super) {
    __extends(SpecialBoxEliminateEvent, _super);
    function SpecialBoxEliminateEvent(bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, SpecialBoxEliminateEvent.EventName, bubbles, cancelable) || this;
    }
    SpecialBoxEliminateEvent.EventName = "SpecialBoxEliminateEvent";
    return SpecialBoxEliminateEvent;
}(egret.Event));
__reflect(SpecialBoxEliminateEvent.prototype, "SpecialBoxEliminateEvent");
//# sourceMappingURL=SpecialBoxEliminateEvent.js.map