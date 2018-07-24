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
//维他命-炸弹
var Vitamins = (function (_super) {
    __extends(Vitamins, _super);
    function Vitamins() {
        var _this = _super.call(this) || this;
        _this.range = 1;
        _this.sceneVitamins = new SceneVitamins(_this);
        _this.sceneVitamins.MoveTo(Scene.Columns / 2 - 1, 0);
        _this.eliminateType = EliminateType.Range;
        return _this;
    }
    //todo
    Vitamins.prototype.OnRotateACW = function () { };
    Vitamins.prototype.GetRotateACWPosList = function () {
        return null;
    };
    Vitamins.prototype.FillSceneElementArray = function () {
        this.sceneElements.push(this.sceneVitamins);
    };
    Vitamins.prototype.OnEliminate = function () {
        _super.prototype.OnEliminate.call(this);
        var specialEliminateEvent = new SpecialEliminateRequestEvent();
        specialEliminateEvent.triggerElement = this.sceneVitamins;
        specialEliminateEvent.targetPosList = Tools.GetSquareRangePosList(this.sceneVitamins.posx, this.sceneVitamins.posy, this.range);
        GameMain.GetInstance().DispatchEvent(specialEliminateEvent);
        return true;
    };
    Vitamins.prototype.GetPreViewContainer = function () {
        var previewContainer = new egret.DisplayObjectContainer();
        var preview = this.sceneVitamins.GetPreView();
        previewContainer.addChild(preview);
        return previewContainer;
    };
    return Vitamins;
}(EliminateTool));
__reflect(Vitamins.prototype, "Vitamins");
//# sourceMappingURL=Vitamins.js.map