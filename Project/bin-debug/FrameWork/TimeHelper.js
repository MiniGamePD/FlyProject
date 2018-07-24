var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CTimeHelper = (function () {
    function CTimeHelper() {
    }
    CTimeHelper.Now = function () {
        return Math.floor(new Date().getTime() / 1000);
    };
    CTimeHelper.IsNewDay = function (timestamp) {
        return this.BeginTimeOfToday() > timestamp;
    };
    CTimeHelper.BeginTimeOfToday = function () {
        var NowDate = new Date();
        console.log("Now date: " + NowDate);
        NowDate.setMinutes(0);
        NowDate.setHours(0);
        NowDate.setSeconds(0);
        console.log("Now date: " + NowDate);
        return Math.floor(NowDate.getTime() / 1000);
        //return 10000000000000;
    };
    return CTimeHelper;
}());
__reflect(CTimeHelper.prototype, "CTimeHelper");
;
//# sourceMappingURL=TimeHelper.js.map