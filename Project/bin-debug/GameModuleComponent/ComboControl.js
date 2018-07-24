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
var ComboControl = (function (_super) {
    __extends(ComboControl, _super);
    function ComboControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComboControl.prototype.Init = function () {
        GameMain.GetInstance().AddEventListener(EliminateEvent.EventName, this.OnEliminateHappen, this);
    };
    ComboControl.prototype.Release = function () {
        GameMain.GetInstance().RemoveEventListener(EliminateEvent.EventName, this.OnEliminateHappen, this);
    };
    ComboControl.prototype.ResetCombo = function () {
        //根据当前的连击数，显示评价
        this.ShowEvaluation();
        this.comboNum = 0;
    };
    ComboControl.prototype.ShowEvaluation = function () {
        var evaluation;
        if (this.comboNum >= 2 && this.comboNum < 3) {
            evaluation = "good";
        }
        else if (this.comboNum >= 3 && this.comboNum < 5) {
            evaluation = "cool";
        }
        else if (this.comboNum >= 5) {
            evaluation = "perfect";
        }
        if (evaluation != undefined) {
            var hudEvent = new HUDEvent();
            hudEvent.eventType = HUDEventType.ShowComboEvaluation;
            hudEvent.param = evaluation;
            GameMain.GetInstance().DispatchEvent(hudEvent);
        }
    };
    ComboControl.prototype.OnEliminateHappen = function (event) {
        this.comboNum = event.eliminateInfo.EliminateRound;
        if (this.comboNum > 1) {
            var hudEvent = new HUDEvent();
            hudEvent.eventType = HUDEventType.ShowCombo;
            hudEvent.param = this.comboNum;
            GameMain.GetInstance().DispatchEvent(hudEvent);
        }
    };
    return ComboControl;
}(GameModuleComponentBase));
__reflect(ComboControl.prototype, "ComboControl");
//# sourceMappingURL=ComboControl.js.map