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
var LoadingModule = (function (_super) {
    __extends(LoadingModule, _super);
    function LoadingModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //private soundReady:boolean; sound不是关键路径，不要卡住主流程
    LoadingModule.prototype.CreateView = function () {
        this.loadingView = new LoadingView();
        this.loadingView.CreateView();
        this.gameViewList.push(this.loadingView);
        this.RegisterLoadingEvent();
        this.resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        this.resModule.StartLoadResource();
        //Load User Data
        var playerDataModule = GameMain.GetInstance().GetModule(ModuleType.PLAYER_DATA);
        playerDataModule.InitUserData();
        _super.prototype.Init.call(this);
        return true;
    };
    LoadingModule.prototype.SwitchForeOrBack = function (from, to) {
        this.isForeground = to == GameStateType.Init;
    };
    LoadingModule.prototype.RegisterLoadingEvent = function () {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.OnConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.OnConfigLoadErr, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.OnResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.OnResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.OnResourceLoadErr, this);
    };
    LoadingModule.prototype.UnRegisterLoadingEvent = function () {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.OnConfigComplete, this);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.OnConfigLoadErr, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.OnResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.OnResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.OnResourceLoadErr, this);
    };
    LoadingModule.prototype.OnConfigComplete = function (event) {
        if (true) {
            console.log("OnConfigComplete");
            this.loadingView.SetError("OnConfigComplete");
        }
    };
    LoadingModule.prototype.OnConfigLoadErr = function (event) {
        if (true) {
            console.log("OnConfigLoadErr");
            this.loadingView.SetError("OnConfigLoadErr");
        }
    };
    LoadingModule.prototype.OnResourceLoadComplete = function (event) {
        if (true) {
            console.log("OnResourceLoadComplete");
            this.loadingView.SetError("OnResourceLoadComplete " + event.groupName);
        }
        if (event.groupName == "preload") {
            this.preloadReady = true;
        }
        else if (event.groupName == "Particle") {
            this.particlyReady = true;
        }
        else if (event.groupName == "BallConfig") {
            this.ballconfigReady = true;
        }
        if (this.preloadReady && this.particlyReady && this.ballconfigReady) {
            var ballConfigModule = GameMain.GetInstance().GetModule(ModuleType.BALL_CONFIG);
            ballConfigModule.LoadBallConfig();
            GameMain.GetInstance().SwitchGameState(GameStateType.Lobby);
        }
        //this.OnLoadingComplete();
    };
    LoadingModule.prototype.OnResourceProgress = function (event) {
        if (true) {
            var rate = event.itemsLoaded / event.itemsTotal;
            console.log(event.groupName + " OnResourceProgress, rate = " + rate);
        }
        //this.loadingView.SetProgress(rate * 100);
    };
    LoadingModule.prototype.OnResourceLoadErr = function (event) {
        if (true) {
            this.loadingView.SetError("OnResourceLoadErr");
            console.log("OnResourceLoadErr");
        }
    };
    // private OnLoadingComplete()
    // {
    // 	egret.log("OnLoadingComplete");
    // }
    LoadingModule.prototype.Release = function () {
        this.UnRegisterLoadingEvent();
        _super.prototype.Release.call(this);
    };
    return LoadingModule;
}(GameViewModule));
__reflect(LoadingModule.prototype, "LoadingModule");
//# sourceMappingURL=LoadingModule.js.map