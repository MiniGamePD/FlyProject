var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkillMoveEffect = (function () {
    function SkillMoveEffect() {
    }
    SkillMoveEffect.prototype.Init = function (fromX, fromY, toX, toY, duration, matchView) {
        this.matchView = matchView;
        this.startX = fromX;
        this.startY = fromY;
        this.endX = toX;
        this.endY = toY;
        this.duration = duration;
        this.runningTime = 0;
        this.InitShape();
    };
    SkillMoveEffect.prototype.InitShape = function () {
        var resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        this.particleSys = resModule.CreateParticle("Particle_Boss_Skill_Fly", "Particle_Boss_Skill_Fly");
        this.particleSys.x = this.startX;
        this.particleSys.y = this.startY;
        this.particleSys.emitterX = 0;
        this.particleSys.emitterY = 0;
        this.particleSys.start();
        this.matchView.BattleGroundAddChild(this.particleSys);
    };
    SkillMoveEffect.prototype.Update = function (deltaTime) {
        this.runningTime += deltaTime;
        var rate = this.runningTime / this.duration;
        if (rate > 1)
            rate = 1;
        this.particleSys.emitterX = (this.endX - this.startX) * rate;
        this.particleSys.emitterY = (this.endY - this.startY) * rate;
    };
    SkillMoveEffect.prototype.IsFinish = function () {
        return this.runningTime >= this.duration;
    };
    SkillMoveEffect.prototype.Release = function () {
        this.matchView.BattleGroundRemoveChild(this.particleSys);
    };
    return SkillMoveEffect;
}());
__reflect(SkillMoveEffect.prototype, "SkillMoveEffect");
//# sourceMappingURL=SkillMoveEffect.js.map