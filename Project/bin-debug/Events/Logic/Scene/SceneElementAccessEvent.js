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
var SceneElementAccessEvent = (function (_super) {
    __extends(SceneElementAccessEvent, _super);
    function SceneElementAccessEvent(bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, SceneElementAccessEvent.EventName, bubbles, cancelable) || this;
        _this.startX = 0;
        _this.startY = 0;
        _this.endX = Scene.Columns - 1;
        _this.endY = Scene.Rows - 1;
        _this.answerType = SceneElementAccessAnswerType.Pos;
        _this.accessType = SceneElementType.None;
        return _this;
    }
    SceneElementAccessEvent.EventName = "SceneElementAccessEvent";
    return SceneElementAccessEvent;
}(egret.Event));
__reflect(SceneElementAccessEvent.prototype, "SceneElementAccessEvent");
var SceneElementAccessAnswerType;
(function (SceneElementAccessAnswerType) {
    SceneElementAccessAnswerType[SceneElementAccessAnswerType["Pos"] = 0] = "Pos";
    SceneElementAccessAnswerType[SceneElementAccessAnswerType["Instance"] = 1] = "Instance";
})(SceneElementAccessAnswerType || (SceneElementAccessAnswerType = {}));
//# sourceMappingURL=SceneElementAccessEvent.js.map