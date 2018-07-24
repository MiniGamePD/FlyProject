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
var NetworkConfigModule = (function (_super) {
    __extends(NetworkConfigModule, _super);
    function NetworkConfigModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasLoadNetWorkConfig = false;
        return _this;
    }
    NetworkConfigModule.prototype.Init = function () {
        _super.prototype.Init.call(this);
        this.netWorkConfig = new NetWorkConfig();
        this.hasLoadNetWorkConfig = false;
        this.LoadUrlData();
        return true;
    };
    NetworkConfigModule.prototype.SwitchForeOrBack = function (from, to) {
        this.isForeground = true;
    };
    NetworkConfigModule.prototype.LoadUrlData = function () {
        var httpRequest = new egret.HttpRequest;
        httpRequest.responseType = egret.HttpResponseType.TEXT;
        httpRequest.open(NetworkConfigModule.m_SLoadUrl, egret.HttpMethod.GET);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send();
        httpRequest.addEventListener(egret.Event.COMPLETE, this.OnLoadUrlDataSucceed, this);
    };
    NetworkConfigModule.prototype.HasLoadNetWorkConfig = function () {
        return this.hasLoadNetWorkConfig;
    };
    NetworkConfigModule.prototype.GetNetWorkConfig = function () {
        return this.netWorkConfig;
    };
    NetworkConfigModule.prototype.OnLoadUrlDataSucceed = function (event) {
        var request = event.currentTarget;
        console.log("get data:", request.response);
        var Config = JSON.parse(request.response);
        this.netWorkConfig.SetConfigByJson(Config);
        this.hasLoadNetWorkConfig = true;
        return;
    };
    NetworkConfigModule.prototype.OnLoadUrlDataFail = function (event) {
        console.log("get error for reason :" + event);
    };
    NetworkConfigModule.m_SLoadUrl = "https://littlegame-1257022815.cos.ap-shanghai.myqcloud.com/WebConfig.json"; //拉取 配置默认url
    return NetworkConfigModule;
}(ModuleBase));
__reflect(NetworkConfigModule.prototype, "NetworkConfigModule", ["INetworkConfigModule", "IModule"]);
//# sourceMappingURL=NetworkConfigModule.js.map