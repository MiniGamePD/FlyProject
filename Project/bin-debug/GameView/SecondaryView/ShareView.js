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
var ShareView = (function (_super) {
    __extends(ShareView, _super);
    function ShareView() {
        var _this = _super.call(this) || this;
        _this.resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        _this.playerDataModule = GameMain.GetInstance().GetModule(ModuleType.PLAYER_DATA);
        _this.adaptFactor = GameMain.GetInstance().GetStageWidth() / Screen_StanderScreenWidth;
        _this.CreateBgCover();
        _this.CreateCoinInfo();
        if (_this.playerDataModule.CanShowLotteryTips()) {
            _this.CreateTipsTextInfo();
            _this.CreateShareBg();
        }
        else {
            _this.CreateNoMoneyBg();
        }
        return _this;
    }
    ShareView.prototype.Init = function (callbackFun, callbackObj) {
        this.callbackFun = callbackFun;
        this.callbackObj = callbackObj;
    };
    ShareView.prototype.CreateBgCover = function () {
        this.bgCover = new FullScreenCover(0x000000, 0.7);
        this.bgCover.touchEnabled = true;
        this.addChild(this.bgCover);
        this.bgCover.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickBack, this);
    };
    ShareView.prototype.OnClickBack = function () {
        Tools.DetachDisplayObjFromParent(this);
        this.callbackFun(this.callbackObj, false);
    };
    ShareView.prototype.CreateTipsTextInfo = function () {
        this.TipText = new egret.TextField();
        this.TipText.size = 40;
        this.TipText.textColor = 0xFFFFFF;
        this.TipText.textAlign = "center";
        this.TipText.width = 400;
        this.TipText.height = 100;
        this.TipText.x = GameMain.GetInstance().GetStageWidth() / 2;
        this.TipText.y = 330;
        this.TipText.stroke = 2;
        this.TipText.strokeColor = 0x000000;
        var LeftNum = this.playerDataModule.GetTodayLeftLotteryShowTipCnt();
        this.TipText.textFlow = [
            { text: "今天剩余", style: { "textColor": 0xFFFFFF, "size": 30 } },
            { text: LeftNum, style: { "textColor": 0xFFC900, "size": 30 } },
            { text: "次数", style: { "textColor": 0xFFFFFF, "size": 30 } },
        ];
        //this.TipText.text = "当天剩余" +  + "次";
        Tools.SetAnchor(this.TipText, AnchorType.Center);
        this.addChild(this.TipText);
    };
    ShareView.prototype.CreateCoinInfo = function () {
        this.coinBitmap = this.resModule.CreateBitmapByName("shopCoin");
        this.coinBitmap.x = 320 * this.adaptFactor;
        this.coinBitmap.y = 85;
        Tools.SetAnchor(this.coinBitmap, AnchorType.Center);
        this.addChild(this.coinBitmap);
        this.coinText = new egret.TextField();
        this.coinText.size = 40 * this.adaptFactor;
        this.coinText.text = this.playerDataModule.GetCoin().toString();
        this.coinText.textColor = 0xFFFFFF;
        this.coinText.textAlign = "center";
        this.coinText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.coinText.stroke = 2;
        this.coinText.strokeColor = 0x000000;
        this.coinText.x = 330 * this.adaptFactor;
        this.coinText.y = 87;
        Tools.SetAnchor(this.coinText, AnchorType.Center);
        this.addChild(this.coinText);
        this.addCoinBtn = new ShapeBgButton(ShapeBgType.Rect, 0x00000000, 0, 0, "pd_res_json.addCoin", 200, 50, 46, 50, this.OnClickAddCoinBtn, this);
        this.addCoinBtn.x = (this.coinBitmap.x + this.coinBitmap.width / 2 - 23);
        this.addCoinBtn.y = 85;
        this.addChild(this.addCoinBtn);
    };
    ShareView.prototype.OnClickAddCoinBtn = function (callbackObj) {
    };
    ShareView.prototype.CreateNoMoneyBg = function () {
        this.shareBg = this.resModule.CreateBitmap("pd_res_json.noMoneyTips", GameMain.GetInstance().GetStageWidth() / 2, GameMain.GetInstance().GetStageHeight() / 2, this, AnchorType.Center);
        this.shareBg.scaleX = 0;
        this.shareBg.scaleY = 0;
        var scaleParam = new PaScalingParam();
        scaleParam.displayObj = this.shareBg;
        scaleParam.duration = 200;
        scaleParam.targetScaleX = 1;
        scaleParam.targetScaleY = 1;
        scaleParam.interval = scaleParam.duration;
        var scaleEvent = new PlayProgramAnimationEvent();
        scaleEvent.param = scaleParam;
        GameMain.GetInstance().DispatchEvent(scaleEvent);
        //	this.CreateShareBtn()
    };
    ShareView.prototype.CreateShareBg = function () {
        this.shareBg = this.resModule.CreateBitmap("pd_res_json.ShareGetCoinBg", GameMain.GetInstance().GetStageWidth() / 2, GameMain.GetInstance().GetStageHeight() / 2, this, AnchorType.Center);
        this.shareBg.scaleX = 0;
        this.shareBg.scaleY = 0;
        var scaleParam = new PaScalingParam();
        scaleParam.displayObj = this.shareBg;
        scaleParam.duration = 200;
        scaleParam.targetScaleX = 1;
        scaleParam.targetScaleY = 1;
        scaleParam.interval = scaleParam.duration;
        var scaleEvent = new PlayProgramAnimationEvent();
        scaleEvent.param = scaleParam;
        GameMain.GetInstance().DispatchEvent(scaleEvent);
        this.CreateShareBtn();
        // var timer = new egret.Timer(200,1);
        // timer.addEventListener(egret.TimerEvent.TIMER, this.CreateShareBtn, this);
        // timer.start();
    };
    ShareView.prototype.OnShare = function (callbackObj) {
        egret.log("OnShare");
        GameMain.GetInstance().ShareAppMsg();
        callbackObj.playerDataModule.AddCoin(Share_Add_Coin_Count);
        callbackObj.playerDataModule.Save();
        Tools.DetachDisplayObjFromParent(callbackObj);
        callbackObj.callbackFun(callbackObj.callbackObj, true);
    };
    ShareView.prototype.CreateShareBtn = function () {
        this.shareBtn = new ShapeBgButton(ShapeBgType.Rect, 0x00000000, 0, 0, "pd_res_json.ShareBtn", 400, 80, 261, 80, this.OnShare, this);
        this.shareBtn.x = GameMain.GetInstance().GetStageWidth() / 2;
        this.shareBtn.y = GameMain.GetInstance().GetStageHeight() / 2 + 200;
        this.addChild(this.shareBtn);
        this.shareBtn.scaleX = 0;
        this.shareBtn.scaleY = 0;
        var scaleParam = new PaScalingParam();
        scaleParam.displayObj = this.shareBtn;
        scaleParam.duration = 200;
        scaleParam.targetScaleX = 1;
        scaleParam.targetScaleY = 1;
        scaleParam.interval = scaleParam.duration;
        var scaleEvent = new PlayProgramAnimationEvent();
        scaleEvent.param = scaleParam;
        GameMain.GetInstance().DispatchEvent(scaleEvent);
    };
    return ShareView;
}(egret.DisplayObjectContainer));
__reflect(ShareView.prototype, "ShareView");
//# sourceMappingURL=ShareView.js.map