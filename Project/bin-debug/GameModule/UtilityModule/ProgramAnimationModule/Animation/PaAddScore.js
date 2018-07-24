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
var PaAddScoreParam = (function (_super) {
    __extends(PaAddScoreParam, _super);
    function PaAddScoreParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.AddScole;
        _this.score = 0;
        _this.pos = null;
        _this.duration = 800;
        return _this;
    }
    return PaAddScoreParam;
}(ProgramAnimationParamBase));
__reflect(PaAddScoreParam.prototype, "PaAddScoreParam");
var PaAddScore = (function (_super) {
    __extends(PaAddScore, _super);
    function PaAddScore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scaleTargetStep1 = new egret.Point(0.8, 0.8); // 缩放出现步骤1目标值
        _this.scaleDurationRateStep1 = 0.15; // 缩放出现步骤1的时间百分比
        _this.scaleTargetStep2 = new egret.Point(0.5, 0.7); // 缩放出现步骤2目标值
        _this.scaleDurationRateStep2 = 0.15; // 缩放出现步骤2的时间百分比
        _this.fateOutStartRate = 0.6; // 渐隐消失启动时间的百分比
        _this.moveUpRate = 0.5; //上移一个格子宽度的百分比
        _this.scaleDurationStep1 = 0;
        _this.scaleDurationStep2 = 0;
        _this.fateOutStartTime = 0;
        _this.fateOutDuration = 0;
        _this.startPosY = 0;
        _this.targetPosY = 0;
        return _this;
    }
    PaAddScore.prototype.OnInit = function () {
        this.scaleTargetStep1 = GameMain.GetInstance().AdaptPoint(this.scaleTargetStep1);
        this.scaleTargetStep2 = GameMain.GetInstance().AdaptPoint(this.scaleTargetStep2);
        this.scoreText = this.resModule.CreateBitmapText("font_num1_fnt");
        GameMain.GetInstance().GetAdaptedStageContainer().addChild(this.scoreText);
        this.scoreText.x = this.param.pos.x;
        this.scoreText.y = this.param.pos.y;
        this.scoreText.width = 150;
        this.scoreText.height = 37;
        this.scoreText.anchorOffsetX = this.scoreText.width / 2;
        this.scoreText.anchorOffsetY = this.scoreText.height / 2;
        this.scoreText.textAlign = "center";
        this.scoreText.text = this.param.score.toString();
        GameMain.GetInstance().AdapteDisplayObjectScale(this.scoreText);
        this.scoreText.scaleX = 0;
        this.scoreText.scaleY = 0;
        this.scoreText.alpha = 1;
        this.scaleDurationStep1 = this.scaleDurationRateStep1 * this.param.duration;
        this.scaleDurationStep2 = this.scaleDurationRateStep2 * this.param.duration;
        this.fateOutStartTime = this.fateOutStartRate * this.param.duration;
        this.fateOutDuration = (1 - this.fateOutStartRate) * this.param.duration;
        this.startPosY = this.scoreText.y;
        this.targetPosY = this.startPosY - this.moveUpRate * Tools.MatchViewElementHeight;
    };
    PaAddScore.prototype.OnUpdate = function (deltaTime) {
        if (this.runningTime < this.scaleDurationStep1) {
            var rate = this.runningTime / this.scaleDurationStep1;
            this.scoreText.scaleX = Tools.Lerp(0, this.scaleTargetStep1.x, rate);
            this.scoreText.scaleY = Tools.Lerp(0, this.scaleTargetStep1.y, rate);
        }
        else if (this.runningTime < this.scaleDurationStep1 + this.scaleDurationStep2) {
            var rate = (this.runningTime - this.scaleDurationStep1) / this.scaleDurationStep2;
            this.scoreText.scaleX = Tools.Lerp(this.scaleTargetStep1.x, this.scaleTargetStep2.x, rate);
            this.scoreText.scaleY = Tools.Lerp(this.scaleTargetStep1.y, this.scaleTargetStep2.y, rate);
        }
        if (this.runningTime > this.fateOutStartTime
            && this.runningTime <= this.fateOutStartTime + this.fateOutDuration) {
            var rate = (this.runningTime - this.fateOutStartTime) / this.fateOutDuration;
            this.scoreText.alpha = Tools.Lerp(1, 0, rate);
        }
        var moveRate = this.runningTime / this.param.duration;
        this.scoreText.y = Tools.Lerp(this.startPosY, this.targetPosY, moveRate);
    };
    PaAddScore.prototype.OnRelease = function () {
        if (this.scoreText != null
            && this.scoreText.parent != null
            && this.scoreText.parent != undefined) {
            this.scoreText.parent.removeChild(this.scoreText);
            this.scoreText = null;
        }
    };
    PaAddScore.prototype.IsFinish = function () {
        return this.runningTime >= this.param.duration;
    };
    return PaAddScore;
}(ProgramAnimationBase));
__reflect(PaAddScore.prototype, "PaAddScore");
//# sourceMappingURL=PaAddScore.js.map