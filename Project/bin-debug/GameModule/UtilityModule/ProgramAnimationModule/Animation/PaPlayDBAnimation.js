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
var PaPlayDBAnimationParam = (function (_super) {
    __extends(PaPlayDBAnimationParam, _super);
    function PaPlayDBAnimationParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.PlayDBAnimation;
        _this.resName = "";
        _this.animationName = "";
        _this.duration = 0;
        _this.playTimes = -1;
        _this.posX = 0;
        _this.posY = 0;
        _this.scaleX = 1;
        _this.scaleY = 1;
        return _this;
    }
    return PaPlayDBAnimationParam;
}(ProgramAnimationParamBase));
__reflect(PaPlayDBAnimationParam.prototype, "PaPlayDBAnimationParam");
var PaPlayDBAnimation = (function (_super) {
    __extends(PaPlayDBAnimation, _super);
    function PaPlayDBAnimation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 派生类的初始化处理
    PaPlayDBAnimation.prototype.OnInit = function () { };
    // 派生类的更新处理
    PaPlayDBAnimation.prototype.OnUpdate = function (deltaTime) { };
    // 派生类的析构处理
    PaPlayDBAnimation.prototype.OnRelease = function () { };
    // 派生类返回是否完成
    PaPlayDBAnimation.prototype.IsFinish = function () { return true; };
    return PaPlayDBAnimation;
}(ProgramAnimationBase));
__reflect(PaPlayDBAnimation.prototype, "PaPlayDBAnimation");
//# sourceMappingURL=PaPlayDBAnimation.js.map