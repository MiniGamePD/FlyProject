var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//和gameplay相关的对象的封装，可能包含一个或多个SceneElement
var GameplayElementBase = (function () {
    function GameplayElementBase() {
        this.blockWidth = 1;
        this.blockHeight = 1;
        this.sceneElements = [];
        this.sceneElementFilled = false;
        this.hasReduceHpThisRound = false;
        GameMain.GetInstance().AddEventListener(EliminateEvent.EventName, this.OnEliminateTurnFinish, this);
    }
    GameplayElementBase.prototype.GetSceneElements = function () {
        if (!this.sceneElementFilled) {
            this.FillSceneElementArray();
            this.sceneElementFilled = true;
        }
        return this.sceneElements;
    };
    GameplayElementBase.prototype.RandomColor = function () {
        return GameElementColorGenerator.RandomColor();
    };
    GameplayElementBase.prototype.Update = function (deltaTime) { };
    GameplayElementBase.prototype.PlayEliminateAnim = function () { };
    GameplayElementBase.prototype.OnEliminate = function () {
        //一回合只受到一次伤害
        if (this.hasReduceHpThisRound) {
            return false;
        }
        this.hasReduceHpThisRound = true;
        if (this.shield > 0) {
            this.shield--;
            return true;
        }
        if (this.hp > 0) {
            this.hp--;
            if (!this.IsAlive()) {
                GameMain.GetInstance().RemoveEventListener(EliminateEvent.EventName, this.OnEliminateTurnFinish, this);
            }
            return true;
        }
        return false;
    };
    GameplayElementBase.prototype.IsAlive = function () {
        return this.shield > 0 || this.hp > 0;
    };
    GameplayElementBase.prototype.GetRemainHpPercentage = function () {
        return this.hp / this.maxHp;
    };
    GameplayElementBase.prototype.HasShield = function () {
        return this.shield > 0;
    };
    GameplayElementBase.prototype.AddShield = function (shield) {
        this.shield += shield;
    };
    //一次大回合中的一个消除回合（多次连消算多个消除回合）
    GameplayElementBase.prototype.OnEliminateTurnFinish = function (event) {
        if (event.eliminateInfo.EliminateRound > 0)
            this.hasReduceHpThisRound = false;
    };
    GameplayElementBase.prototype.Kill = function () {
        this.hp = 0;
        this.shield = 0;
        GameMain.GetInstance().RemoveEventListener(EliminateEvent.EventName, this.OnEliminateTurnFinish, this);
    };
    return GameplayElementBase;
}());
__reflect(GameplayElementBase.prototype, "GameplayElementBase");
//# sourceMappingURL=GameplayElementBase.js.map