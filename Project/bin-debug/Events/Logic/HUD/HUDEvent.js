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
var HUDEvent = (function (_super) {
    __extends(HUDEvent, _super);
    function HUDEvent(bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, HUDEvent.EventName, bubbles, cancelable) || this;
    }
    HUDEvent.EventName = "HUDEvent";
    return HUDEvent;
}(egret.Event));
__reflect(HUDEvent.prototype, "HUDEvent");
var HUDEventType;
(function (HUDEventType) {
    HUDEventType[HUDEventType["ShowReadyGo"] = 0] = "ShowReadyGo";
    HUDEventType[HUDEventType["ChangeScore"] = 1] = "ChangeScore";
    HUDEventType[HUDEventType["ChangeStep"] = 2] = "ChangeStep";
    HUDEventType[HUDEventType["RefreshControlablePreview"] = 3] = "RefreshControlablePreview";
    HUDEventType[HUDEventType["PlayPreviewDropDownAnim"] = 4] = "PlayPreviewDropDownAnim";
    HUDEventType[HUDEventType["SetFeverControl"] = 5] = "SetFeverControl";
    HUDEventType[HUDEventType["ShowFeverSprite"] = 6] = "ShowFeverSprite";
    HUDEventType[HUDEventType["ShowCombo"] = 7] = "ShowCombo";
    HUDEventType[HUDEventType["ShowComboEvaluation"] = 8] = "ShowComboEvaluation";
    HUDEventType[HUDEventType["ShowPauseMenu"] = 9] = "ShowPauseMenu";
    HUDEventType[HUDEventType["HidePauseMenu"] = 10] = "HidePauseMenu";
    HUDEventType[HUDEventType["ShowHelpDetail"] = 11] = "ShowHelpDetail";
    HUDEventType[HUDEventType["HideHelpDetail"] = 12] = "HideHelpDetail";
})(HUDEventType || (HUDEventType = {}));
//# sourceMappingURL=HUDEvent.js.map