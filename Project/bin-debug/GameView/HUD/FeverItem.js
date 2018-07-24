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
var FeverItem = (function (_super) {
    __extends(FeverItem, _super);
    function FeverItem(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        var res = GameMain.GetInstance().GetModule(ModuleType.RES);
        //星星的光
        _this.feverStarLight = res.CreateBitmapByName("pd_res_json.FeverTime_Shinning");
        _this.feverStarLight.x = 177;
        _this.feverStarLight.y = 122;
        _this.feverStarLight.anchorOffsetX = _this.feverStarLight.width / 2;
        _this.feverStarLight.anchorOffsetY = _this.feverStarLight.height / 2;
        _this.feverStarLight.rotation = 0;
        GameMain.GetInstance().AdapteDisplayObject(_this.feverStarLight);
        var anim = new PaRotationParam();
        anim.displayObj = _this.feverStarLight;
        anim.targetRot = 360;
        anim.duration = 6000;
        anim.loop = true;
        var event = new PlayProgramAnimationEvent();
        event.param = anim;
        GameMain.GetInstance().DispatchEvent(event);
        //进度条
        var feverEnergeBgRect = new egret.Rectangle(175, 95, 276, 34);
        var feverEnergeFgRect = new egret.Rectangle(176, 96, 274, 32);
        _this.feverProgress = new ProgressBar("pd_res_json.FeverTime", feverEnergeBgRect, "pd_res_json.FeverTime_Color", feverEnergeFgRect, ProgressBarDir.Horizontal_L2R);
        _this.feverProgress.x = feverEnergeBgRect.width / 2 + 20;
        _this.feverProgress.y = feverEnergeBgRect.height / 2 + 20;
        _this.feverProgress.anchorOffsetX = feverEnergeBgRect.width / 2;
        _this.feverProgress.anchorOffsetY = feverEnergeBgRect.height / 2;
        _this.feverProgress.Adapt();
        _this.addChild(_this.feverProgress);
        _this.feverEnerge = 0;
        _this.feverProgress.SetProgress(0.01);
        _this.feverEnergeSpeed = 1;
        //星星
        _this.feverStar = res.CreateBitmapByName("pd_res_json.FeverTime_xingxing");
        _this.feverStar.x = 177;
        _this.feverStar.y = 122;
        _this.feverStar.anchorOffsetX = _this.feverStar.width / 2;
        _this.feverStar.anchorOffsetY = _this.feverStar.height / 2;
        GameMain.GetInstance().AdapteDisplayObject(_this.feverStar);
        _this.addChild(_this.feverStar);
        Tools.FeverPowerTargetPos.x = _this.feverStar.x;
        Tools.FeverPowerTargetPos.y = _this.feverStar.y;
        //fever time的美术字
        _this.feverSprite = res.CreateBitmapByName("pd_res_json.fever");
        _this.feverSprite.anchorOffsetX = _this.feverSprite.width / 2;
        _this.feverSprite.anchorOffsetY = _this.feverSprite.height / 2;
        _this.feverSprite.x = GameMain.GetInstance().GetStageWidth() / 2;
        _this.feverSprite.y = 400;
        GameMain.GetInstance().AdapteDisplayObject(_this.feverSprite);
        return _this;
    }
    FeverItem.prototype.Init = function () {
        GameMain.GetInstance().AddEventListener(FeverEvent.EventName, this.OnFeverEvent, this);
    };
    FeverItem.prototype.Release = function () {
        GameMain.GetInstance().RemoveEventListener(FeverEvent.EventName, this.OnFeverEvent, this);
        this.feverControl = null;
    };
    FeverItem.prototype.SetFeverControl = function (feverControl) {
        this.feverControl = feverControl;
    };
    FeverItem.prototype.ShowFeverSprite = function () {
        this.feverSprite.scaleX = 0;
        this.feverSprite.scaleY = 0;
        this.addChild(this.feverSprite);
        var param = new PaScalingParam;
        param.displayObj = this.feverSprite;
        param.duration = 500;
        param.targetScaleX = 1;
        param.targetScaleY = 1;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
        this.feverSpriteTimer = new egret.Timer(1500, 1);
        this.feverSpriteTimer.addEventListener(egret.TimerEvent.TIMER, this.HideFeverSprite, this);
        this.feverSpriteTimer.start();
    };
    FeverItem.prototype.HideFeverSprite = function () {
        this.removeChild(this.feverSprite);
        this.feverSpriteTimer = null;
    };
    FeverItem.prototype.Update = function (delta) {
        if (this.feverControl != null) {
            if (this.feverEnerge != this.feverControl.GetFeverEnerge()) {
                var dir = this.feverControl.GetFeverEnerge() - this.feverEnerge;
                this.feverEnerge += dir * this.feverEnergeSpeed * delta / 1000;
                if ((dir > 0 && this.feverEnerge > this.feverControl.GetFeverEnerge()) ||
                    (dir < 0 && this.feverEnerge < this.feverControl.GetFeverEnerge()))
                    this.feverEnerge = this.feverControl.GetFeverEnerge();
                this.feverProgress.SetProgress(this.feverEnerge / 100);
            }
        }
    };
    FeverItem.prototype.OnFeverEvent = function (feverEvent) {
        if (feverEvent.feverBegin) {
            //显示小星星的光
            var starIndex = this.getChildIndex(this.feverStar);
            this.addChildAt(this.feverStarLight, starIndex - 1);
            var lightParam = new PaAlphaLoopParam;
            lightParam.displayObj = this.feverStarLight;
            lightParam.interval = 500;
            lightParam.duration = 500;
            lightParam.startAlpha = 0.1;
            lightParam.endAlpha = 1;
            lightParam.reverse = false;
            var lightEvent = new PlayProgramAnimationEvent();
            lightEvent.param = lightParam;
            GameMain.GetInstance().DispatchEvent(lightEvent);
        }
        else {
            //隐藏小星星的光
            var lightParam = new PaAlphaLoopParam;
            lightParam.displayObj = this.feverStarLight;
            lightParam.interval = 500;
            lightParam.duration = 500;
            lightParam.startAlpha = 1;
            lightParam.endAlpha = 0.1;
            lightParam.reverse = false;
            var lightEvent = new PlayProgramAnimationEvent();
            lightEvent.param = lightParam;
            GameMain.GetInstance().DispatchEvent(lightEvent);
            this.feverStarLightTimer = new egret.Timer(500, 1);
            this.feverStarLightTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.HideFeverStarLight, this);
            this.feverStarLightTimer.start();
        }
    };
    FeverItem.prototype.HideFeverStarLight = function () {
        this.feverStarLightTimer = null;
        this.removeChild(this.feverStarLight);
    };
    return FeverItem;
}(egret.DisplayObjectContainer));
__reflect(FeverItem.prototype, "FeverItem");
//# sourceMappingURL=FeverItem.js.map