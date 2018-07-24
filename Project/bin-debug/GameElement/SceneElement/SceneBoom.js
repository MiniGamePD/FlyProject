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
var SceneBoom = (function (_super) {
    __extends(SceneBoom, _super);
    function SceneBoom(owner) {
        var _this = _super.call(this, owner) || this;
        _this.renderer = new egret.Bitmap();
        _this.accessory = new egret.DisplayObjectContainer();
        _this.color = GameElementColor.random;
        _this.canDrop = true;
        _this.elementType = SceneElementType.Boom;
        _this.RefreshTexture();
        _this.eliminateMinCount = 1;
        _this.eliminateSound = "Boom_mp3";
        return _this;
    }
    SceneBoom.prototype.RefreshTexture = function () {
        if (this.resModule == null) {
            this.resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        }
        this.framesAnim = this.CreateFramesAnim();
        this.CreateRangeEffect();
    };
    SceneBoom.prototype.CreateFramesAnim = function () {
        var framesAnim = new SyncFramesAnim();
        framesAnim.Init(this.renderer, Frame_Anim_SceneBoom, 200);
        return framesAnim;
    };
    SceneBoom.prototype.GetResPathByColor = function () {
        var path = "Boom1";
        return path;
    };
    SceneBoom.prototype.PlayBoomEffect = function () {
        var playEffectParam = new PaPlayFramesAnimParam();
        playEffectParam.pos = new egret.Point(Tools.ElementPosToGameStagePosX(this.posx), Tools.ElementPosToGameStagePosY(this.posy));
        playEffectParam.textNameSeq = Frame_Anim_SceneBoom_Effect;
        playEffectParam.interval = 50;
        playEffectParam.times = 1;
        playEffectParam.scale = new egret.Point(2, 2);
        var event = new PlayProgramAnimationEvent();
        event.param = playEffectParam;
        GameMain.GetInstance().DispatchEvent(event);
    };
    SceneBoom.prototype.CreateRangeEffect = function () {
        this.rangeEffect = [];
        var offsetTime0 = 0;
        var offsetTime1 = 0;
        var offsetTime2 = 0;
        this.CreateRangeObj(0, 1, offsetTime0);
        this.CreateRangeObj(0, -1, offsetTime0);
        this.CreateRangeObj(1, 0, offsetTime0);
        this.CreateRangeObj(-1, 0, offsetTime0);
        this.CreateRangeObj(1, 1, offsetTime1);
        this.CreateRangeObj(1, -1, offsetTime1);
        this.CreateRangeObj(-1, 1, offsetTime1);
        this.CreateRangeObj(-1, -1, offsetTime1);
        this.CreateRangeObj(0, 2, offsetTime2);
        this.CreateRangeObj(0, -2, offsetTime2);
        this.CreateRangeObj(2, 0, offsetTime2);
        this.CreateRangeObj(-2, 0, offsetTime2);
    };
    SceneBoom.prototype.CreateRangeObj = function (xOffset, yOffset, offsetTime) {
        var bitmap = this.resModule.CreateBitmapByName("pd_res_json.range");
        bitmap.width = Tools.MatchViewElementWidth;
        bitmap.height = Tools.MatchViewElementHeight;
        bitmap.anchorOffsetX = Tools.MatchViewElementWidth / 2;
        bitmap.anchorOffsetY = Tools.MatchViewElementHeight / 2;
        this.accessory.addChild(bitmap);
        bitmap.x += xOffset * Tools.MatchViewElementWidth;
        bitmap.y += yOffset * Tools.MatchViewElementHeight;
        this.rangeEffect.push(bitmap);
        this.PlayAlphaLoop(bitmap, offsetTime);
    };
    SceneBoom.prototype.PlayAlphaLoop = function (displayObj, offsetTime) {
        var param = new PaAlphaLoopParam;
        param.displayObj = displayObj;
        param.interval = 800;
        param.duration = 999999;
        param.offestTime = offsetTime;
        param.startAlpha = 0.6;
        param.endAlpha = 0.9;
        param.reverse = true;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    SceneBoom.prototype.Release = function () {
        if (this.rangeEffect != undefined
            && this.rangeEffect != null) {
            for (var i = 0; i < this.rangeEffect.length; ++i) {
                if (this.rangeEffect[i] != null
                    && this.rangeEffect[i].parent != null) {
                    this.rangeEffect[i].parent.removeChild(this.rangeEffect[i]);
                }
            }
        }
        _super.prototype.Release.call(this);
    };
    return SceneBoom;
}(SceneElementBase));
__reflect(SceneBoom.prototype, "SceneBoom");
//# sourceMappingURL=SceneBoom.js.map