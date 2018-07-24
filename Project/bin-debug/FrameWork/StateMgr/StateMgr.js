var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StateMgr = (function () {
    function StateMgr() {
    }
    StateMgr.prototype.Init = function () {
        this.mCurState = GameStateType.None;
    };
    StateMgr.prototype.Update = function (deltaTime) {
    };
    StateMgr.prototype.Release = function () {
    };
    StateMgr.prototype.SwitchGameState = function (toState) {
        if (this.mCurState != toState) {
            this.mCurState = toState;
            return true;
        }
        return false;
    };
    StateMgr.prototype.CurGameState = function () {
        return this.mCurState;
    };
    return StateMgr;
}());
__reflect(StateMgr.prototype, "StateMgr", ["IStateMgr"]);
//# sourceMappingURL=StateMgr.js.map