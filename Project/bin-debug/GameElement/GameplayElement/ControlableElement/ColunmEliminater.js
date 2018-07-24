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
var ColumnEliminater = (function (_super) {
    __extends(ColumnEliminater, _super);
    function ColumnEliminater() {
        var _this = _super.call(this) || this;
        _this.sceneColumnEliminater = new SceneColunmEliminater(_this);
        _this.sceneColumnEliminater.MoveTo(Scene.Columns / 2 - 1, 0);
        _this.eliminateType = EliminateType.Cloumn;
        _this.range = Scene.Rows;
        return _this;
    }
    //todo
    ColumnEliminater.prototype.OnRotateACW = function () { };
    ColumnEliminater.prototype.GetRotateACWPosList = function () {
        return null;
    };
    ColumnEliminater.prototype.FillSceneElementArray = function () {
        this.sceneElements.push(this.sceneColumnEliminater);
    };
    ColumnEliminater.prototype.OnEliminate = function () {
        _super.prototype.OnEliminate.call(this);
        var specialEliminateEvent = new SpecialEliminateRequestEvent();
        specialEliminateEvent.triggerElement = this.sceneColumnEliminater;
        specialEliminateEvent.targetPosList = Tools.GetColunmPosList(this.sceneColumnEliminater.posx, this.sceneColumnEliminater.posy, this.range);
        GameMain.GetInstance().DispatchEvent(specialEliminateEvent);
        return true;
    };
    ColumnEliminater.prototype.GetPreViewContainer = function () {
        var previewContainer = new egret.DisplayObjectContainer();
        var preview = this.sceneColumnEliminater.GetPreView();
        previewContainer.addChild(preview);
        return previewContainer;
    };
    return ColumnEliminater;
}(EliminateTool));
__reflect(ColumnEliminater.prototype, "ColumnEliminater");
//# sourceMappingURL=ColunmEliminater.js.map