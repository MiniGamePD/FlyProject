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
var LobbyView = (function (_super) {
    __extends(LobbyView, _super);
    function LobbyView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LobbyView.prototype.CreateView = function () {
        this.mResModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        this.mStageWidth = GameMain.GetInstance().GetStageWidth();
        this.mStageHeight = GameMain.GetInstance().GetStageHeight();
        this.LoadBackGround();
        this.CreateTitle();
        this.CreateLogo();
        this.CreateBall();
        this.CreateShopView();
        this.CreateRank();
        this.PlayBgm();
        this.StartBallAnim();
        GameMain.GetInstance().PlayerLogin();
        GameMain.GetInstance().hasRevive = false;
        this.LoadConfig();
    };
    LobbyView.prototype.ReleaseView = function () {
    };
    LobbyView.prototype.LoadBackGround = function () {
        // var bg = new FullScreenCover(0x000000, 1);
        // this.addChild(bg);
        // bg.width = this.mStageWidth;
        // bg.height = this.mStageHeight;
        // this.textField = new egret.TextField();
        // this.textField.x = 0;
        // this.textField.y = this.mStageHeight / 4;
        // this.textField.width = this.mStageWidth;
        // this.textField.height = 100;
        // this.textField.rotation = -5;
        // this.textField.fontFamily = "Impact";
        // this.textField.size *= 2;
        // this.textField.textAlign = "center";
        // this.textField.text = "正版！C C 弹";
        // this.addChild(this.textField);
        this.mAdaptedStage = GameMain.GetInstance().GetAdaptedStageContainer();
        ;
        // var shape: egret.Shape = new egret.Shape();
        // shape.graphics.beginFill(0x00A2E8);
        // shape.graphics.drawRect(this.mStageWidth / 2 - 100, this.mStageHeight / 5 * 3, 200, 100);
        // shape.graphics.endFill();
        //this.addChild(shape);
        var adaptFactor = GameMain.GetInstance().GetStageWidth() / Screen_StanderScreenWidth;
        var button = new ShapeBgButton(ShapeBgType.RoundRect, 0x00000000, 0, 0, "pd_res_json.Lobby_Play", 273 * adaptFactor, 86 * adaptFactor, 273 * adaptFactor, 86 * adaptFactor, this.OnClickStartGame, this);
        button.x = this.mStageWidth / 2 + 150 * adaptFactor;
        button.y = 1000;
        this.addChild(button);
        var shop = new ShapeBgButton(ShapeBgType.RoundRect, 0x00000000, 0, 0, "pd_res_json.Lobby_ChangBall", 273 * adaptFactor, 86 * adaptFactor, 273 * adaptFactor, 86 * adaptFactor, this.OnClickShop, this);
        shop.x = this.mStageWidth / 2 - 150 * adaptFactor;
        shop.y = 1000;
        this.addChild(shop);
        // //设置显示对象可以相应触摸事件
        // shape.touchEnabled = true;
        // //注册事件
        // shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickStartGame, this);
        // this.PlayParticle();
        // this.PlayParticleAnim();
        // this.AddMovePartical();
        //this.PlayLightningAnim(shape);
        // this.PlayMoving(text);
        // this.PlayDynamicMoving();
        // var angle = Tools.GetRotateAngle(0, 0, 1, 1);
        // egret.log("angle = " + angle);
    };
    LobbyView.prototype.CreateTitle = function () {
        this.title = this.mResModule.CreateBitmapByName("pd_res_json.Logo");
        var adaptFactor = GameMain.GetInstance().GetStageWidth() / Screen_StanderScreenWidth;
        this.title.width = this.title.width * 0.88 * adaptFactor;
        this.title.height = this.title.height * 0.88 * adaptFactor;
        this.title.anchorOffsetX = this.title.width / 2;
        this.title.anchorOffsetY = this.title.height / 2;
        this.title.x = GameMain.GetInstance().GetStageWidth() / 2;
        this.title.y = 200;
        this.addChild(this.title);
    };
    LobbyView.prototype.CreateLogo = function () {
        this.logo = this.mResModule.CreateBitmapByName("pd_res_json.Lobby_platfrom");
        this.logo.anchorOffsetX = this.logo.width / 2;
        this.logo.anchorOffsetY = this.logo.height / 2;
        this.logo.x = GameMain.GetInstance().GetStageWidth() / 2;
        this.logo.y = 650;
        this.addChild(this.logo);
    };
    LobbyView.prototype.CreateBall = function () {
        Tools.DetachDisplayObjFromParent(this.ball);
        var ballConfigMdl = GameMain.GetInstance().GetModule(ModuleType.BALL_CONFIG);
        var res = GameMain.GetInstance().GetModule(ModuleType.RES);
        this.ball = res.CreateBitmapByName("pd_res_json." + ballConfigMdl.GetCurBallConfig().textureName);
        this.ball.x = this.mStageWidth / 2 + 130;
        this.ball.y = 470;
        this.ball.width = 70;
        this.ball.height = 70;
        this.addChild(this.ball);
    };
    LobbyView.prototype.StartBallAnim = function () {
        this.ballAnimAccDir = -1;
        this.ballAnimSpeed = 0;
        this.ballAnimAcc = 100;
    };
    LobbyView.prototype.CreateShopView = function () {
        this.shop = new ShopView();
        this.shop.Init(this.OnCloseShop, this);
    };
    LobbyView.prototype.CreateRank = function () {
        var adaptFactor = GameMain.GetInstance().GetStageWidth() / Screen_StanderScreenWidth;
        //入口
        this.rankButton = new ShapeBgButton(ShapeBgType.Rect, 0x00000000, 0, 0, "pd_res_json.rankEntry", 117 * 0.8 * adaptFactor, 118 * 0.8 * adaptFactor, 117 * 0.8 * adaptFactor, 118 * 0.8 * adaptFactor, this.OnClickRank, this);
        this.rankButton.x = 430 * adaptFactor;
        this.rankButton.y = 830;
        this.addChild(this.rankButton);
        //背景
        this.rankBg = new FullScreenCover(0x000000, 0.9);
        this.rankBg.touchEnabled = true;
        //返回
        this.rankBackButton = new ShapeBgButton(ShapeBgType.Rect, 0x00000000, 0, 0, "pd_res_json.shopReturn", 65, 65, 65, 65, this.OnCloseRank, this);
        this.rankBackButton.x = 50;
        this.rankBackButton.y = 80;
        //标题
        this.rankTitle = this.mResModule.CreateBitmapByName("pd_res_json.rankTitle");
        this.rankTitle.width *= adaptFactor;
        this.rankTitle.height *= adaptFactor;
        this.rankTitle.anchorOffsetX = this.rankTitle.width / 2;
        this.rankTitle.anchorOffsetY = this.rankTitle.height / 2;
        this.rankTitle.x = GameMain.GetInstance().GetStageWidth() / 2;
        this.rankTitle.y = 100;
        //边框
        this.rankFrame = new egret.Shape();
        var rankFrameWidth = 540 * adaptFactor;
        var rankFrameHeight = 760;
        this.rankFrame.anchorOffsetX = rankFrameWidth / 2;
        this.rankFrame.anchorOffsetY = rankFrameHeight / 2;
        this.rankFrame.graphics.lineStyle(10, 0xFFFFFF);
        this.rankFrame.graphics.beginFill(0x000000, 0);
        this.rankFrame.graphics.drawRoundRect(GameMain.GetInstance().GetStageWidth() / 2, GameMain.GetInstance().GetStageHeight() / 2 - 60, rankFrameWidth, rankFrameHeight, 60);
        this.rankFrame.graphics.endFill();
        //翻页按钮
        this.rankLastButton = new ShapeBgButton(ShapeBgType.Rect, 0x00000000, 0, 0, "pd_res_json.rankLastPage", 105 * adaptFactor, 105 * adaptFactor, 105 * adaptFactor, 105 * adaptFactor, this.OnRankLastPage, this);
        this.rankLastButton.x = 80 * adaptFactor;
        this.rankLastButton.y = 900;
        this.rankNextButton = new ShapeBgButton(ShapeBgType.Rect, 0x00000000, 0, 0, "pd_res_json.rankNextPage", 105 * adaptFactor, 105 * adaptFactor, 105 * adaptFactor, 105 * adaptFactor, this.OnRankNextPage, this);
        this.rankNextButton.x = 560 * adaptFactor;
        this.rankNextButton.y = 900;
        //分享
        this.rankInviteA = new ShapeBgButton(ShapeBgType.Rect, 0x00000000, 0, 0, "pd_res_json.rankInviteA", 198 * adaptFactor, 66 * adaptFactor, 198 * adaptFactor, 66 * adaptFactor, this.OnRankShare, this);
        this.rankInviteA.x = GameMain.GetInstance().GetStageWidth() / 2 + 190 * adaptFactor;
        this.rankInviteA.y = 1050;
        this.rankInviteB = this.mResModule.CreateBitmapByName("pd_res_json.rankInviteB");
        this.rankInviteB.width *= adaptFactor;
        this.rankInviteB.height *= adaptFactor;
        this.rankInviteB.anchorOffsetX = this.rankInviteB.width / 2;
        this.rankInviteB.anchorOffsetY = this.rankInviteB.height / 2;
        this.rankInviteB.x = GameMain.GetInstance().GetStageWidth() / 2;
        this.rankInviteB.y = 1050;
        this.rankMenu = platform.createOpenDataBitmap(GameMain.GetInstance().GetStageWidth(), GameMain.GetInstance().GetStageHeight());
        if (this.rankMenu != null) {
            //this.rankMenu.touchEnabled = true;
            this.rankMenu.anchorOffsetX = this.rankMenu.width / 2;
            this.rankMenu.anchorOffsetY = this.rankMenu.height / 2;
            this.rankMenu.x = GameMain.GetInstance().GetStageWidth() / 2;
            this.rankMenu.y = GameMain.GetInstance().GetStageHeight() / 2;
        }
        //无法使用排行榜
        this.rankCantUseCouldStorage = new egret.TextField;
        this.rankCantUseCouldStorage.size = 35;
        this.rankCantUseCouldStorage.text = "微信版本太低了哟\n\n看不到好友数据好寂寞\n\no(╥﹏╥)o";
        this.rankCantUseCouldStorage.width = GameMain.GetInstance().GetStageWidth();
        this.rankCantUseCouldStorage.height = 250;
        this.rankCantUseCouldStorage.anchorOffsetX = this.rankCantUseCouldStorage.width / 2;
        this.rankCantUseCouldStorage.anchorOffsetY = this.rankCantUseCouldStorage.height / 2;
        this.rankCantUseCouldStorage.x = GameMain.GetInstance().GetStageWidth() / 2;
        this.rankCantUseCouldStorage.y = 400;
        this.rankCantUseCouldStorage.textAlign = "center";
        this.rankCantUseCouldStorage.verticalAlign = "middle";
    };
    LobbyView.prototype.OnClickRank = function (callbackobj) {
        callbackobj.addChild(callbackobj.rankBg);
        callbackobj.addChild(callbackobj.rankFrame);
        callbackobj.addChild(callbackobj.rankTitle);
        callbackobj.addChild(callbackobj.rankBackButton);
        callbackobj.addChild(callbackobj.rankLastButton);
        callbackobj.addChild(callbackobj.rankNextButton);
        callbackobj.addChild(callbackobj.rankInviteA);
        callbackobj.addChild(callbackobj.rankInviteB);
        if (platform.canUseCloudStorage() && callbackobj.rankMenu != null && callbackobj.rankMenu != undefined) {
            callbackobj.addChild(callbackobj.rankMenu);
            platform.getFriendCloudStorage("HighScore");
        }
        else {
            callbackobj.addChild(callbackobj.rankCantUseCouldStorage);
        }
    };
    LobbyView.prototype.OnCloseRank = function (callbackObj) {
        Tools.DetachDisplayObjFromParent(callbackObj.rankBg);
        Tools.DetachDisplayObjFromParent(callbackObj.rankFrame);
        Tools.DetachDisplayObjFromParent(callbackObj.rankTitle);
        Tools.DetachDisplayObjFromParent(callbackObj.rankMenu);
        Tools.DetachDisplayObjFromParent(callbackObj.rankBackButton);
        Tools.DetachDisplayObjFromParent(callbackObj.rankLastButton);
        Tools.DetachDisplayObjFromParent(callbackObj.rankNextButton);
        Tools.DetachDisplayObjFromParent(callbackObj.rankInviteA);
        Tools.DetachDisplayObjFromParent(callbackObj.rankInviteB);
        Tools.DetachDisplayObjFromParent(callbackObj.rankCantUseCouldStorage);
    };
    LobbyView.prototype.OnRankLastPage = function () {
        platform.rankTurnPage(-1);
    };
    LobbyView.prototype.OnRankNextPage = function () {
        platform.rankTurnPage(1);
    };
    LobbyView.prototype.OnRankShare = function () {
        var playerData = GameMain.GetInstance().GetModule(ModuleType.PLAYER_DATA);
        if (playerData.GetHistoryHighScore() > 0) {
            GameMain.GetInstance().ShareAppMsgRank(playerData.GetHistoryHighScore());
        }
        else {
            GameMain.GetInstance().ShareAppMsg();
        }
    };
    LobbyView.prototype.OnClickStartGame = function () {
        //egret.log("OnClickStartGame");
        GameMain.GetInstance().SwitchGameState(GameStateType.Match);
    };
    LobbyView.prototype.OnClickShop = function (callbackObj) {
        callbackObj.shop.OnOpenShop();
        callbackObj.addChild(callbackObj.shop);
    };
    LobbyView.prototype.OnCloseShop = function (callbackobj) {
        Tools.DetachDisplayObjFromParent(callbackobj.shop);
        callbackobj.CreateBall();
    };
    LobbyView.prototype.PlayParticle = function () {
        // var texture = RES.getRes("Virus_Red");
        // var config = RES.getRes("newParticle_json");
        // this.particleSys = this.mResModule.CreateParticleByKey("newParticle");
        this.particleSys = this.mResModule.CreateParticle("Particle_Boss_Skill_Fly", "Particle_Boss_Skill_Fly");
        this.addChild(this.particleSys);
        this.particleSys.x = this.mStageWidth / 2;
        this.particleSys.y = this.mStageHeight / 2;
        this.particleSys.rotation = 90;
        this.particleSys.start();
    };
    LobbyView.prototype.UpdateView = function (deltaTime) {
        this.ballAnimSpeed += this.ballAnimAcc * this.ballAnimAccDir * 16 / 1000;
        this.ball.y += this.ballAnimSpeed * 16 / 1000;
        if (Math.abs(this.ballAnimSpeed) >= 50 || Math.abs(this.ballAnimSpeed) <= 0) {
            this.ballAnimAccDir *= -1;
        }
    };
    LobbyView.prototype.PlayBgm = function () {
        if (LobbyView.hasPlayedBgm)
            return;
        LobbyView.hasPlayedBgm = true;
        var event = new PlaySoundEvent("Title_mp3", 1);
        GameMain.GetInstance().DispatchEvent(event);
        // var event = new BgmControlEvent();
        // event.bgmStage = BgmStage.Global;
        // event.controlType = BgmControlType.Play;
        // GameMain.GetInstance().DispatchEvent(event);
    };
    LobbyView.prototype.PlayLightningAnim = function (displayObj) {
        var param = new PaLightningParam;
        param.displayObj = displayObj;
        param.duration = 2000;
        param.interval = 500;
        param.hideRate = 0.5;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    LobbyView.prototype.PlayParticleAnim = function () {
        var param = new PaPlayParticalParam;
        param.textureName = "Particle_Boom_Red";
        param.jsonName = "Particle_Boom";
        param.duration = 5000;
        param.emitDuration = 5000;
        param.posX = 200;
        param.posY = this.mStageHeight / 2 - 100;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    LobbyView.prototype.AddMovePartical = function () {
        var param = new PaMoveParticalParam;
        param.textureName = "huojian";
        param.jsonName = "huojian";
        param.duration = 3000;
        param.flyDuration = 2000;
        param.stayDuration = 0;
        param.stratPosX = 0;
        param.stratPosY = 0;
        param.endPosX = this.mStageWidth / 2;
        param.endPosY = this.mStageHeight / 2;
        param.isMoveEmitter = true;
        param.callBack = this.MoveParticalCallBack;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    LobbyView.prototype.PlayMoving = function (displayObj) {
        var param = new PaMovingParam;
        param.displayObj = displayObj;
        param.duration = 2000;
        param.targetPosX = this.mStageWidth / 2;
        param.targetPosY = this.mStageHeight / 2;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    LobbyView.prototype.MoveParticalCallBack = function (runTime) {
        egret.log("MoveParticalCallBack, runTime=" + runTime);
    };
    LobbyView.prototype.PlayDynamicMoving = function () {
        var headPic = this.mResModule.CreateBitmapByName("huojian1");
        headPic.anchorOffsetX = headPic.width / 2;
        headPic.anchorOffsetY = headPic.height / 2;
        headPic.x = this.mStageWidth / 2;
        headPic.y = this.mStageHeight * 0.256;
        GameMain.GetInstance().GetGameStage().addChild(headPic);
        var param = new PaDynamicMovingParam;
        param.displayObj = headPic;
        param.startSpeed = 100;
        param.targetPos = new egret.Point(this.mStageWidth / 2, this.mStageHeight * 0.75);
        param.acceleration = 100;
        param.needRotate = true;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    LobbyView.prototype.LoadConfig = function () {
        var jsonFile = this.mResModule.GetRes("BallConfig_json");
        if (jsonFile != null) {
            var ballCount = jsonFile.BallCount;
            if (jsonFile.BallName != undefined) {
                egret.log("ballCount=" + ballCount);
            }
            var list = jsonFile.ConfigList;
            egret.log("ballCount=" + ballCount);
        }
    };
    LobbyView.hasPlayedBgm = false;
    return LobbyView;
}(GameView));
__reflect(LobbyView.prototype, "LobbyView");
//# sourceMappingURL=LobbyView.js.map