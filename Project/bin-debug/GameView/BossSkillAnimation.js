var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BossSkillAnimation = (function () {
    function BossSkillAnimation() {
    }
    BossSkillAnimation.prototype.Init = function (view) {
        this.state = BossSkillAnimState.Init;
        this.matchView = view;
        this.runningTime = 0;
        this.stateRunningTime = 0;
        this.skillMoveEffects = [];
    };
    BossSkillAnimation.prototype.IsPlaying = function () {
        return this.state != BossSkillAnimState.Init;
    };
    BossSkillAnimation.prototype.Start = function (bossSkillInfo) {
        this.runningTime = 0;
        this.stateRunningTime = 0;
        this.bossSkillInfo = bossSkillInfo;
        if (bossSkillInfo != null
            && bossSkillInfo.hasInfo
            && bossSkillInfo.skillCaster != null) {
            this.EnterState(BossSkillAnimState.BossAnim);
        }
    };
    BossSkillAnimation.prototype.Update = function (deltaTime) {
        this.runningTime += deltaTime;
        this.stateRunningTime += deltaTime;
        switch (this.state) {
            case BossSkillAnimState.BossAnim:
                {
                    if (this.stateRunningTime > BossSkillAnimation.BossAnimDuration)
                        this.EnterState(BossSkillAnimState.LinkElement);
                    break;
                }
            case BossSkillAnimState.LinkElement:
                {
                    if (this.stateRunningTime > BossSkillAnimation.LinkElementDuration)
                        this.EnterState(BossSkillAnimState.PreElementAnim);
                    break;
                }
            case BossSkillAnimState.PreElementAnim:
                {
                    if (this.stateRunningTime > BossSkillAnimation.PreElementAnimDuration)
                        this.EnterState(BossSkillAnimState.NewElementAnim);
                    break;
                }
            case BossSkillAnimState.NewElementAnim:
                {
                    if (this.stateRunningTime > BossSkillAnimation.NewElementAnimDuration)
                        this.EnterState(BossSkillAnimState.Init);
                    break;
                }
        }
        this.UpdateMoveEffect(deltaTime);
    };
    BossSkillAnimation.prototype.EnterState = function (toState) {
        this.stateRunningTime = 0;
        if (this.state != toState) {
            if (toState == BossSkillAnimState.Init) {
                this.bossSkillInfo.Reset();
            }
            else if (toState == BossSkillAnimState.BossAnim) {
                this.bossSkillInfo.skillCaster.PlayAnim(NpcAnimType.UseSkill);
            }
            else if (toState == BossSkillAnimState.LinkElement) {
                this.CreateMoveEffectList();
            }
            else if (toState == BossSkillAnimState.PreElementAnim) {
                this.OnEnterPreElementAnim();
            }
            else if (toState == BossSkillAnimState.NewElementAnim) {
                this.OnEnterNewElementAnim();
            }
            this.state = toState;
        }
    };
    BossSkillAnimation.prototype.CreateMoveEffectList = function () {
        var fromX = Tools.GetMatchViewRenderPosX(this.bossSkillInfo.skillCaster.posx);
        var fromY = Tools.GetMatchViewRenderPosY(this.bossSkillInfo.skillCaster.posy);
        if (this.bossSkillInfo.addHealthElement != null) {
            for (var i = 0; i < this.bossSkillInfo.addHealthElement.length; ++i) {
                var toX = Tools.GetMatchViewRenderPosX(this.bossSkillInfo.addHealthElement[i].posx);
                var toY = Tools.GetMatchViewRenderPosY(this.bossSkillInfo.addHealthElement[i].posy);
                // this.CreateMoveEffect(fromX, fromY, toX, toY);
                this.AddMovePartical(this.bossSkillInfo.skillCaster.posx, this.bossSkillInfo.skillCaster.posy, this.bossSkillInfo.addHealthElement[i].posx, this.bossSkillInfo.addHealthElement[i].posy);
            }
        }
        if (this.bossSkillInfo.elementChangeColorList != null) {
            for (var i = 0; i < this.bossSkillInfo.elementChangeColorList.length; ++i) {
                var toX = Tools.GetMatchViewRenderPosX(this.bossSkillInfo.elementChangeColorList[i].element.posx);
                var toY = Tools.GetMatchViewRenderPosY(this.bossSkillInfo.elementChangeColorList[i].element.posy);
                // this.CreateMoveEffect(fromX, fromY, toX, toY);
                this.AddMovePartical(this.bossSkillInfo.skillCaster.posx, this.bossSkillInfo.skillCaster.posy, this.bossSkillInfo.elementChangeColorList[i].element.posx, this.bossSkillInfo.elementChangeColorList[i].element.posy);
            }
        }
        if (this.bossSkillInfo.elementTransList != null) {
            for (var i = 0; i < this.bossSkillInfo.elementTransList.length; ++i) {
                var toX = Tools.GetMatchViewRenderPosX(this.bossSkillInfo.elementTransList[i].fromElement.posx);
                var toY = Tools.GetMatchViewRenderPosY(this.bossSkillInfo.elementTransList[i].fromElement.posy);
                // this.CreateMoveEffect(fromX, fromY, toX, toY);
                this.AddMovePartical(this.bossSkillInfo.skillCaster.posx, this.bossSkillInfo.skillCaster.posy, this.bossSkillInfo.elementTransList[i].fromElement.posx, this.bossSkillInfo.elementTransList[i].fromElement.posy);
            }
        }
    };
    BossSkillAnimation.prototype.CreateMoveEffect = function (fromX, fromY, toX, toY) {
        var effect = new SkillMoveEffect();
        effect.Init(fromX, fromY, toX, toY, BossSkillAnimation.LinkElementDuration, this.matchView);
        this.skillMoveEffects.push(effect);
    };
    BossSkillAnimation.prototype.AddMovePartical = function (fromX, fromY, toX, toY) {
        var param = new PaMoveParticalParam;
        param.textureName = "Pill_Single_Blue";
        param.jsonName = "Particle_Boss_Skill_Fly";
        param.duration = 2000;
        param.flyDuration = 1000;
        param.stayDuration = 0;
        param.stratPosX = Tools.ElementPosToGameStagePosX(fromX);
        param.stratPosY = Tools.ElementPosToGameStagePosY(fromY);
        param.endPosX = Tools.ElementPosToGameStagePosX(toX);
        param.endPosY = Tools.ElementPosToGameStagePosY(toY);
        param.isMoveEmitter = true;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    BossSkillAnimation.prototype.UpdateMoveEffect = function (deltaTime) {
        for (var i = 0; i < this.skillMoveEffects.length; ++i) {
            this.skillMoveEffects[i].Update(deltaTime);
            if (this.skillMoveEffects[i].IsFinish()) {
                this.skillMoveEffects[i].Release();
                this.skillMoveEffects.splice(i, 1);
                --i;
            }
        }
    };
    BossSkillAnimation.prototype.OnEnterPreElementAnim = function () {
        if (this.bossSkillInfo.elementTransList != null) {
            for (var i = 0; i < this.bossSkillInfo.elementTransList.length; ++i) {
                this.bossSkillInfo.elementTransList[i].fromElement.renderer.alpha = 0; // 改成播放消除动画
            }
        }
        if (this.bossSkillInfo.addHealthElement != null) {
            for (var i = 0; i < this.bossSkillInfo.addHealthElement.length; ++i) {
                this.bossSkillInfo.addHealthElement[i].PlayShieldCreateAnim(); // 播放生成护盾效果
            }
        }
    };
    BossSkillAnimation.prototype.OnEnterNewElementAnim = function () {
        this.matchView.RefreshTextrue();
    };
    BossSkillAnimation.BossAnimDuration = 300;
    BossSkillAnimation.LinkElementDuration = 1000;
    BossSkillAnimation.PreElementAnimDuration = 200;
    BossSkillAnimation.NewElementAnimDuration = 200;
    return BossSkillAnimation;
}());
__reflect(BossSkillAnimation.prototype, "BossSkillAnimation");
var BossSkillAnimState;
(function (BossSkillAnimState) {
    BossSkillAnimState[BossSkillAnimState["Init"] = 0] = "Init";
    BossSkillAnimState[BossSkillAnimState["BossAnim"] = 1] = "BossAnim";
    BossSkillAnimState[BossSkillAnimState["LinkElement"] = 2] = "LinkElement";
    BossSkillAnimState[BossSkillAnimState["PreElementAnim"] = 3] = "PreElementAnim";
    BossSkillAnimState[BossSkillAnimState["NewElementAnim"] = 4] = "NewElementAnim";
})(BossSkillAnimState || (BossSkillAnimState = {}));
//# sourceMappingURL=BossSkillAnimation.js.map