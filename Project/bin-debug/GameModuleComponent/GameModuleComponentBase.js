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
var GameModuleComponentBase = (function (_super) {
    __extends(GameModuleComponentBase, _super);
    function GameModuleComponentBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isWorking = false;
        return _this;
    }
    GameModuleComponentBase.prototype.Work = function (param) {
        this.isWorking = true;
    };
    GameModuleComponentBase.prototype.Sleep = function () {
        this.isWorking = false;
    };
    GameModuleComponentBase.prototype.Update = function (deltaTime) {
        if (this.isWorking) {
            this.UpdateInternal(deltaTime);
        }
    };
    GameModuleComponentBase.prototype.UpdateInternal = function (deltaTime) {
    };
    return GameModuleComponentBase;
}(egret.EventDispatcher));
__reflect(GameModuleComponentBase.prototype, "GameModuleComponentBase");
var GameplayControlWorkParam = (function () {
    function GameplayControlWorkParam() {
    }
    return GameplayControlWorkParam;
}());
__reflect(GameplayControlWorkParam.prototype, "GameplayControlWorkParam");
//# sourceMappingURL=GameModuleComponentBase.js.map