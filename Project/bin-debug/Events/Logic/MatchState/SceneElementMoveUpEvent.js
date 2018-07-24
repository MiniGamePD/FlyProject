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
var SceneElementMoveUpEvent = (function (_super) {
    __extends(SceneElementMoveUpEvent, _super);
    function SceneElementMoveUpEvent(bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, SceneElementMoveUpEvent.EventName, bubbles, cancelable) || this;
        _this.isMoveSuccess = true;
        _this.moveUpValue = 0;
        _this.isMoveSuccess = true;
        _this.moveUpValue = 0;
        return _this;
    }
    SceneElementMoveUpEvent.EventName = "SceneElementMoveUpEvent";
    return SceneElementMoveUpEvent;
}(egret.Event));
__reflect(SceneElementMoveUpEvent.prototype, "SceneElementMoveUpEvent");
//# sourceMappingURL=SceneElementMoveUpEvent.js.map