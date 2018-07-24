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
var ModuleBase = (function (_super) {
    __extends(ModuleBase, _super);
    function ModuleBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isForeground = false;
        return _this;
    }
    ModuleBase.prototype.Init = function () { return true; };
    ModuleBase.prototype.Update = function (deltaTime) { };
    ModuleBase.prototype.Release = function () { };
    ModuleBase.prototype.SwitchToForeground = function (from, to) { };
    ModuleBase.prototype.SwitchToBackground = function (from, to) { };
    ModuleBase.prototype.IsForeground = function () { return this.isForeground; };
    return ModuleBase;
}(egret.EventDispatcher));
__reflect(ModuleBase.prototype, "ModuleBase");
//# sourceMappingURL=ModuleBase.js.map