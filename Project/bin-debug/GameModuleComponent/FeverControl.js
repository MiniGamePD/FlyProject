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
var FeverControl = (function (_super) {
    __extends(FeverControl, _super);
    function FeverControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.basicFeverStep = 6;
        return _this;
    }
    FeverControl.prototype.Init = function () {
        this.feverEnerge = 0;
        this.isInFeverState = false;
        GameMain.GetInstance().AddEventListener(EliminateEvent.EventName, this.OnEliminateHappen, this);
    };
    FeverControl.prototype.Release = function () {
        GameMain.GetInstance().RemoveEventListener(EliminateEvent.EventName, this.OnEliminateHappen, this);
    };
    FeverControl.prototype.OnEliminateHappen = function (event) {
        if (event.eliminateInfo.EliminateRound <= 0 && event.eliminateInfo.EliminatedElements.length <= 0)
            return;
        if (this.isInFeverState)
            return;
        this.feverEnerge += this.basicFeverStep * event.eliminateInfo.EliminateRound;
        if (this.feverEnerge >= 100) {
            this.feverEnerge = 100;
            var feverEvent = new FeverEvent();
            feverEvent.feverBegin = true;
            GameMain.GetInstance().DispatchEvent(feverEvent);
            this.isInFeverState = true;
            this.feverTimer = new egret.Timer(Time_FeverTime, 1);
            this.feverTimer.addEventListener(egret.TimerEvent.TIMER, this.FeverEnd, this);
            this.feverTimer.start();
            this.feverBgmFadeOutTimer = new egret.Timer(Time_FeverTime - 500, 1);
            this.feverBgmFadeOutTimer.addEventListener(egret.TimerEvent.TIMER, this.FadeOutFeverBgm, this);
            this.feverBgmFadeOutTimer.start();
            //pause global bgm
            var bgmControlEvent = new BgmControlEvent();
            bgmControlEvent.bgmStage = BgmStage.Global;
            bgmControlEvent.controlType = BgmControlType.Stop;
            GameMain.GetInstance().DispatchEvent(bgmControlEvent);
            //play fever bgm
            bgmControlEvent.bgmStage = BgmStage.Fever;
            bgmControlEvent.controlType = BgmControlType.Play;
            GameMain.GetInstance().DispatchEvent(bgmControlEvent);
            //show fever sprite
            var hudEvent = new HUDEvent();
            hudEvent.eventType = HUDEventType.ShowFeverSprite;
            GameMain.GetInstance().DispatchEvent(hudEvent);
        }
    };
    FeverControl.prototype.FeverEnd = function () {
        this.feverTimer = null;
        this.isInFeverState = false;
        this.feverEnerge = 0;
        var feverEvent = new FeverEvent();
        feverEvent.feverBegin = false;
        GameMain.GetInstance().DispatchEvent(feverEvent);
        // //fade in bgm
        // var soundControlEvent = new SoundControlEvent();
        // var soundModule:ISoundModule = <ISoundModule>GameMain.GetInstance().GetModule(ModuleType.SOUND);
        // soundControlEvent.channel = soundModule.GetCurrentBgmChannel();
        // soundControlEvent.controlType = SoundControlType.FadeIn;
        // soundControlEvent.controlParam = 1 / 1000;
        // GameMain.GetInstance().DispatchEvent(soundControlEvent);
        var bgmControlEvent = new BgmControlEvent();
        bgmControlEvent.bgmStage = BgmStage.Fever;
        bgmControlEvent.controlType = BgmControlType.Stop;
        GameMain.GetInstance().DispatchEvent(bgmControlEvent);
        bgmControlEvent.bgmStage = BgmStage.Global;
        bgmControlEvent.controlType = BgmControlType.Play;
        GameMain.GetInstance().DispatchEvent(bgmControlEvent);
    };
    FeverControl.prototype.FadeOutFeverBgm = function () {
        this.feverBgmFadeOutTimer = null;
        var bgmControlEvent = new BgmControlEvent();
        bgmControlEvent.bgmStage = BgmStage.Fever;
        bgmControlEvent.controlType = BgmControlType.FadeOut;
        bgmControlEvent.controlParam = 1 / 450;
        GameMain.GetInstance().DispatchEvent(bgmControlEvent);
    };
    FeverControl.prototype.Update = function (deltaTime) {
        if (this.isInFeverState) {
            this.feverEnerge -= deltaTime / Time_FeverTime * 100;
        }
    };
    FeverControl.prototype.GetFeverEnerge = function () {
        return this.feverEnerge;
    };
    FeverControl.prototype.AttachToHUD = function () {
        var event = new HUDEvent();
        event.eventType = HUDEventType.SetFeverControl;
        event.param = this;
        GameMain.GetInstance().DispatchEvent(event);
    };
    FeverControl.prototype.IsInFeverState = function () {
        return this.isInFeverState;
    };
    return FeverControl;
}(GameModuleComponentBase));
__reflect(FeverControl.prototype, "FeverControl");
//# sourceMappingURL=FeverControl.js.map