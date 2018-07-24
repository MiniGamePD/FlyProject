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
var BgmControlEvent = (function (_super) {
    __extends(BgmControlEvent, _super);
    function BgmControlEvent(bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, BgmControlEvent.EventName, bubbles, cancelable) || this;
    }
    BgmControlEvent.EventName = "BgmControlEvent";
    return BgmControlEvent;
}(egret.Event));
__reflect(BgmControlEvent.prototype, "BgmControlEvent");
var BgmControlType;
(function (BgmControlType) {
    BgmControlType[BgmControlType["Play"] = 0] = "Play";
    BgmControlType[BgmControlType["Stop"] = 1] = "Stop";
    BgmControlType[BgmControlType["FadeIn"] = 2] = "FadeIn";
    BgmControlType[BgmControlType["FadeOut"] = 3] = "FadeOut";
    BgmControlType[BgmControlType["Pause"] = 4] = "Pause";
    BgmControlType[BgmControlType["Resume"] = 5] = "Resume";
})(BgmControlType || (BgmControlType = {}));
//# sourceMappingURL=BgmControlEvent.js.map