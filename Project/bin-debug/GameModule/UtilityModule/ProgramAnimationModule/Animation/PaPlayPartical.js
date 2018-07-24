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
var PaPlayParticalParam = (function (_super) {
    __extends(PaPlayParticalParam, _super);
    function PaPlayParticalParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.PlayPartical;
        _this.textureName = "";
        _this.jsonName = "";
        _this.duration = 0;
        _this.emitDuration = 0;
        _this.posX = 0;
        _this.posY = 0;
        return _this;
    }
    return PaPlayParticalParam;
}(ProgramAnimationParamBase));
__reflect(PaPlayParticalParam.prototype, "PaPlayParticalParam");
var PaPlayPartical = (function (_super) {
    __extends(PaPlayPartical, _super);
    function PaPlayPartical() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaPlayPartical.prototype.OnInit = function () {
        this.hasStopEmit = false;
        this.particleSys = this.resModule.CreateParticle(this.param.textureName, this.param.jsonName);
        this.particleSys.x = this.param.posX;
        this.particleSys.y = this.param.posY;
        GameMain.GetInstance().GetGameStage().addChild(this.particleSys);
        this.particleSys.start();
    };
    PaPlayPartical.prototype.OnUpdate = function (deltaTime) {
        if (this.runningTime > this.param.emitDuration) {
            this.StopEmit();
        }
    };
    PaPlayPartical.prototype.StopEmit = function () {
        if (!this.hasStopEmit) {
            this.hasStopEmit = false;
            this.particleSys.stop();
        }
    };
    PaPlayPartical.prototype.OnRelease = function () {
        if (this.particleSys != null
            && this.particleSys.parent != null
            && this.particleSys.parent != undefined) {
            this.particleSys.stop(true);
            this.particleSys.parent.removeChild(this.particleSys);
            this.particleSys = null;
        }
    };
    PaPlayPartical.prototype.IsFinish = function () {
        return this.runningTime >= this.param.duration;
    };
    return PaPlayPartical;
}(ProgramAnimationBase));
__reflect(PaPlayPartical.prototype, "PaPlayPartical");
//# sourceMappingURL=PaPlayPartical.js.map