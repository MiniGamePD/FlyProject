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
var MatchHUD = (function (_super) {
    __extends(MatchHUD, _super);
    function MatchHUD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatchHUD.prototype.Init = function () {
        this.readyGo = new ReadyGoItem(0, 0, this.width, this.height);
        this.addChild(this.readyGo);
        this.score = new MatchScoreItem();
        this.score.Init();
        this.addChild(this.score);
        this.pause = new PauseItem(0, 0, this.width, this.height);
        this.pause.Init();
        this.addChild(this.pause);
        this.gameover = new GameOverItem(this.width, this.height);
        this.gameover.Init();
        this.addChild(this.gameover);
        GameMain.GetInstance().AddEventListener(HUDEvent.EventName, this.OnHUDEvent, this);
    };
    MatchHUD.prototype.Release = function () {
        this.readyGo = null;
        this.pause.Release();
        this.gameover.Release();
        this.score.Release();
        GameMain.GetInstance().RemoveEventListener(HUDEvent.EventName, this.OnHUDEvent, this);
    };
    MatchHUD.prototype.Reset = function () {
        this.score.Reset();
        this.gameover.Hide();
    };
    MatchHUD.prototype.Update = function (deltaTime) {
        this.score.Update(deltaTime);
    };
    MatchHUD.prototype.OnHUDEvent = function (event) {
        switch (event.eventType) {
            case HUDEventType.ShowReadyGo:
                this.ShowReadyGo();
                break;
            case HUDEventType.ChangeScore:
                this.ChangeScore(event.param);
                break;
        }
    };
    MatchHUD.prototype.ShowReadyGo = function () {
        this.readyGo.Play();
    };
    MatchHUD.prototype.ChangeScore = function (param) {
        var score = param;
        this.score.SetScore(score);
    };
    MatchHUD.prototype.RefreshCoin = function () {
        this.score.RefreshCoin();
    };
    return MatchHUD;
}(egret.DisplayObjectContainer));
__reflect(MatchHUD.prototype, "MatchHUD");
//# sourceMappingURL=MatchHUD.js.map