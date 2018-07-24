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
var MatchScoreItem = (function (_super) {
    __extends(MatchScoreItem, _super);
    function MatchScoreItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lerpTime = 500;
        _this.deltaScore = 0;
        _this.minDeltaScorePreSecond = 30;
        _this.deltaHistoryHighScore = 0;
        _this.minDeltaHistoryHighScorePreSecond = 30;
        return _this;
    }
    MatchScoreItem.prototype.Init = function () {
        this.curShowScore = 0;
        this.targetScore = 0;
        this.playerData = GameMain.GetInstance().GetModule(ModuleType.PLAYER_DATA);
        this.playerData.SetCurMatchScore(this.targetScore);
        //得分数字
        this.scoreText = new egret.TextField();
        this.scoreText.x = 320 * GameMain.GetInstance().GetStageWidth() / Screen_StanderScreenWidth;
        this.scoreText.y = 142;
        this.scoreText.width = 200;
        this.scoreText.height = 100;
        this.scoreText.size = 30;
        this.scoreText.text = "得分：0";
        this.scoreText.textAlign = "center";
        this.scoreText.anchorOffsetX = this.scoreText.width / 2;
        this.scoreText.anchorOffsetY = this.scoreText.height / 2;
        this.addChild(this.scoreText);
        //历史最高分数字
        this.historyHighScoreText = new egret.TextField();
        this.historyHighScoreText.x = 320 * GameMain.GetInstance().GetStageWidth() / Screen_StanderScreenWidth;
        this.historyHighScoreText.y = 107;
        this.historyHighScoreText.width = 200;
        this.historyHighScoreText.height = 100;
        this.historyHighScoreText.size = 30;
        this.historyHighScoreText.text = "纪录：0";
        this.historyHighScoreText.textAlign = "center";
        this.historyHighScoreText.anchorOffsetX = this.historyHighScoreText.width / 2;
        this.historyHighScoreText.anchorOffsetY = this.historyHighScoreText.height / 2;
        this.addChild(this.historyHighScoreText);
        //本局获得的分数
        this.earnCoin = new egret.TextField();
        this.earnCoin.x = 590 * GameMain.GetInstance().GetStageWidth() / Screen_StanderScreenWidth;
        this.earnCoin.y = 142;
        this.earnCoin.width = 200;
        this.earnCoin.height = 100;
        this.earnCoin.size = 30;
        this.earnCoin.text = "金币：0";
        this.earnCoin.textAlign = "right";
        this.earnCoin.anchorOffsetX = this.earnCoin.width;
        this.earnCoin.anchorOffsetY = this.earnCoin.height / 2;
        this.addChild(this.earnCoin);
        this.Reset();
        GameMain.GetInstance().AddEventListener(BoxEliminateEvent.EventName, this.OnBoxEliminateEvent, this);
    };
    MatchScoreItem.prototype.Update = function (deltaTime) {
        if (this.curShowScore < this.targetScore) {
            this.curShowScore += (deltaTime / 1000) * this.deltaScore;
            if (this.curShowScore > this.targetScore) {
                this.curShowScore = this.targetScore;
            }
            this.scoreText.text = "得分：" + Math.floor(this.curShowScore).toString();
        }
        if (this.curShowHistoryHighScore < this.targetHistoryHighScore) {
            this.curShowHistoryHighScore += (deltaTime / 1000) * this.deltaHistoryHighScore;
            if (this.curShowHistoryHighScore > this.targetHistoryHighScore) {
                this.curShowHistoryHighScore = this.targetHistoryHighScore;
            }
            this.historyHighScoreText.text = "纪录：" + Math.floor(this.curShowHistoryHighScore).toString();
        }
    };
    MatchScoreItem.prototype.SetScore = function (score) {
        this.targetScore = score;
        this.playerData.SetCurMatchScore(this.targetScore);
        if (this.targetScore > this.playerData.GetHistoryHighScore()) {
            this.playerData.SetHistoryHighScore(this.targetScore);
            this.SetHistoryHighScore(this.targetScore);
        }
        this.deltaScore = (this.targetScore - this.curShowScore) / (this.lerpTime / 1000);
        if (this.deltaScore < this.minDeltaScorePreSecond) {
            this.deltaScore = this.minDeltaScorePreSecond;
        }
    };
    MatchScoreItem.prototype.SetHistoryHighScore = function (score) {
        this.targetHistoryHighScore = score;
        this.deltaHistoryHighScore = (this.targetHistoryHighScore - this.curShowHistoryHighScore) / (this.lerpTime / 1000);
        if (this.deltaHistoryHighScore < this.minDeltaHistoryHighScorePreSecond) {
            this.deltaHistoryHighScore = this.minDeltaHistoryHighScorePreSecond;
        }
    };
    MatchScoreItem.prototype.Reset = function () {
        this.curShowScore = 0;
        this.SetScore(0);
        this.curShowHistoryHighScore = this.playerData.GetHistoryHighScore() - 1;
        this.SetHistoryHighScore(this.playerData.GetHistoryHighScore());
    };
    MatchScoreItem.prototype.AddScore = function (score) {
        var newScore = this.targetScore + score;
        this.SetScore(newScore);
    };
    MatchScoreItem.prototype.RefreshCoin = function () {
        var playerData = GameMain.GetInstance().GetModule(ModuleType.PLAYER_DATA);
        this.earnCoin.text = "金币：" + playerData.GetCoinCurGame();
    };
    MatchScoreItem.prototype.OnBoxEliminateEvent = function (evt) {
        // if (evt != null)
        // {
        // 	this.AddScore(ScorePerBox);
        // }
    };
    MatchScoreItem.prototype.Release = function () {
        GameMain.GetInstance().RemoveEventListener(BoxEliminateEvent.EventName, this.OnBoxEliminateEvent, this);
    };
    return MatchScoreItem;
}(egret.DisplayObjectContainer));
__reflect(MatchScoreItem.prototype, "MatchScoreItem");
//# sourceMappingURL=MatchScoreItem.js.map