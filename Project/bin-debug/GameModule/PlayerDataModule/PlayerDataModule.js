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
var PlayerDataModule = (function (_super) {
    __extends(PlayerDataModule, _super);
    function PlayerDataModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curMatchScore = 0; //当前比赛分数
        _this.saveDataVersion = 3; //常量值，请勿修改
        return _this;
    }
    //private static m_stTodayLotteryShareCntLimit 
    PlayerDataModule.prototype.OnLoginDone = function () {
        if (CTimeHelper.IsNewDay(this.m_tLastLoginTime)) {
            this.OnResetToday();
        }
        this.m_tLastLoginTime = CTimeHelper.Now();
        this.Save();
        return;
    };
    PlayerDataModule.prototype.GetTodayLeftLotteryShowTipCnt = function () {
        var networkConfigModule = GameMain.GetInstance().GetModule(ModuleType.NETWORK_CONFIG);
        var networkConfig = networkConfigModule.GetNetWorkConfig();
        var Static_Limit = networkConfig.m_LotteryShareShowTipLimit;
        if (Static_Limit > this.m_tTodayLotteryShareCnt) {
            return Static_Limit - this.m_tTodayLotteryShareCnt;
        }
        return 0;
    };
    PlayerDataModule.prototype.IncreaseLotteryShowTipCnt = function () {
        this.m_tTodayLotteryShareCnt++;
        this.Save();
        return;
    };
    PlayerDataModule.prototype.CanShowLotteryTips = function () {
        var networkConfigModule = GameMain.GetInstance().GetModule(ModuleType.NETWORK_CONFIG);
        var networkConfig = networkConfigModule.GetNetWorkConfig();
        var Static_Limit = networkConfig.m_LotteryShareShowTipLimit;
        return networkConfig.EnableShare && this.m_tTodayLotteryShareCnt < Static_Limit;
    };
    PlayerDataModule.prototype.OnResetToday = function () {
        this.m_tTodayLotteryShareCnt = 0;
        return;
    };
    PlayerDataModule.prototype.Init = function () {
        _super.prototype.Init.call(this);
        this.breakRecordHistoryHighScore = false;
        return true;
    };
    PlayerDataModule.prototype.GetMyBall = function () {
        // this.myBallList = "5-3|1-1|2-1|3-2"
        return this.myBallList;
    };
    PlayerDataModule.prototype.SaveMyBall = function (ballListString) {
        this.myBallList = ballListString;
        this.Save();
    };
    PlayerDataModule.prototype.GetExpedBallList = function () {
        return this.expedBallList;
    };
    PlayerDataModule.prototype.SetExpedBallList = function (list) {
        this.expedBallList = list;
    };
    PlayerDataModule.prototype.GetBattleTimes = function () {
        return this.battleTimes;
    };
    PlayerDataModule.prototype.SetBattleTimes = function (times) {
        this.battleTimes = times;
        if (true)
            console.log("Set Battle Times:" + this.battleTimes);
    };
    PlayerDataModule.prototype.SetHistoryHighScore = function (score) {
        if (this.historyHighScore < score) {
            this.historyHighScore = score;
            this.breakRecordHistoryHighScore = true;
        }
    };
    PlayerDataModule.prototype.GetHistoryHighScore = function () {
        return this.historyHighScore;
    };
    PlayerDataModule.prototype.UploadHistoryHighScore = function () {
        if (this.breakRecordHistoryHighScore) {
            this.breakRecordHistoryHighScore = false;
            if (platform.canUseCloudStorage())
                platform.setUserCloudStorage("HighScore", this.historyHighScore.toString());
        }
    };
    PlayerDataModule.prototype.AddCoin = function (coin) {
        if (coin > 300) {
            if (true)
                console.log("一次性添加" + coin + "金币，作弊了吗？限制在最大金币范围内");
            coin = 300;
        }
        this.coin += coin;
        this.coinCurGame += coin;
    };
    PlayerDataModule.prototype.CostCoin = function (coin) {
        if (this.coin >= coin) {
            this.coin -= coin;
            if (true)
                console.log("消耗了" + coin + "金币");
            return true;
        }
        return false;
    };
    PlayerDataModule.prototype.GetCoin = function () {
        return this.coin;
    };
    PlayerDataModule.prototype.GetCoinCurGame = function () {
        return this.coinCurGame;
    };
    PlayerDataModule.prototype.SetCurMatchScore = function (score) {
        this.curMatchScore = score;
    };
    PlayerDataModule.prototype.GetCurMatchScore = function () {
        return this.curMatchScore;
    };
    PlayerDataModule.prototype.SetControlType = function (type) {
        this.controlType = type;
    };
    PlayerDataModule.prototype.GetControlType = function () {
        return this.controlType;
    };
    PlayerDataModule.prototype.SwitchForeOrBack = function (from, to) {
        this.isForeground = true;
    };
    PlayerDataModule.prototype.InitUserData = function () {
        if (GameMain.GetInstance().HasUserData()) {
            //有就加载
            this.Load();
            //做个搂底，防止saveData损坏
            if (this.coin == undefined)
                this.coin = 0;
            if (this.historyHighScore == undefined)
                this.historyHighScore = 0;
            if (this.myBallList == undefined)
                this.myBallList = "1-1";
            if (this.expedBallList == undefined)
                this.expedBallList = "";
            if (this.controlType == undefined)
                this.controlType = BallControllerType.TouchPoint;
            if (this.battleTimes == undefined)
                this.battleTimes = 0;
            if (this.m_tLastLoginTime == undefined) {
                this.m_tLastLoginTime = 0;
            }
            if (this.m_tTodayLotteryShareCnt == undefined) {
                this.m_tTodayLotteryShareCnt = 0;
            }
        }
        else {
            //蛋总，这里是创建新的saveData的地方，新增的数据，一定要在这里初始化
            //没有就新建一个
            this.coin = 0;
            this.historyHighScore = 0;
            this.myBallList = "1-1";
            this.expedBallList = "";
            this.controlType = BallControllerType.TouchPoint;
            this.battleTimes = 0;
            this.m_tLastLoginTime = 0;
            this.m_tTodayLotteryShareCnt = 0;
            this.Save();
        }
    };
    PlayerDataModule.prototype.Save = function () {
        var jsonData = {
            version: this.saveDataVersion,
            historyHighScore: this.historyHighScore,
            coin: this.coin,
            myBallList: this.myBallList,
            controlType: this.controlType,
            expedBallList: this.expedBallList,
            battleTimes: this.battleTimes,
            LastLoginTime: this.m_tLastLoginTime,
            TodayLotteryShareCnt: this.m_tTodayLotteryShareCnt
        };
        var jsonDataStr = JSON.stringify(jsonData);
        GameMain.GetInstance().SaveUserData(jsonDataStr);
    };
    PlayerDataModule.prototype.Load = function () {
        var userData = GameMain.GetInstance().LoadUserData();
        if (userData != null && userData != undefined) {
            try {
                //蛋总，如果新增需要保存的内容，一定要注意兼容老版本的saveData
                var jsonObj = JSON.parse(userData);
                if (jsonObj.version == 1) {
                    //注意：如果新增了saveData的内容，需要在这里添加兼容
                    this.historyHighScore = jsonObj.historyHighScore;
                    this.coin = jsonObj.coin;
                    this.myBallList = jsonObj.myBallList;
                    this.expedBallList = "";
                    this.battleTimes = 0;
                    this.controlType = BallControllerType.TouchPoint;
                    this.m_tLastLoginTime = 0; //jsonObj.LastLoginTime;
                    this.m_tTodayLotteryShareCnt = 0; //jsonObj.TodayLotteryShareCnt;
                    this.Save();
                }
                else if (jsonObj.version == 2) {
                    //注意：如果新增了saveData的内容，需要在这里添加兼容
                    this.historyHighScore = jsonObj.historyHighScore;
                    this.coin = jsonObj.coin;
                    this.myBallList = jsonObj.myBallList;
                    this.controlType = jsonObj.controlType;
                    this.expedBallList = jsonObj.expedBallList;
                    this.battleTimes = jsonObj.battleTimes;
                    this.m_tLastLoginTime = 0; //jsonObj.LastLoginTime;
                    this.m_tTodayLotteryShareCnt = 0; //jsonObj.TodayLotteryShareCnt;
                    this.Save();
                }
                else if (jsonObj.version == 3) {
                    this.historyHighScore = jsonObj.historyHighScore;
                    this.coin = jsonObj.coin;
                    this.myBallList = jsonObj.myBallList;
                    this.controlType = jsonObj.controlType;
                    this.expedBallList = jsonObj.expedBallList;
                    this.battleTimes = jsonObj.battleTimes;
                    this.m_tLastLoginTime = jsonObj.LastLoginTime; //jsonObj.LastLoginTime;
                    this.m_tTodayLotteryShareCnt = jsonObj.TodayLotteryShareCnt; //
                    this.Save();
                }
            }
            catch (e) {
                //这里是兼容最老版本的saveData
                if (true)
                    console.log(e);
                var temp = userData.split(',');
                this.historyHighScore = Number(temp[0]);
                this.coin = Number(temp[1]);
                this.myBallList = "1-1";
                this.expedBallList = "";
                this.controlType = BallControllerType.TouchPoint;
                this.battleTimes = 0;
                this.m_tLastLoginTime = 0;
                this.m_tTodayLotteryShareCnt = 0;
                this.Save(); //存成新版本的数据格式
            }
        }
        else {
            //这里是没有saveData的时候，初始化数据的地方
            //蛋总，这里要注意初始化玩家的数据
            this.historyHighScore = 0;
            this.coin = 0;
            this.myBallList = "1-1";
            this.expedBallList = "";
            this.battleTimes = 0;
            this.controlType = BallControllerType.TouchPoint;
            this.m_tLastLoginTime = 0;
            this.m_tTodayLotteryShareCnt = 0;
        }
        this.OnLoginDone();
    };
    PlayerDataModule.prototype.OnMatchBegin = function () {
        this.coinCurGame = 0;
    };
    return PlayerDataModule;
}(ModuleBase));
__reflect(PlayerDataModule.prototype, "PlayerDataModule", ["IPlayerDataModule", "IModule"]);
//# sourceMappingURL=PlayerDataModule.js.map