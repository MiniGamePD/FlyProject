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
var SceneVitamins = (function (_super) {
    __extends(SceneVitamins, _super);
    function SceneVitamins(owner) {
        var _this = _super.call(this, owner) || this;
        _this.renderer = new egret.Bitmap();
        _this.color = _this.RandomColor();
        _this.canDrop = true;
        _this.elementType = SceneElementType.Vitamins;
        _this.RefreshTexture();
        _this.eliminateMinCount = Scene.EliminateMinCount;
        _this.eliminateSound = "Boom_mp3";
        return _this;
    }
    SceneVitamins.prototype.GetResPathByColor = function () {
        var path = "pd_res_json.Vitamins_";
        switch (this.color) {
            case GameElementColor.red:
                path += "Red";
                break;
            case GameElementColor.blue:
                path += "Blue";
                break;
            case GameElementColor.yellow:
                path += "Yellow";
                break;
            default:
                if (true) {
                    console.log("Unknow Color:" + this.color);
                }
                break;
        }
        return path;
    };
    SceneVitamins.prototype.PlayBoomEffect = function () {
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
    return SceneVitamins;
}(SceneElementBase));
__reflect(SceneVitamins.prototype, "SceneVitamins");
//# sourceMappingURL=SceneVitamins.js.map