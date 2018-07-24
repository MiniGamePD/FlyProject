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
var PaLightningParam = (function (_super) {
    __extends(PaLightningParam, _super);
    function PaLightningParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.Lightning;
        _this.displayObj = null;
        _this.duration = 0;
        _this.interval = 0;
        _this.hideRate = 0;
        return _this;
    }
    return PaLightningParam;
}(ProgramAnimationParamBase));
__reflect(PaLightningParam.prototype, "PaLightningParam");
var PaLightning = (function (_super) {
    __extends(PaLightning, _super);
    function PaLightning() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaLightning.prototype.OnInit = function () {
        this.isHide = false;
    };
    PaLightning.prototype.OnUpdate = function (deltaTime) {
        var needHide = false;
        if (this.runningTime < this.param.duration) {
            var cycle = this.runningTime / this.param.interval;
            var rate = cycle - Math.floor(cycle);
            needHide = rate < this.param.hideRate;
        }
        if (needHide != this.isHide) {
            this.isHide = needHide;
            this.param.displayObj.visible = !needHide;
        }
    };
    PaLightning.prototype.OnRelease = function () {
    };
    PaLightning.prototype.IsFinish = function () {
        return this.runningTime >= this.param.duration;
    };
    return PaLightning;
}(ProgramAnimationBase));
__reflect(PaLightning.prototype, "PaLightning");
//# sourceMappingURL=PaLightning.js.map