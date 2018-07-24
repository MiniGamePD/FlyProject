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
var ReadyGoItem = (function (_super) {
    __extends(ReadyGoItem, _super);
    function ReadyGoItem(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        var res = GameMain.GetInstance().GetModule(ModuleType.RES);
        _this.ready = res.CreateBitmapByName("pd_res_json.ready");
        _this.go = res.CreateBitmapByName("pd_res_json.go");
        _this.ready.anchorOffsetX = _this.ready.width / 2;
        _this.ready.anchorOffsetY = _this.ready.height / 2;
        _this.go.anchorOffsetX = _this.go.width / 2;
        _this.go.anchorOffsetY = _this.go.height / 2;
        _this.ready.x = _this.go.x = GameMain.GetInstance().GetStageWidth() / 2;
        _this.ready.y = _this.go.y = 400;
        GameMain.GetInstance().AdapteDisplayObject(_this.ready);
        GameMain.GetInstance().AdapteDisplayObject(_this.go);
        return _this;
    }
    ReadyGoItem.prototype.Play = function () {
        this.removeChildren();
        this.addChild(this.ready);
        this.timer = new egret.Timer(1000, 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.OnReadyDone, this);
        this.timer.start();
        var soundEvent = new PlaySoundEvent("Ready_mp3", 1);
        GameMain.GetInstance().DispatchEvent(soundEvent);
    };
    ReadyGoItem.prototype.OnReadyDone = function (event) {
        this.removeChildren();
        this.addChild(this.go);
        var soundEvent = new PlaySoundEvent("Go_mp3", 1);
        GameMain.GetInstance().DispatchEvent(soundEvent);
        this.timer = new egret.Timer(500, 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.OnGoDone, this);
        this.timer.start();
    };
    ReadyGoItem.prototype.OnGoDone = function (event) {
        this.removeChildren();
        this.timer = null;
    };
    return ReadyGoItem;
}(egret.DisplayObjectContainer));
__reflect(ReadyGoItem.prototype, "ReadyGoItem");
//# sourceMappingURL=ReadyGoItem.js.map