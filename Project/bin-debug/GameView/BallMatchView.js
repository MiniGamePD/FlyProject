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
var BallMatchView = (function (_super) {
    __extends(BallMatchView, _super);
    function BallMatchView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BallMatchView.prototype.CreateView = function () {
        var bg = new FullScreenCover(0x000000, 1);
        bg.touchEnabled = true;
        this.addChild(bg);
        this.CreateBattleGround();
        this.CreatePlayerLv();
        this.CreateHUD();
        this.RegisterEvent();
    };
    BallMatchView.prototype.SetBallDataMgr = function (ballDataMgr) {
        this.ballDataMgr = ballDataMgr;
    };
    BallMatchView.prototype.RegisterEvent = function () {
        GameMain.GetInstance().AddEventListener(BallEmitterLevelUpEvent.EventName, this.OnBallEmitterLevelUpEvent, this);
        GameMain.GetInstance().AddEventListener(SpecialBoxEliminateEvent.EventName, this.OnSpecialBoxEliminateEvent, this);
    };
    BallMatchView.prototype.UnRegisterEvent = function () {
        GameMain.GetInstance().RemoveEventListener(BallEmitterLevelUpEvent.EventName, this.OnBallEmitterLevelUpEvent, this);
        GameMain.GetInstance().RemoveEventListener(SpecialBoxEliminateEvent.EventName, this.OnSpecialBoxEliminateEvent, this);
    };
    BallMatchView.prototype.UpdateView = function (deltaTime) {
        this.hud.Update(deltaTime);
    };
    BallMatchView.prototype.ReleaseView = function () {
        this.DeletePlayerLv();
        this.DeleteHUD();
        this.UnRegisterEvent();
    };
    BallMatchView.prototype.CreatePlayerLv = function () {
        this.playerLv = new egret.TextField();
        this.playerLv.text = "Lv. 1";
        this.playerLv.size = 30;
        this.playerLv.width = 200;
        this.playerLv.height = 60;
        this.playerLv.anchorOffsetX = this.playerLv.width / 2;
        this.playerLv.anchorOffsetY = this.playerLv.height / 2;
        this.playerLv.textAlign = "center";
        this.playerLv.x = GameMain.GetInstance().GetStageWidth() / 2;
        this.playerLv.y = GameMain.GetInstance().GetStageHeight() / 2 + 100;
        this.addChild(this.playerLv);
        // this.playerLv.touchEnabled = true;
        // this.playerLv.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ChangBall, this);
    };
    BallMatchView.prototype.OnBallEmitterLevelUpEvent = function (event) {
        this.playerLv.text = "Lv. " + event.curLevel;
    };
    BallMatchView.prototype.CreateBattleGround = function () {
        this.battleGround = new egret.DisplayObjectContainer();
        this.battleGround.width = this.width;
        this.battleGround.height = this.height;
        this.addChild(this.battleGround);
    };
    BallMatchView.prototype.GetBattleGround = function () {
        return this.battleGround;
    };
    BallMatchView.prototype.ChangBallTest = function () {
        var ballId = Math.ceil(Math.random() * 12);
        var level = Math.ceil(Math.random() * 3);
        this.ballDataMgr.ChangeBall(ballId, level);
        this.ShowTips("换球：ballId = " + ballId + ", Lv" + level, 0xffffff);
    };
    BallMatchView.prototype.DeletePlayerLv = function () {
        Tools.DetachDisplayObjFromParent(this.playerLv);
        this.playerLv = null;
    };
    BallMatchView.prototype.CreateHUD = function () {
        this.hud = new MatchHUD();
        this.hud.width = GameMain.GetInstance().GetStageWidth();
        this.hud.height = GameMain.GetInstance().GetStageHeight();
        this.hud.x = this.hud.y = 0;
        this.hud.Init();
        this.addChild(this.hud);
    };
    BallMatchView.prototype.DeleteHUD = function () {
        this.hud.Release();
        this.hud = null;
    };
    BallMatchView.prototype.SetLevel = function (level) {
        this.playerLv.text = "Lv. " + level;
    };
    BallMatchView.prototype.OnApplyDamageOnBox = function (box, healthChanged) {
        if (this.hud != null
            && this.hud != undefined
            && this.hud.score != null
            && this.hud.score != undefined) {
            this.hud.score.AddScore(-healthChanged);
        }
    };
    BallMatchView.prototype.OnSpecialBoxEliminateEvent = function (evt) {
        if (evt != null) {
            if (evt.boxType == BoxType.SixMulDir) {
                this.ShowTips("变身 " + this.ballDataMgr.ballConfig.Box_Effect_MultipleDirections_Time / 1000 + "秒", 0x3562ec);
            }
            else if (evt.boxType == BoxType.FireUp) {
                this.ShowTips("射速翻倍 " + this.ballDataMgr.ballConfig.Box_Effect_FireUp_Time / 1000 + "秒", 0xd6340a);
            }
            else if (evt.boxType == BoxType.LevelUp) {
                // var soundEvent = new PlaySoundEvent("LevelUp_mp3", 1)
                // GameMain.GetInstance().DispatchEvent(soundEvent);
                this.ShowTips("升级!射速提升", 0x59d61b);
            }
            else if (evt.boxType == BoxType.Pause) {
                this.ShowTips("定时 " + this.ballDataMgr.ballConfig.Box_Effect_Pause_Time / 1000 + "秒", 0x6726a5);
            }
            else if (evt.boxType == BoxType.GoldCoin) {
                this.ShowTips("金币 +" + this.ballDataMgr.ballConfig.Box_Effect_Gold_Coin, 0xf1be22);
                var playerData = GameMain.GetInstance().GetModule(ModuleType.PLAYER_DATA);
                playerData.AddCoin(this.ballDataMgr.ballConfig.Box_Effect_Gold_Coin);
                this.hud.RefreshCoin();
            }
        }
    };
    BallMatchView.prototype.ShowTips = function (tipString, color) {
        var tips;
        tips = new egret.TextField();
        tips.text = tipString;
        tips.size = 20;
        tips.width = 200;
        tips.height = 60;
        tips.anchorOffsetX = tips.width / 2;
        tips.anchorOffsetY = tips.height / 2;
        tips.textAlign = "center";
        tips.bold = true;
        tips.x = GameMain.GetInstance().GetStageWidth() / 2;
        tips.y = GameMain.GetInstance().GetStageHeight() / 2 - 50;
        tips.textColor = color;
        this.addChild(tips);
        var moveParam = new PaMovingParam();
        moveParam.displayObj = tips;
        moveParam.duration = 1600;
        moveParam.targetPosX = tips.x;
        moveParam.targetPosY = tips.y - 40;
        moveParam.needRemoveOnFinish = true;
        var moveEvent = new PlayProgramAnimationEvent();
        moveEvent.param = moveParam;
        GameMain.GetInstance().DispatchEvent(moveEvent);
        var alphaParam = new PaAlphaLoopParam();
        alphaParam.displayObj = tips;
        alphaParam.duration = 1600;
        alphaParam.interval = alphaParam.duration / 2;
        alphaParam.startAlpha = 0.5;
        alphaParam.endAlpha = 1;
        alphaParam.reverse = true;
        var alphaEvent = new PlayProgramAnimationEvent();
        alphaEvent.param = alphaParam;
        GameMain.GetInstance().DispatchEvent(alphaEvent);
    };
    return BallMatchView;
}(GameView));
__reflect(BallMatchView.prototype, "BallMatchView");
//# sourceMappingURL=BallMatchView.js.map