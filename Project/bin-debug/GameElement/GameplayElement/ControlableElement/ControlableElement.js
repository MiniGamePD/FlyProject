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
var ControlableElement = (function (_super) {
    __extends(ControlableElement, _super);
    function ControlableElement() {
        var _this = _super.call(this) || this;
        _this.hp = _this.maxHp = 1;
        return _this;
    }
    ControlableElement.prototype.GetPreviewSize = function () { return 1; };
    return ControlableElement;
}(GameplayElementBase));
__reflect(ControlableElement.prototype, "ControlableElement");
//# sourceMappingURL=ControlableElement.js.map