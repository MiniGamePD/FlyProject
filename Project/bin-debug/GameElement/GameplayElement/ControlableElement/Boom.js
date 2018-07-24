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
var Boom = (function (_super) {
    __extends(Boom, _super);
    function Boom() {
        var _this = _super.call(this) || this;
        _this.sceneBoom = new SceneBoom(_this);
        _this.sceneBoom.MoveTo(Scene.Columns / 2 - 1, 0);
        _this.eliminateType = EliminateType.Range;
        return _this;
    }
    //todo
    Boom.prototype.OnRotateACW = function () { };
    Boom.prototype.GetRotateACWPosList = function () {
        return null;
    };
    Boom.prototype.FillSceneElementArray = function () {
        this.sceneElements.push(this.sceneBoom);
    };
    Boom.prototype.OnEliminate = function () {
        _super.prototype.OnEliminate.call(this);
        var specialEliminateEvent = new SpecialEliminateRequestEvent();
        specialEliminateEvent.triggerElement = this.sceneBoom;
        specialEliminateEvent.targetPosList = Tools.GetBoomRangePosList(this.sceneBoom.posx, this.sceneBoom.posy);
        GameMain.GetInstance().DispatchEvent(specialEliminateEvent);
        return true;
    };
    Boom.prototype.GetPreViewContainer = function () {
        var previewContainer = new egret.DisplayObjectContainer();
        var preview = this.sceneBoom.GetPreView();
        previewContainer.addChild(preview);
        return previewContainer;
    };
    return Boom;
}(EliminateTool));
__reflect(Boom.prototype, "Boom");
//# sourceMappingURL=Boom.js.map