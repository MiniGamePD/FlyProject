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
var ProgrameAnimationModule = (function (_super) {
    __extends(ProgrameAnimationModule, _super);
    function ProgrameAnimationModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgrameAnimationModule.prototype.Init = function () {
        this.resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        this.isForeground = true;
        this.animationList = [];
        GameMain.GetInstance().AddEventListener(PlayProgramAnimationEvent.EventName, this.OnPlayProgramAnimationEvent, this);
        return true;
    };
    ProgrameAnimationModule.prototype.SwitchForeOrBack = function (from, to) {
        this.isForeground = true;
    };
    ProgrameAnimationModule.prototype.Update = function (deltaTime) {
        for (var i = 0; i < this.animationList.length; ++i) {
            if (this.animationList[i] != null) {
                this.animationList[i].Update(deltaTime);
                if (this.animationList[i].IsFinish()) {
                    this.animationList[i].Release();
                    this.animationList.splice(i, 1);
                    --i;
                }
            }
        }
    };
    ProgrameAnimationModule.prototype.Release = function () {
        GameMain.GetInstance().RemoveEventListener(PlayProgramAnimationEvent.EventName, this.OnPlayProgramAnimationEvent, this);
    };
    ProgrameAnimationModule.prototype.CreateAnimation = function (param) {
        var animation = null;
        if (param != null) {
            switch (param.animType) {
                case ProgramAnimationType.Lightning:
                    animation = new PaLightning();
                    break;
                case ProgramAnimationType.PlayPartical:
                    animation = new PaPlayPartical();
                    break;
                case ProgramAnimationType.Scaling:
                    animation = new PaScaling();
                    break;
                case ProgramAnimationType.Rotation:
                    animation = new PaRotation();
                    break;
                case ProgramAnimationType.Moving:
                    animation = new PaMoving();
                    break;
                case ProgramAnimationType.AccMoving:
                    animation = new PaAccMoving();
                    break;
                case ProgramAnimationType.DynamicMoving:
                    animation = new PaDynamicMoving();
                    break;
                case ProgramAnimationType.MovePartical:
                    animation = new PaMovePartical();
                    break;
                case ProgramAnimationType.PlayDBAnimation:
                    animation = new PaPlayDBAnimation();
                    break;
                case ProgramAnimationType.AddScole:
                    animation = new PaAddScore();
                    break;
                case ProgramAnimationType.PlayFramesAnim:
                    animation = new PaPlayFramesAnim();
                    break;
                case ProgramAnimationType.AlphaLoop:
                    animation = new PaAlphaLoop();
                    break;
                case ProgramAnimationType.PlayCrossEliminaterEffect:
                    animation = new PaPlayCrossEliminaterEffect();
                    break;
                case ProgramAnimationType.AddFeverPowerEffect:
                    animation = new PaAddFeverPowerEffect();
                    break;
            }
        }
        if (animation != null) {
            var result = animation.Init(this.resModule, param);
            if (result) {
                this.animationList.push(animation);
            }
        }
    };
    ProgrameAnimationModule.prototype.OnPlayProgramAnimationEvent = function (event) {
        if (event != null) {
            this.CreateAnimation(event.param);
        }
    };
    return ProgrameAnimationModule;
}(ModuleBase));
__reflect(ProgrameAnimationModule.prototype, "ProgrameAnimationModule", ["IProgramAnimationModule", "IModule"]);
//# sourceMappingURL=ProgramAnimationModule.js.map