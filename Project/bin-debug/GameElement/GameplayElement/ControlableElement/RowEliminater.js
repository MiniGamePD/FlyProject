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
var RowEliminater = (function (_super) {
    __extends(RowEliminater, _super);
    function RowEliminater() {
        var _this = _super.call(this) || this;
        _this.sceneRowEliminater = new SceneRowEliminater(_this);
        _this.sceneRowEliminater.MoveTo(Scene.Columns / 2 - 1, 0);
        _this.eliminateType = EliminateType.Row;
        _this.range = Scene.Columns;
        return _this;
    }
    //todo
    RowEliminater.prototype.OnRotateACW = function () { };
    RowEliminater.prototype.GetRotateACWPosList = function () {
        return null;
    };
    RowEliminater.prototype.FillSceneElementArray = function () {
        this.sceneElements.push(this.sceneRowEliminater);
    };
    RowEliminater.prototype.OnEliminate = function () {
        _super.prototype.OnEliminate.call(this);
        var specialEliminateEvent = new SpecialEliminateRequestEvent();
        specialEliminateEvent.triggerElement = this.sceneRowEliminater;
        specialEliminateEvent.targetPosList = Tools.GetRowPosList(this.sceneRowEliminater.posx, this.sceneRowEliminater.posy, this.range);
        GameMain.GetInstance().DispatchEvent(specialEliminateEvent);
        return true;
    };
    RowEliminater.prototype.GetPreViewContainer = function () {
        var previewContainer = new egret.DisplayObjectContainer();
        var preview = this.sceneRowEliminater.GetPreView();
        previewContainer.addChild(preview);
        return previewContainer;
    };
    return RowEliminater;
}(EliminateTool));
__reflect(RowEliminater.prototype, "RowEliminater");
//# sourceMappingURL=RowEliminater.js.map