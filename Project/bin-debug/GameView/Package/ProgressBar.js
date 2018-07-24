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
var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar(bgPath, bgRange, fgPath, fgRange, dir) {
        if (dir === void 0) { dir = ProgressBarDir.Horizontal_L2R; }
        var _this = _super.call(this) || this;
        _this.direction = dir;
        _this.progressValue = 1;
        var res = GameMain.GetInstance().GetModule(ModuleType.RES);
        _this.background = res.CreateBitmapByName(bgPath);
        _this.foreground = res.CreateBitmapByName(fgPath);
        _this.addChild(_this.background);
        _this.addChild(_this.foreground);
        _this.background.x = bgRange.x;
        _this.background.y = bgRange.y;
        _this.background.width = bgRange.width;
        _this.background.height = bgRange.height;
        _this.foreground.x = fgRange.x;
        _this.foreground.y = fgRange.y;
        _this.foreground.width = fgRange.width;
        _this.foreground.height = fgRange.height;
        var fgMask = new egret.Rectangle(0, 0, fgRange.width, fgRange.height);
        _this.foreground.mask = fgMask;
        return _this;
    }
    ProgressBar.prototype.SetProgress = function (value) {
        this.progressValue = value;
        var fgMask;
        if (this.direction == ProgressBarDir.Horizontal_L2R)
            fgMask = new egret.Rectangle(0, 0, this.foreground.width * this.progressValue, this.foreground.height);
        else if (this.direction == ProgressBarDir.Vertical_U2D)
            fgMask = new egret.Rectangle(0, 0, this.foreground.width, this.foreground.height * this.progressValue);
        else
            console.error("Invalid ProgressBarDir " + this.direction);
        this.foreground.mask = fgMask;
    };
    ProgressBar.prototype.Adapt = function () {
        GameMain.GetInstance().AdapteDisplayObject(this);
        GameMain.GetInstance().AdapteDisplayObject(this.background);
        GameMain.GetInstance().AdapteDisplayObject(this.foreground);
    };
    return ProgressBar;
}(egret.DisplayObjectContainer));
__reflect(ProgressBar.prototype, "ProgressBar");
var ProgressBarDir;
(function (ProgressBarDir) {
    ProgressBarDir[ProgressBarDir["Horizontal_L2R"] = 0] = "Horizontal_L2R";
    ProgressBarDir[ProgressBarDir["Vertical_U2D"] = 1] = "Vertical_U2D";
})(ProgressBarDir || (ProgressBarDir = {}));
//# sourceMappingURL=ProgressBar.js.map