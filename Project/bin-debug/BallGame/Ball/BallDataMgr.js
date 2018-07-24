var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BallDataMgr = (function () {
    function BallDataMgr() {
    }
    BallDataMgr.prototype.Init = function () {
        var ballConfigMdl = GameMain.GetInstance().GetModule(ModuleType.BALL_CONFIG);
        this.ballConfig = ballConfigMdl.GetCurBallConfig();
    };
    BallDataMgr.prototype.ChangeBall = function (ballId, level) {
        var ballConfigMdl = GameMain.GetInstance().GetModule(ModuleType.BALL_CONFIG);
        this.ballConfig = ballConfigMdl.GetBallConfig(ballId, level);
    };
    BallDataMgr.prototype.GetBallEmitRadius = function () {
        if (this.ballConfig.skill_ScaleOnEmitter_Rate > 0
            && this.ballConfig.skill_ScaleOnEmitter_Scale > 0
            && Math.random() <= this.ballConfig.skill_ScaleOnEmitter_Rate) {
            return this.ballConfig.ballRadius * this.ballConfig.skill_ScaleOnEmitter_Scale;
        }
        else {
            return this.ballConfig.ballRadius;
        }
    };
    BallDataMgr.prototype.IsTriggerSkill_ScaleOnHit = function () {
        if (this.ballConfig.skill_ScaleOnHit_Rate > 0
            && this.ballConfig.skill_ScaleOnHit_Scale > 0
            && Math.random() <= this.ballConfig.skill_ScaleOnHit_Rate) {
            return true;
        }
        else {
            return false;
        }
    };
    BallDataMgr.prototype.IsTriggerSkill_SplitBallOnHit = function () {
        if (this.ballConfig.skill_SplitBallOnHit_Rate > 0
            && this.ballConfig.skill_SplitBallOnHit_Count > 0
            && Math.random() <= this.ballConfig.skill_SplitBallOnHit_Rate) {
            return true;
        }
        else {
            return false;
        }
    };
    BallDataMgr.prototype.IsTriggerSkill_CreateBallOnBoxEliminate = function () {
        if (this.ballConfig.skill_CreateBallOnBoxEliminate_Rate > 0
            && this.ballConfig.skill_CreateBallOnBoxEliminate_Count > 0
            && Math.random() <= this.ballConfig.skill_CreateBallOnBoxEliminate_Rate) {
            return true;
        }
        else {
            return false;
        }
    };
    BallDataMgr.prototype.IsTriggerSkill_PauseBoxOnHit = function () {
        if (this.ballConfig.skill_PauseBoxOnHit_Rate > 0
            && this.ballConfig.skill_PauseBoxOnHit_Time > 0
            && Math.random() <= this.ballConfig.skill_PauseBoxOnHit_Rate) {
            return true;
        }
        else {
            return false;
        }
    };
    BallDataMgr.prototype.IsTriggerSkill_BoomOnHit = function () {
        if (this.ballConfig.skill_BoomOnHit_Rate > 0
            && this.ballConfig.skill_BoomOnHit_Range > 0
            && this.ballConfig.skill_BoomOnHit_Damage > 0
            && Math.random() <= this.ballConfig.skill_BoomOnHit_Rate) {
            return true;
        }
        else {
            return false;
        }
    };
    BallDataMgr.prototype.IsTriggerSkill_CriticalStrike = function () {
        if (this.ballConfig.skill_CriticalStrike_Rate > 0
            && this.ballConfig.skill_CriticalStrike_Damage > 0
            && Math.random() <= this.ballConfig.skill_CriticalStrike_Rate) {
            return true;
        }
        else {
            return false;
        }
    };
    return BallDataMgr;
}());
__reflect(BallDataMgr.prototype, "BallDataMgr");
//# sourceMappingURL=BallDataMgr.js.map