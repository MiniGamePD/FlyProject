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
var PaMoveParticalParam = (function (_super) {
    __extends(PaMoveParticalParam, _super);
    function PaMoveParticalParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.MovePartical;
        _this.textureName = "";
        _this.jsonName = "";
        _this.duration = 0;
        _this.flyDuration = 0;
        _this.stayDuration = 0;
        _this.stratPosX = 0;
        _this.stratPosY = 0;
        _this.endPosX = 0;
        _this.endPosY = 0;
        _this.isMoveEmitter = false;
        return _this;
    }
    return PaMoveParticalParam;
}(ProgramAnimationParamBase));
__reflect(PaMoveParticalParam.prototype, "PaMoveParticalParam");
var PaMovePartical = (function (_super) {
    __extends(PaMovePartical, _super);
    function PaMovePartical() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaMovePartical.prototype.OnInit = function () {
        this.hasStop = false;
        this.particleSys = this.resModule.CreateParticle(this.param.textureName, this.param.jsonName);
        this.particleSys.x = this.param.stratPosX;
        this.particleSys.y = this.param.stratPosY;
        this.particleSys.rotation = Tools.GetRotateAngle(this.param.stratPosX, this.param.stratPosY, this.param.endPosX, this.param.endPosY);
        // GameMain.GetInstance().AdapteDisplayObjectScale(this.particleSys);
        GameMain.GetInstance().GetAdaptedStageContainer().addChild(this.particleSys);
        this.particleSys.start();
        this.distance = Tools.PointDistance(this.param.stratPosX, this.param.stratPosY, this.param.endPosX, this.param.endPosY);
    };
    PaMovePartical.prototype.OnUpdate = function (deltaTime) {
        if (this.runningTime <= this.param.duration) {
            if (this.runningTime <= this.param.flyDuration + this.param.stayDuration) {
                var rate = this.runningTime / this.param.flyDuration;
                if (rate > 1)
                    rate = 1;
                if (this.param.isMoveEmitter) {
                    this.particleSys.emitterX = rate * this.distance;
                }
                else {
                    this.particleSys.x = Tools.Lerp(this.param.stratPosX, this.param.endPosX, rate);
                    this.particleSys.y = Tools.Lerp(this.param.stratPosY, this.param.endPosY, rate);
                }
            }
            else {
                this.StopPartical();
            }
        }
    };
    PaMovePartical.prototype.StopPartical = function () {
        if (!this.hasStop) {
            this.hasStop = true;
            this.particleSys.stop();
        }
    };
    PaMovePartical.prototype.OnRelease = function () {
        if (this.particleSys != null
            && this.particleSys.parent != null
            && this.particleSys.parent != undefined) {
            this.StopPartical();
            this.particleSys.parent.removeChild(this.particleSys);
            this.particleSys = null;
        }
    };
    PaMovePartical.prototype.IsFinish = function () {
        return this.runningTime >= this.param.duration;
    };
    return PaMovePartical;
}(ProgramAnimationBase));
__reflect(PaMovePartical.prototype, "PaMovePartical");
//# sourceMappingURL=PaMovePartical.js.map