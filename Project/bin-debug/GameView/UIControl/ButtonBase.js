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
var ButtonBase = (function (_super) {
    __extends(ButtonBase, _super);
    function ButtonBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonBase.prototype.OnButtonClick = function () {
    };
    ButtonBase.prototype.OnButtonHover = function () {
    };
    return ButtonBase;
}(egret.DisplayObjectContainer));
__reflect(ButtonBase.prototype, "ButtonBase");
var ButtonParam = (function () {
    function ButtonParam(bgType, fgType, bgParam, fgParam, bgWidth, bgHeight, fgWidth, fgHeight) {
        this.bgType = bgType;
        this.fgType = fgType;
        this.bgParam = bgParam;
        this.fgParam = fgParam;
        this.bgWidth = bgWidth;
        this.bgHeight = bgHeight;
        this.fgWidth = fgWidth;
        this.fgHeight = fgHeight;
    }
    return ButtonParam;
}());
__reflect(ButtonParam.prototype, "ButtonParam");
//# sourceMappingURL=ButtonBase.js.map