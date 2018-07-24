var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MatchScore = (function () {
    function MatchScore() {
    }
    MatchScore.prototype.Init = function () {
        this.curScore = 0;
        this.isInFeverTime = false;
        this.addScoreEvent = new HUDEvent();
        this.addScoreEvent.eventType = HUDEventType.ChangeScore;
        GameMain.GetInstance().AddEventListener(FeverEvent.EventName, this.OnFeverEvent, this);
    };
    MatchScore.prototype.Release = function () {
        GameMain.GetInstance().RemoveEventListener(FeverEvent.EventName, this.OnFeverEvent, this);
    };
    MatchScore.prototype.OnFeverEvent = function (event) {
        if (event != null) {
            this.isInFeverTime = event.feverBegin;
        }
    };
    // 加分。返回值：增加的分数
    MatchScore.prototype.AddScore = function (element, eliminateRound) {
        var eliminateRoundScale = this.GetEliminateRoundScale(eliminateRound);
        var feverTimeScale = this.GetFeverTimeScale();
        var addScore = Score_BaseScore * eliminateRoundScale * feverTimeScale;
        this.curScore += addScore;
        this.DispatchScoreChangeEvent(this.curScore, addScore);
        return addScore;
    };
    // 根据连消数量，计算倍率
    MatchScore.prototype.GetEliminateRoundScale = function (eliminateRound) {
        var eliminateRoundScale = 1;
        var index = eliminateRound - 1;
        if (index >= 0 && index < Score_EliminateRoundScale.length) {
            eliminateRoundScale = Score_EliminateRoundScale[index];
        }
        else if (index >= Score_EliminateRoundScale.length) {
            eliminateRoundScale = Score_EliminateRoundScale[Score_EliminateRoundScale.length - 1];
        }
        return eliminateRoundScale;
    };
    MatchScore.prototype.GetFeverTimeScale = function () {
        if (this.isInFeverTime) {
            return Score_FeverTimeScale;
        }
        return 1;
    };
    MatchScore.prototype.DispatchScoreChangeEvent = function (targetScore, changeValue) {
        this.addScoreEvent.param = targetScore;
        GameMain.GetInstance().DispatchEvent(this.addScoreEvent);
    };
    return MatchScore;
}());
__reflect(MatchScore.prototype, "MatchScore");
//# sourceMappingURL=MatchScore.js.map