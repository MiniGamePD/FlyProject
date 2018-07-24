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
//横排消除
var CrossEliminater = (function (_super) {
    __extends(CrossEliminater, _super);
    function CrossEliminater() {
        var _this = _super.call(this) || this;
        _this.sceneCrossEliminater = new SceneCrossEliminater(_this);
        _this.sceneCrossEliminater.MoveTo(Scene.Columns / 2 - 1, 0);
        _this.eliminateType = EliminateType.Cloumn;
        _this.range = Math.max(Scene.Rows, Scene.Columns);
        return _this;
    }
    //todo
    CrossEliminater.prototype.OnRotateACW = function () { };
    CrossEliminater.prototype.GetRotateACWPosList = function () {
        return null;
    };
    CrossEliminater.prototype.FillSceneElementArray = function () {
        this.sceneElements.push(this.sceneCrossEliminater);
    };
    CrossEliminater.prototype.OnEliminate = function () {
        _super.prototype.OnEliminate.call(this);
        var specialEliminateEvent = new SpecialEliminateRequestEvent();
        specialEliminateEvent.triggerElement = this.sceneCrossEliminater;
        specialEliminateEvent.targetPosList = Tools.GetCrossPosList(this.sceneCrossEliminater.posx, this.sceneCrossEliminater.posy, this.range);
        GameMain.GetInstance().DispatchEvent(specialEliminateEvent);
        return true;
    };
    CrossEliminater.prototype.GetPreViewContainer = function () {
        var previewContainer = new egret.DisplayObjectContainer();
        var preview = this.sceneCrossEliminater.GetPreView();
        previewContainer.addChild(preview);
        return previewContainer;
    };
    return CrossEliminater;
}(EliminateTool));
__reflect(CrossEliminater.prototype, "CrossEliminater");
//# sourceMappingURL=CrossEliminater.js.map