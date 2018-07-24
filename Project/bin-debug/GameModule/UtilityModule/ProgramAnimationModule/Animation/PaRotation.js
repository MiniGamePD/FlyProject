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
var PaRotationParam = (function (_super) {
    __extends(PaRotationParam, _super);
    function PaRotationParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.Rotation;
        _this.displayObj = null;
        _this.duration = 0;
        _this.targetRot = 0;
        _this.loop = false;
        return _this;
    }
    return PaRotationParam;
}(ProgramAnimationParamBase));
__reflect(PaRotationParam.prototype, "PaRotationParam");
var PaRotation = (function (_super) {
    __extends(PaRotation, _super);
    function PaRotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaRotation.prototype.OnInit = function () {
        this.startRot = this.param.displayObj.rotation;
    };
    PaRotation.prototype.OnUpdate = function (deltaTime) {
        if (this.runningTime >= this.param.duration)
            this.runningTime -= this.param.duration;
        if (this.runningTime < this.param.duration) {
            var rate = this.runningTime / this.param.duration;
            this.param.displayObj.rotation = Tools.Lerp(this.startRot, this.param.targetRot, rate);
        }
    };
    PaRotation.prototype.OnRelease = function () {
    };
    PaRotation.prototype.IsFinish = function () {
        return (!this.param.loop && this.runningTime >= this.param.duration)
            || (this.param.displayObj == null || this.param.displayObj == undefined);
    };
    return PaRotation;
}(ProgramAnimationBase));
__reflect(PaRotation.prototype, "PaRotation");
//# sourceMappingURL=PaRotation.js.map