var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProgramAnimationBase = (function () {
    function ProgramAnimationBase() {
        this.runningTime = 0;
        this.delayReduceTime = 0;
    }
    ProgramAnimationBase.prototype.Init = function (resModule, param) {
        this.resModule = resModule;
        this.runningTime = 0;
        this.animType = param.animType;
        this.param = param;
        if (this.param != null) {
            if (this.param.delayTime == undefined
                || this.param.delayTime <= 0) {
                this.OnInit();
            }
            else {
                this.delayReduceTime = this.param.delayTime != undefined ? this.param.delayTime : 0;
            }
            return true;
        }
        else {
            return false;
        }
    };
    ProgramAnimationBase.prototype.Update = function (deltaTime) {
        if (this.delayReduceTime > 0) {
            this.delayReduceTime -= deltaTime;
            if (this.delayReduceTime <= 0) {
                this.OnInit();
            }
        }
        else {
            this.runningTime += deltaTime;
            this.OnUpdate(deltaTime);
        }
    };
    ProgramAnimationBase.prototype.Release = function () {
        this.OnRelease();
        if (this.param.callBack != undefined
            && this.param.callBack != null) {
            this.param.callBack(this.runningTime);
        }
        this.runningTime = 0;
        this.delayReduceTime = 0;
        this.animType = ProgramAnimationType.None;
        this.param = null;
    };
    return ProgramAnimationBase;
}());
__reflect(ProgramAnimationBase.prototype, "ProgramAnimationBase", ["IProgramAnimation"]);
//# sourceMappingURL=ProgramAnimationBase.js.map