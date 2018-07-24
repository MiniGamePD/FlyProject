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
var BallMatchModule = (function (_super) {
    __extends(BallMatchModule, _super);
    function BallMatchModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BallMatchModule.prototype.CreateView = function () {
        GameMain.GetInstance().AddEventListener(PauseEvent.EventName, this.OnPause, this);
        GameMain.GetInstance().AddEventListener(GameOverEvent.EventName, this.OnGameOver, this);
        GameMain.GetInstance().AddEventListener(ReviveEvent.EventName, this.OnReviveEvent, this);
        GameMain.GetInstance().AddEventListener(ChangeBallEvent.EventName, this.OnChangeBallEvent, this);
        this.matchView = new BallMatchView();
        this.matchView.CreateView();
        this.gameViewList.push(this.matchView);
        this.matchState = BallMatchState.playing;
        this.InitComponents();
        return true;
    };
    BallMatchModule.prototype.ReleaseView = function () {
        _super.prototype.ReleaseView.call(this);
        this.DeInitComponents();
        GameMain.GetInstance().RemoveEventListener(PauseEvent.EventName, this.OnPause, this);
        GameMain.GetInstance().RemoveEventListener(GameOverEvent.EventName, this.OnGameOver, this);
        GameMain.GetInstance().RemoveEventListener(ReviveEvent.EventName, this.OnReviveEvent, this);
        GameMain.GetInstance().RemoveEventListener(ChangeBallEvent.EventName, this.OnChangeBallEvent, this);
    };
    BallMatchModule.prototype.InitComponents = function () {
        this.ballDataMgr = new BallDataMgr();
        this.ballDataMgr.Init();
        this.matchView.SetBallDataMgr(this.ballDataMgr);
        this.ballGameWorld = new BallGameWorld();
        this.ballGameWorld.Init();
        this.ballEmitter = new BallEmitter();
        this.ballEmitter.Init(this.ballGameWorld, this.matchView.GetBattleGround(), this.ballDataMgr);
        this.boxEmitter = new BoxEmitter();
        this.boxEmitter.Init(this.ballGameWorld, this.matchView.GetBattleGround(), this.ballDataMgr, this.matchView);
        this.ballController = new BallController();
        this.ballController.Init(this, this.ballGameWorld, this.ballEmitter, this.matchView.GetBattleGround());
        var playerData = GameMain.GetInstance().GetModule(ModuleType.PLAYER_DATA);
        playerData.OnMatchBegin();
        var battleTimes = playerData.GetBattleTimes();
        playerData.SetBattleTimes(battleTimes + 1);
        playerData.Save();
        var event = new PauseEvent();
        event.pause = true;
        event.help = true;
        GameMain.GetInstance().DispatchEvent(event);
    };
    BallMatchModule.prototype.SwitchForeOrBack = function (from, to) {
        this.isForeground = to == GameStateType.Match;
    };
    BallMatchModule.prototype.Update = function (deltaTime) {
        _super.prototype.Update.call(this, deltaTime);
        if (this.matchState == BallMatchState.playing) {
            this.ballGameWorld.Update(deltaTime);
            this.ballEmitter.Update(deltaTime);
            this.boxEmitter.Update(deltaTime);
            this.ballController.Update(deltaTime);
        }
    };
    BallMatchModule.prototype.DeInitComponents = function () {
        this.ballGameWorld.Release();
        this.ballGameWorld = null;
        this.ballEmitter.Release();
        this.ballEmitter = null;
        this.boxEmitter.Release();
        this.boxEmitter = null;
        this.ballController.Release();
        this.ballController = null;
    };
    BallMatchModule.prototype.OnReviveEvent = function (event) {
        this.matchState = BallMatchState.playing;
    };
    BallMatchModule.prototype.OnPause = function (event) {
        if (this.matchState == BallMatchState.gameover)
            return;
        var pause = this.matchState == BallMatchState.pause;
        if (pause == event.pause)
            return;
        pause = event.pause;
        this.matchState = pause ? BallMatchState.pause : BallMatchState.playing;
        GameMain.GetInstance().SetPause(pause);
        var hudEvent = new HUDEvent();
        if (!event.help)
            hudEvent.eventType = pause ? HUDEventType.ShowPauseMenu : HUDEventType.HidePauseMenu;
        else
            hudEvent.eventType = pause ? HUDEventType.ShowHelpDetail : HUDEventType.HideHelpDetail;
        GameMain.GetInstance().DispatchEvent(hudEvent);
    };
    BallMatchModule.prototype.OnGameOver = function () {
        this.matchState = BallMatchState.gameover;
    };
    BallMatchModule.prototype.OnChangeBallEvent = function (event) {
        this.ballDataMgr.ChangeBall(event.ballId, event.ballLevel);
    };
    BallMatchModule.prototype.GetMatchState = function () {
        return this.matchState;
    };
    return BallMatchModule;
}(GameViewModule));
__reflect(BallMatchModule.prototype, "BallMatchModule");
var BallMatchState;
(function (BallMatchState) {
    BallMatchState[BallMatchState["playing"] = 0] = "playing";
    BallMatchState[BallMatchState["pause"] = 1] = "pause";
    BallMatchState[BallMatchState["gameover"] = 2] = "gameover";
})(BallMatchState || (BallMatchState = {}));
//# sourceMappingURL=BallMatchModule.js.map