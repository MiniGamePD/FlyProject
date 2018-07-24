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
var PaAlphaLoopParam = (function (_super) {
    __extends(PaAlphaLoopParam, _super);
    function PaAlphaLoopParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.AlphaLoop;
        _this.displayObj = null;
        _this.duration = 0;
        _this.interval = 0;
        _this.startAlpha = 0;
        _this.endAlpha = 1;
        _this.offestTime = 0;
        _this.reverse = false;
        _this.needRemoveOnFinish = false;
        return _this;
    }
    return PaAlphaLoopParam;
}(ProgramAnimationParamBase));
__reflect(PaAlphaLoopParam.prototype, "PaAlphaLoopParam");
var PaAlphaLoop = (function (_super) {
    __extends(PaAlphaLoop, _super);
    function PaAlphaLoop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaAlphaLoop.prototype.OnInit = function () {
        this.RefreshAlpha();
    };
    PaAlphaLoop.prototype.OnUpdate = function (deltaTime) {
        this.RefreshAlpha();
    };
    PaAlphaLoop.prototype.RefreshAlpha = function () {
        if (this.runningTime < this.param.duration
            && this.param.displayObj != null) {
            var runTime = this.runningTime + this.param.offestTime;
            var loopTurn = Math.floor(runTime / this.param.interval);
            var curLoopTime = runTime % this.param.interval;
            var rate = curLoopTime / this.param.interval;
            var alpha = 1;
            if (loopTurn % 2 == 1 && this.param.reverse) {
                alpha = Tools.Lerp(this.param.endAlpha, this.param.startAlpha, rate);
            }
            else {
                alpha = Tools.Lerp(this.param.startAlpha, this.param.endAlpha, rate);
            }
            this.param.displayObj.alpha = alpha;
        }
    };
    PaAlphaLoop.prototype.OnRelease = function () {
        if (this.param.needRemoveOnFinish) {
            if (this.param.displayObj.parent != undefined
                && this.param.displayObj.parent != null) {
                this.param.displayObj.parent.removeChild(this.param.displayObj);
            }
        }
    };
    PaAlphaLoop.prototype.IsFinish = function () {
        return this.runningTime >= this.param.duration
            || this.param.displayObj == null
            || this.param.displayObj.parent == null;
    };
    return PaAlphaLoop;
}(ProgramAnimationBase));
__reflect(PaAlphaLoop.prototype, "PaAlphaLoop");
//# sourceMappingURL=PaAlphaLoop.js.map