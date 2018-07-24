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
var PaMovingParam = (function (_super) {
    __extends(PaMovingParam, _super);
    function PaMovingParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.Moving;
        _this.displayObj = null;
        _this.duration = 0;
        _this.targetPosX = 0;
        _this.targetPosY = 0;
        _this.needRotate = false;
        _this.needRemoveOnFinish = false;
        return _this;
    }
    return PaMovingParam;
}(ProgramAnimationParamBase));
__reflect(PaMovingParam.prototype, "PaMovingParam");
var PaMoving = (function (_super) {
    __extends(PaMoving, _super);
    function PaMoving() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaMoving.prototype.OnInit = function () {
        this.startX = this.param.displayObj.x;
        this.startY = this.param.displayObj.y;
        if (this.param.needRotate) {
            this.param.displayObj.rotation =
                Tools.GetRotateAngle(this.startX, this.startY, this.param.targetPosX, this.param.targetPosY);
        }
    };
    PaMoving.prototype.OnUpdate = function (deltaTime) {
        if (this.runningTime <= this.param.duration) {
            var rate = this.runningTime / this.param.duration;
            this.param.displayObj.x = Tools.Lerp(this.startX, this.param.targetPosX, rate);
            this.param.displayObj.y = Tools.Lerp(this.startY, this.param.targetPosY, rate);
        }
    };
    PaMoving.prototype.OnRelease = function () {
        if (this.param.needRemoveOnFinish) {
            if (this.param.displayObj.parent != undefined
                && this.param.displayObj.parent != null) {
                this.param.displayObj.parent.removeChild(this.param.displayObj);
            }
        }
    };
    PaMoving.prototype.IsFinish = function () {
        return this.runningTime >= this.param.duration;
    };
    return PaMoving;
}(ProgramAnimationBase));
__reflect(PaMoving.prototype, "PaMoving");
//# sourceMappingURL=PaMoving.js.map