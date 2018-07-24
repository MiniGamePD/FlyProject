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
var PaPlayCrossEliminaterEffectParam = (function (_super) {
    __extends(PaPlayCrossEliminaterEffectParam, _super);
    function PaPlayCrossEliminaterEffectParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.PlayCrossEliminaterEffect;
        _this.pos = null;
        _this.direction = [];
        return _this;
    }
    return PaPlayCrossEliminaterEffectParam;
}(ProgramAnimationParamBase));
__reflect(PaPlayCrossEliminaterEffectParam.prototype, "PaPlayCrossEliminaterEffectParam");
var PaPlayCrossEliminaterEffect = (function (_super) {
    __extends(PaPlayCrossEliminaterEffect, _super);
    function PaPlayCrossEliminaterEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaPlayCrossEliminaterEffect.prototype.OnInit = function () {
        this.PlayBoomEffect();
        for (var i = 0; i < this.param.direction.length; ++i) {
            this.MoveOneSide(this.param.direction[i]);
            this.PlayTailEffect(this.param.direction[i]);
            this.PlayPartical(this.param.direction[i]);
        }
    };
    PaPlayCrossEliminaterEffect.prototype.OnUpdate = function (deltaTime) {
    };
    PaPlayCrossEliminaterEffect.prototype.PlayTailEffect = function (dir) {
        var playEffectParam = new PaPlayFramesAnimParam();
        playEffectParam.pos = this.param.pos;
        playEffectParam.scale = new egret.Point(1, 0.6);
        playEffectParam.textNameSeq = Frame_Anim_CrossEliminater_tuowei;
        playEffectParam.interval = 50;
        playEffectParam.times = 1;
        playEffectParam.anchor = AnchorType.Left;
        playEffectParam.rotation = Tools.GetDirectionRotateAngle(dir);
        var event = new PlayProgramAnimationEvent();
        event.param = playEffectParam;
        GameMain.GetInstance().DispatchEvent(event);
    };
    PaPlayCrossEliminaterEffect.prototype.MoveOneSide = function (dir) {
        var startX = this.param.pos.x;
        var startY = this.param.pos.y;
        var targetOffset = Math.max(GameMain.GetInstance().GetStageHeight(), GameMain.GetInstance().GetStageWidth());
        var headPic = this.resModule.CreateBitmapByName("Cross_huojianEff");
        headPic.anchorOffsetX = headPic.width / 2;
        headPic.anchorOffsetY = headPic.height / 2;
        headPic.x = startX;
        headPic.y = startY;
        GameMain.GetInstance().AdapteDisplayObjectScale(headPic);
        GameMain.GetInstance().GetAdaptedStageContainer().addChild(headPic);
        var movingParam = new PaMovingParam;
        movingParam.displayObj = headPic;
        movingParam.duration = 1000;
        movingParam.targetPosX = Tools.MoveScenePosX(startX, dir, targetOffset);
        movingParam.targetPosY = Tools.MoveScenePosY(startY, dir, targetOffset);
        movingParam.needRotate = true;
        movingParam.needRemoveOnFinish = true;
        var event = new PlayProgramAnimationEvent();
        event.param = movingParam;
        GameMain.GetInstance().DispatchEvent(event);
    };
    PaPlayCrossEliminaterEffect.prototype.PlayBoomEffect = function () {
        var playEffectParam = new PaPlayFramesAnimParam();
        playEffectParam.pos = this.param.pos;
        playEffectParam.textNameSeq = Frame_Anim_CrossEliminater_fashe;
        playEffectParam.interval = 100;
        playEffectParam.times = 1;
        var event = new PlayProgramAnimationEvent();
        event.param = playEffectParam;
        GameMain.GetInstance().DispatchEvent(event);
    };
    PaPlayCrossEliminaterEffect.prototype.PlayPartical = function (dir) {
        var startX = this.param.pos.x;
        var startY = this.param.pos.y;
        var targetOffset = Math.max(GameMain.GetInstance().GetStageHeight(), GameMain.GetInstance().GetStageWidth());
        var particalParam = new PaMoveParticalParam;
        particalParam.textureName = "huojian_shinning";
        particalParam.jsonName = "huojian_shinning";
        particalParam.duration = 2000;
        particalParam.flyDuration = 1000;
        particalParam.stayDuration = 0;
        particalParam.stratPosX = startX;
        particalParam.stratPosY = startY;
        particalParam.endPosX = Tools.MoveScenePosX(startX, dir, targetOffset);
        particalParam.endPosY = Tools.MoveScenePosY(startY, dir, targetOffset);
        particalParam.isMoveEmitter = true;
        var event = new PlayProgramAnimationEvent();
        event.param = particalParam;
        GameMain.GetInstance().DispatchEvent(event);
    };
    PaPlayCrossEliminaterEffect.prototype.OnRelease = function () {
    };
    PaPlayCrossEliminaterEffect.prototype.IsFinish = function () {
        return true; //this.runningTime >= this.duration;
    };
    return PaPlayCrossEliminaterEffect;
}(ProgramAnimationBase));
__reflect(PaPlayCrossEliminaterEffect.prototype, "PaPlayCrossEliminaterEffect");
//# sourceMappingURL=PaPlayCrossEliminaterEffect.js.map