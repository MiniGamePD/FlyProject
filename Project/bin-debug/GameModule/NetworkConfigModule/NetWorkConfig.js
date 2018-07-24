var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NetWorkConfig = (function () {
    function NetWorkConfig() {
        this.EnableShare = false; // 是否打开分享复活
        this.m_LotteryShareShowTipLimit = 3;
    }
    NetWorkConfig.prototype.SetConfigByJson = function (jsonConfig) {
        this.EnableShare = this.ReadConfigInJson(jsonConfig.EnableShare, false);
        this.m_LotteryShareShowTipLimit = this.ReadConfigInJson(jsonConfig.LotteryShareShowTimeTipLimit, 3);
    };
    NetWorkConfig.prototype.ReadConfigInJson = function (value, defaultValue) {
        if (value != undefined) {
            return value;
        }
        return defaultValue;
    };
    return NetWorkConfig;
}());
__reflect(NetWorkConfig.prototype, "NetWorkConfig");
//# sourceMappingURL=NetWorkConfig.js.map