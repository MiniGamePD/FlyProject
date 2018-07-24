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
var ShapeBgButton = (function (_super) {
    __extends(ShapeBgButton, _super);
    function ShapeBgButton(shapeBgType, bgColor, bgThickness, bgEllipse, fgPath, bgWidth, bgHeight, fgWidth, fgHeight, clickCallback, callbackObj) {
        var _this = _super.call(this) || this;
        _this.bg = new egret.Shape();
        var temp = _this.bg;
        var bgColorRGB = bgColor / 256;
        var bgColorAlpha = bgColor & 0x000000FF;
        if (bgThickness > 0) {
            temp.graphics.lineStyle(bgThickness, bgColorRGB);
        }
        temp.graphics.beginFill(bgColorRGB, bgColorAlpha);
        if (shapeBgType == ShapeBgType.Rect)
            temp.graphics.drawRect(0, 0, bgWidth, bgHeight);
        else if (shapeBgType == ShapeBgType.RoundRect)
            temp.graphics.drawRoundRect(0, 0, bgWidth, bgHeight, bgEllipse, bgEllipse);
        temp.graphics.endFill();
        _this.addChild(_this.bg);
        _this.bg.touchEnabled = true;
        _this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.OnButtonClick, _this);
        _this.callbackObj = callbackObj;
        _this.clickCallback = clickCallback;
        if (fgPath != null) {
            var res = GameMain.GetInstance().GetModule(ModuleType.RES);
            _this.fg = res.CreateBitmapByName(fgPath);
            _this.fg.width = fgWidth;
            _this.fg.height = fgHeight;
            _this.fg.anchorOffsetX = fgWidth / 2;
            _this.fg.anchorOffsetY = fgHeight / 2;
            _this.fg.x = (bgWidth) / 2;
            _this.fg.y = (bgHeight) / 2;
            _this.addChild(_this.fg);
        }
        _this.width = bgWidth;
        _this.height = bgHeight;
        _this.anchorOffsetX = bgWidth / 2;
        _this.anchorOffsetY = bgHeight / 2;
        return _this;
    }
    ShapeBgButton.prototype.OnButtonClick = function () {
        var scaleParam = new PaScalingParam();
        scaleParam.displayObj = this;
        scaleParam.duration = 150;
        scaleParam.interval = 75;
        scaleParam.reverse = true;
        scaleParam.targetScaleX = 1.05;
        scaleParam.targetScaleY = 1.05;
        var scaleEvent = new PlayProgramAnimationEvent();
        scaleEvent.param = scaleParam;
        GameMain.GetInstance().DispatchEvent(scaleEvent);
        var soundEvent = new PlaySoundEvent("PillRotation_mp3", 1);
        GameMain.GetInstance().DispatchEvent(soundEvent);
        this.clickResponseAnimTimer = new egret.Timer(250, 1);
        this.clickResponseAnimTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.OnButtonResponseAnimFinish, this);
        this.clickResponseAnimTimer.start();
    };
    ShapeBgButton.prototype.OnButtonResponseAnimFinish = function () {
        this.clickResponseAnimTimer = null;
        if (this.clickCallback != null
            && this.clickCallback != undefined) {
            this.clickCallback(this.callbackObj);
        }
    };
    return ShapeBgButton;
}(ButtonBase));
__reflect(ShapeBgButton.prototype, "ShapeBgButton");
var ShapeBgType;
(function (ShapeBgType) {
    ShapeBgType[ShapeBgType["RoundRect"] = 0] = "RoundRect";
    ShapeBgType[ShapeBgType["Rect"] = 1] = "Rect";
})(ShapeBgType || (ShapeBgType = {}));
//# sourceMappingURL=ShapeBgButton.js.map