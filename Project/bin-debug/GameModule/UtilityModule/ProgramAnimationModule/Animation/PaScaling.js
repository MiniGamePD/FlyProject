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
var PaScalingParam = (function (_super) {
    __extends(PaScalingParam, _super);
    function PaScalingParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.Scaling;
        _this.displayObj = null;
        _this.duration = 0;
        _this.targetScaleX = 0;
        _this.targetScaleY = 0;
        _this.interval = 0;
        _this.reverse = false;
        _this.needRemoveOnFinish = false;
        return _this;
    }
    return PaScalingParam;
}(ProgramAnimationParamBase));
__reflect(PaScalingParam.prototype, "PaScalingParam");
var PaScaling = (function (_super) {
    __extends(PaScaling, _super);
    function PaScaling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaScaling.prototype.OnInit = function () {
        this.startScaleX = this.param.displayObj.scaleX;
        this.startScaleY = this.param.displayObj.scaleY;
        if (this.param.interval == 0) {
            this.param.interval = this.param.duration;
        }
    };
    PaScaling.prototype.OnUpdate = function (deltaTime) {
        if (this.runningTime < this.param.duration
            && this.param.displayObj != null) {
            var runTime = this.runningTime;
            var loopTurn = Math.floor(runTime / this.param.interval);
            var curLoopTime = runTime % this.param.interval;
            var rate = curLoopTime / this.param.interval;
            var scaleX = 1;
            var scaleY = 1;
            if (loopTurn % 2 == 1 && this.param.reverse) {
                scaleX = Tools.Lerp(this.param.targetScaleX, this.startScaleX, rate);
                scaleY = Tools.Lerp(this.param.targetScaleY, this.startScaleY, rate);
            }
            else {
                scaleX = Tools.Lerp(this.startScaleX, this.param.targetScaleX, rate);
                scaleY = Tools.Lerp(this.startScaleY, this.param.targetScaleY, rate);
            }
            this.param.displayObj.scaleX = scaleX;
            this.param.displayObj.scaleY = scaleY;
        }
    };
    PaScaling.prototype.OnRelease = function () {
        if (this.param.needRemoveOnFinish) {
            if (this.param.displayObj.parent != undefined
                && this.param.displayObj.parent != null) {
                this.param.displayObj.parent.removeChild(this.param.displayObj);
            }
        }
    };
    PaScaling.prototype.IsFinish = function () {
        return this.runningTime >= this.param.duration;
    };
    return PaScaling;
}(ProgramAnimationBase));
__reflect(PaScaling.prototype, "PaScaling");
//# sourceMappingURL=PaScaling.js.map