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
var LobbyModule = (function (_super) {
    __extends(LobbyModule, _super);
    function LobbyModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LobbyModule.prototype.CreateView = function () {
        var view = new LobbyView();
        view.CreateView();
        this.gameViewList.push(view);
        _super.prototype.Init.call(this);
        return true;
    };
    LobbyModule.prototype.SwitchForeOrBack = function (from, to) {
        this.isForeground = to == GameStateType.Lobby;
    };
    return LobbyModule;
}(GameViewModule));
__reflect(LobbyModule.prototype, "LobbyModule");
//# sourceMappingURL=LobbyModule.js.map