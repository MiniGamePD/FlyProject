var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BallConfig = (function () {
    function BallConfig() {
        this.id = 0;
        this.textureName = "Ball_White";
        this.level = 0;
        this.maxLevel = 0;
        this.emitSpeed = 1000; //球速
        this.ballMass = 1; //球的质量
        this.ballRadius = 15; //球的半径
        this.displayScale = 1; //球的半径在表现层的缩放
        this.skill_ScaleOnEmitter_Rate = 0; // 技能1：发射放大概率
        this.skill_ScaleOnEmitter_Scale = 0; // 技能1：发射放大倍数
        this.skill_ScaleOnHit_Rate = 0; // 技能2：碰撞放大概率
        this.skill_ScaleOnHit_Scale = 0; // 技能2：碰撞放大倍数
        this.skill_ScaleOnHit_BallRadius = 0; // 技能2：碰撞放大最大半径
        this.skill_SplitBallOnHit_Rate = 0; // 技能3：碰撞分裂概率
        this.skill_SplitBallOnHit_Count = 0; // 技能3：碰撞分裂数量
        this.skill_SplitBallOnHit_Angle = 0; // 技能3：碰撞分裂角度
        this.skill_CreateBallOnBoxEliminate_Rate = 0; // 技能4：盒子消除分裂球概率
        this.skill_CreateBallOnBoxEliminate_Count = 0; // 技能4：盒子消除分裂球数量
        this.skill_PauseBoxOnHit_Rate = 0; // 技能5：打击盒子定身的概率
        this.skill_PauseBoxOnHit_Time = 0; // 技能5：打击盒子定身的时长
        this.skill_BoomOnHit_Rate = 0; // 技能6：打击盒子爆炸的概率
        this.skill_BoomOnHit_Range = 0; // 技能6：打击盒子爆炸的范围
        this.skill_BoomOnHit_Damage = 0; // 技能6：打击盒子爆炸的伤害
        this.skill_CriticalStrike_Rate = 0; // 技能7：暴击的概率
        this.skill_CriticalStrike_Damage = 0; // 技能7：暴击的伤害
        this.Box_Effect_Pause_Time = Box_Effect_Pause_Time_Default; // 定时道具的持续时间
        this.Box_Effect_MultipleDirections_Time = Box_Effect_MultipleDirections_Time_Default; // 变身道具的持续时间
        this.Box_Effect_FireUp_Time = Box_Effect_FireUp_Time_Default; // 全力开火的持续时间
        this.Box_Effect_Gold_Coin = Box_Effect_Gold_Coin_Default; // 金币增加数量
        this.price = 0; // 购买价格
    }
    BallConfig.prototype.InitByConfig = function (config, level) {
        this.id = config.id;
        this.name = config.name;
        this.textureName = config.textureName;
        this.level = level;
        this.maxLevel = config.maxLevel;
        this.emitSpeed = this.GetConfigInList(config.emitSpeed, level, 1000);
        this.ballMass = this.GetConfigInList(config.ballMass, level, 1);
        this.ballRadius = this.GetConfigInList(config.ballRadius, level, 15);
        this.displayScale = config.displayScale != undefined ? config.displayScale : 1;
        this.skill_ScaleOnEmitter_Rate = this.GetConfigInList(config.skill_ScaleOnEmitter_Rate, level, 0);
        this.skill_ScaleOnEmitter_Scale = this.GetConfigInList(config.skill_ScaleOnEmitter_Scale, level, 0);
        this.skill_ScaleOnHit_Rate = this.GetConfigInList(config.skill_ScaleOnHit_Rate, level, 0);
        this.skill_ScaleOnHit_Scale = this.GetConfigInList(config.skill_ScaleOnHit_Scale, level, 0);
        this.skill_ScaleOnHit_BallRadius = this.GetConfigInList(config.skill_ScaleOnHit_BallRadius, level, 0);
        this.skill_SplitBallOnHit_Rate = this.GetConfigInList(config.skill_SplitBallOnHit_Rate, level, 0);
        this.skill_SplitBallOnHit_Count = this.GetConfigInList(config.skill_SplitBallOnHit_Count, level, 0);
        this.skill_SplitBallOnHit_Angle = this.GetConfigInList(config.skill_SplitBallOnHit_Angle, level, 0);
        this.skill_CreateBallOnBoxEliminate_Rate = this.GetConfigInList(config.skill_CreateBallOnBoxEliminate_Rate, level, 0);
        this.skill_CreateBallOnBoxEliminate_Count = this.GetConfigInList(config.skill_CreateBallOnBoxEliminate_Count, level, 0);
        this.skill_PauseBoxOnHit_Rate = this.GetConfigInList(config.skill_PauseBoxOnHit_Rate, level, 0);
        this.skill_PauseBoxOnHit_Time = this.GetConfigInList(config.skill_PauseBoxOnHit_Time, level, 0);
        this.skill_BoomOnHit_Rate = this.GetConfigInList(config.skill_BoomOnHit_Rate, level, 0);
        this.skill_BoomOnHit_Range = this.GetConfigInList(config.skill_BoomOnHit_Range, level, 0);
        this.skill_BoomOnHit_Damage = this.GetConfigInList(config.skill_BoomOnHit_Damage, level, 0);
        this.skill_CriticalStrike_Rate = this.GetConfigInList(config.skill_CriticalStrike_Rate, level, 0);
        this.skill_CriticalStrike_Damage = this.GetConfigInList(config.skill_CriticalStrike_Damage, level, 0);
        this.Box_Effect_Pause_Time = this.GetConfigInList(config.Box_Effect_Pause_Time, level, Box_Effect_Pause_Time_Default);
        this.Box_Effect_MultipleDirections_Time = this.GetConfigInList(config.Box_Effect_MultipleDirections_Time, level, Box_Effect_MultipleDirections_Time_Default);
        this.Box_Effect_FireUp_Time = this.GetConfigInList(config.Box_Effect_FireUp_Time, level, Box_Effect_FireUp_Time_Default);
        this.Box_Effect_Gold_Coin = this.GetConfigInList(config.Box_Effect_Gold_Coin, level, Box_Effect_Gold_Coin_Default);
        this.skillDes = config.skillDes;
        this.skillHead = config.skillHead;
        this.skillLevellDes = this.GetConfigInList(config.skillLevellDes, level, "无");
        this.Describe = this.GetConfigInList(config.Describe, level, "默认");
        this.price = this.GetConfigInList(config.price, level, 9999);
    };
    BallConfig.prototype.GetConfigInList = function (list, level, defaultValue) {
        return Tools.GetConfigInList(list, level, defaultValue);
    };
    return BallConfig;
}());
__reflect(BallConfig.prototype, "BallConfig");
//# sourceMappingURL=BallConfig.js.map