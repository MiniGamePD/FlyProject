var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProgramAnimationParamBase = (function () {
    function ProgramAnimationParamBase() {
        this.callBack = null;
        this.callBackObject = null;
        this.delayTime = 0;
    }
    return ProgramAnimationParamBase;
}());
__reflect(ProgramAnimationParamBase.prototype, "ProgramAnimationParamBase");
//# sourceMappingURL=ProgramAnimationParamBase.js.map