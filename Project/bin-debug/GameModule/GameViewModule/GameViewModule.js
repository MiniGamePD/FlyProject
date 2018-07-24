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
var GameViewModule = (function (_super) {
    __extends(GameViewModule, _super);
    function GameViewModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameViewList = [];
        return _this;
    }
    GameViewModule.prototype.SwitchToForeground = function () {
        this.CreateView();
        if (this.gameViewList.length > 0) {
            var event = new DisplayChangeEvent(this.gameViewList);
            GameMain.GetInstance().DispatchEvent(event);
        }
    };
    GameViewModule.prototype.SwitchToBackground = function () {
        this.ReleaseView();
    };
    GameViewModule.prototype.Update = function (deltaTime) {
        this.UpdateView(deltaTime);
    };
    GameViewModule.prototype.UpdateView = function (deltaTime) {
        for (var i = 0; i < this.gameViewList.length; ++i) {
            this.gameViewList[i].UpdateView(deltaTime);
        }
    };
    GameViewModule.prototype.ReleaseView = function () {
        for (var i = 0; i < this.gameViewList.length; ++i) {
            this.gameViewList[i].ReleaseView();
        }
        this.gameViewList = [];
    };
    return GameViewModule;
}(ModuleBase));
__reflect(GameViewModule.prototype, "GameViewModule", ["IModule"]);
//# sourceMappingURL=GameViewModule.js.map