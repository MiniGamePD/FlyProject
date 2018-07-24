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
var PlaySoundEvent = (function (_super) {
    __extends(PlaySoundEvent, _super);
    function PlaySoundEvent(key, loops, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, PlaySoundEvent.EventName, bubbles, cancelable) || this;
        _this.Key = key;
        _this.Loops = loops;
        return _this;
    }
    //指的是sound effect
    PlaySoundEvent.EventName = "PlaySoundEvent";
    return PlaySoundEvent;
}(egret.Event));
__reflect(PlaySoundEvent.prototype, "PlaySoundEvent");
//# sourceMappingURL=PlaySoundEvent.js.map