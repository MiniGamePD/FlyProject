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
var NpcControlFinishEvent = (function (_super) {
    __extends(NpcControlFinishEvent, _super);
    function NpcControlFinishEvent(bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, NpcControlFinishEvent.EventName, bubbles, cancelable) || this;
    }
    NpcControlFinishEvent.EventName = "NpcControlFinishEvent";
    return NpcControlFinishEvent;
}(egret.Event));
__reflect(NpcControlFinishEvent.prototype, "NpcControlFinishEvent");
//# sourceMappingURL=NpcControlFinishEvent.js.map