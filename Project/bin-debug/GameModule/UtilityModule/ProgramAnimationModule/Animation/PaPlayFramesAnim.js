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
var PaPlayFramesAnimParam = (function (_super) {
    __extends(PaPlayFramesAnimParam, _super);
    function PaPlayFramesAnimParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.PlayFramesAnim;
        _this.pos = null;
        _this.textNameSeq = [];
        _this.interval = 0;
        _this.times = 0;
        _this.anchor = AnchorType.Center;
        _this.rotation = 0;
        _this.scale = new egret.Point(1, 1);
        return _this;
    }
    return PaPlayFramesAnimParam;
}(ProgramAnimationParamBase));
__reflect(PaPlayFramesAnimParam.prototype, "PaPlayFramesAnimParam");
var PaPlayFramesAnim = (function (_super) {
    __extends(PaPlayFramesAnim, _super);
    function PaPlayFramesAnim() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaPlayFramesAnim.prototype.OnInit = function () {
        this.textureSeq = [];
        this.interval = this.param.interval;
        for (var i = 0; i < this.param.textNameSeq.length; ++i) {
            var texture = this.resModule.GetRes(this.param.textNameSeq[i]);
            if (texture != null) {
                this.textureSeq.push(texture);
            }
        }
        this.oneRoundTime = this.param.interval * this.textureSeq.length;
        this.duration = this.oneRoundTime * this.param.times;
        this.bitmap = new egret.Bitmap();
        GameMain.GetInstance().GetAdaptedStageContainer().addChild(this.bitmap);
        this.bitmap.x = this.param.pos.x;
        this.bitmap.y = this.param.pos.y;
        this.bitmap.scaleX = this.param.scale.x;
        this.bitmap.scaleY = this.param.scale.y;
        GameMain.GetInstance().AdapteDisplayObjectScale(this.bitmap);
        this.RefreshTexture(this.runningTime);
        Tools.SetAnchor(this.bitmap, this.param.anchor);
        this.bitmap.rotation = this.param.rotation;
    };
    PaPlayFramesAnim.prototype.OnUpdate = function (deltaTime) {
        this.RefreshTexture(this.runningTime);
    };
    PaPlayFramesAnim.prototype.RefreshTexture = function (time) {
        if (this.bitmap != undefined
            && this.bitmap != null
            && this.oneRoundTime > 0) {
            var curRoundTime = time % this.oneRoundTime;
            var index = Math.floor(curRoundTime / this.interval);
            if (index < this.textureSeq.length
                && this.textureSeq[index] != null) {
                this.bitmap.texture = this.textureSeq[index];
            }
        }
    };
    PaPlayFramesAnim.prototype.OnRelease = function () {
        if (this.bitmap != null
            && this.bitmap.parent != null
            && this.bitmap.parent != undefined) {
            this.bitmap.parent.removeChild(this.bitmap);
            this.bitmap = null;
        }
        this.textureSeq = [];
    };
    PaPlayFramesAnim.prototype.IsFinish = function () {
        return this.runningTime >= this.duration;
    };
    return PaPlayFramesAnim;
}(ProgramAnimationBase));
__reflect(PaPlayFramesAnim.prototype, "PaPlayFramesAnim");
//# sourceMappingURL=PaPlayFramesAnim.js.map