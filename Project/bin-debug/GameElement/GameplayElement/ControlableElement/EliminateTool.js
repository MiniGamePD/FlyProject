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
//消除道具类元素的积累（维生素-炸弹、十字消）
var EliminateTool = (function (_super) {
    __extends(EliminateTool, _super);
    function EliminateTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EliminateTool;
}(ControlableElement));
__reflect(EliminateTool.prototype, "EliminateTool");
var EliminateType;
(function (EliminateType) {
    EliminateType[EliminateType["Range"] = 0] = "Range";
    EliminateType[EliminateType["Row"] = 1] = "Row";
    EliminateType[EliminateType["Cloumn"] = 2] = "Cloumn";
    EliminateType[EliminateType["Cross"] = 3] = "Cross";
})(EliminateType || (EliminateType = {}));
//# sourceMappingURL=EliminateTool.js.map