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
var ComboItem = (function (_super) {
    __extends(ComboItem, _super);
    function ComboItem() {
        var _this = _super.call(this) || this;
        _this.res = GameMain.GetInstance().GetModule(ModuleType.RES);
        _this.comboSprite = _this.res.CreateBitmapByName("pd_res_json.lianxiao");
        _this.comboSprite.anchorOffsetX = _this.comboSprite.width / 2;
        _this.comboSprite.anchorOffsetY = _this.comboSprite.height / 2;
        _this.comboSprite.x = GameMain.GetInstance().GetStageWidth() / 2 - 50;
        _this.comboSprite.y = 250;
        GameMain.GetInstance().AdapteDisplayObject(_this.comboSprite);
        return _this;
    }
    ComboItem.prototype.Init = function () {
    };
    ComboItem.prototype.Release = function () {
    };
    ComboItem.prototype.ShowCombo = function (comboNum) {
        if (comboNum > 99) {
            comboNum = 99;
        }
        var tenPlace = comboNum / 10;
        var onePlace = comboNum % 10;
        this.comboNumTenPlace = this.res.CreateBitmapByName("pd_res_json.lianxiao" + tenPlace);
        this.comboNumTenPlace.anchorOffsetX = this.comboNumTenPlace.width / 2;
        this.comboNumTenPlace.anchorOffsetY = this.comboNumTenPlace.height / 2;
        this.comboNumTenPlace.x = GameMain.GetInstance().GetStageWidth() / 2 + 75;
        this.comboNumTenPlace.y = 250;
        GameMain.GetInstance().AdapteDisplayObject(this.comboNumTenPlace);
        this.comboNumOnePlace = this.res.CreateBitmapByName("pd_res_json.lianxiao" + onePlace);
        this.comboNumOnePlace.anchorOffsetX = this.comboNumOnePlace.width / 2;
        this.comboNumOnePlace.anchorOffsetY = this.comboNumOnePlace.height / 2;
        this.comboNumOnePlace.x = this.comboNumTenPlace.x + this.comboNumTenPlace.width;
        this.comboNumOnePlace.y = 250;
        GameMain.GetInstance().AdapteDisplayObject(this.comboNumTenPlace);
        this.addChild(this.comboSprite);
        this.addChild(this.comboNumTenPlace);
        this.addChild(this.comboNumOnePlace);
        if (this.comboTimer != null) {
            this.comboTimer.stop();
        }
        this.comboTimer = new egret.Timer(1000, 1);
        this.comboTimer.addEventListener(egret.TimerEvent.TIMER, this.HideCombo, this);
        this.comboTimer.start();
    };
    ComboItem.prototype.HideCombo = function () {
        this.removeChild(this.comboSprite);
        this.removeChild(this.comboNumTenPlace);
        this.removeChild(this.comboNumOnePlace);
        this.comboTimer = null;
    };
    ComboItem.prototype.ShowEvaluation = function (evaluation) {
        this.comboEvaluation = this.res.CreateBitmapByName("pd_res_json." + evaluation);
        this.comboEvaluation.anchorOffsetX = this.comboEvaluation.width / 2;
        this.comboEvaluation.anchorOffsetY = this.comboEvaluation.height / 2;
        this.comboEvaluation.x = GameMain.GetInstance().GetStageWidth() / 2;
        this.comboEvaluation.y = 400;
        GameMain.GetInstance().AdapteDisplayObject(this.comboEvaluation);
        this.addChild(this.comboEvaluation);
        this.evaluationTimer = new egret.Timer(1000, 1);
        this.evaluationTimer.addEventListener(egret.TimerEvent.TIMER, this.HideEvaluation, this);
        this.evaluationTimer.start();
    };
    ComboItem.prototype.HideEvaluation = function () {
        this.removeChild(this.comboEvaluation);
        this.evaluationTimer = null;
    };
    return ComboItem;
}(egret.DisplayObjectContainer));
__reflect(ComboItem.prototype, "ComboItem");
//# sourceMappingURL=ComboItem.js.map