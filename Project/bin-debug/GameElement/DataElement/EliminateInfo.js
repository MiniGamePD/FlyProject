var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EliminateInfo = (function () {
    function EliminateInfo() {
        this.HasInfo = false;
        this.methodType = EliminateMethodType.Normal;
        this.isInFeverTime = false;
        this.EliminateRound = 1;
        this.CalculatedEliminateElement = [];
        this.EliminatedElements = [];
        this.ShieldBreakElements = [];
        this.MoveElements = [];
        this.SpecialEliminatedElement = [];
        this.EliminatedSuperVirus = [];
    }
    // 重置
    EliminateInfo.prototype.Reset = function () {
        this.HasInfo = false;
        this.methodType = EliminateMethodType.Normal;
        this.isInFeverTime = false;
        this.EliminateRound = 1;
        this.CalculatedEliminateElement = [];
        this.EliminatedElements = [];
        this.ShieldBreakElements = [];
        this.MoveElements = [];
        this.SpecialEliminatedElement = [];
        this.EliminatedSuperVirus = [];
    };
    return EliminateInfo;
}());
__reflect(EliminateInfo.prototype, "EliminateInfo");
// 消除后，需要移动的元素信息
var EliminateMoveInfo = (function () {
    function EliminateMoveInfo(element, startPosX, startPosY, endPosX, endPosY) {
        this.MoveElement = element;
        this.StartPosX = startPosX;
        this.StartPosY = startPosY;
        this.EndPosX = endPosX;
        this.EndPosY = endPosY;
    }
    return EliminateMoveInfo;
}());
__reflect(EliminateMoveInfo.prototype, "EliminateMoveInfo");
// 消除方案
var EliminateMethodType;
(function (EliminateMethodType) {
    EliminateMethodType[EliminateMethodType["Normal"] = 0] = "Normal";
    EliminateMethodType[EliminateMethodType["SpecificColor"] = 1] = "SpecificColor";
    EliminateMethodType[EliminateMethodType["SpecificRegion"] = 2] = "SpecificRegion";
    EliminateMethodType[EliminateMethodType["SpecificRegionAndColor"] = 3] = "SpecificRegionAndColor";
    EliminateMethodType[EliminateMethodType["MoveUp"] = 4] = "MoveUp";
})(EliminateMethodType || (EliminateMethodType = {}));
// 要消除的元素类型
var EliminateElementType;
(function (EliminateElementType) {
    EliminateElementType[EliminateElementType["Normal"] = 0] = "Normal";
    EliminateElementType[EliminateElementType["PillOnly"] = 1] = "PillOnly";
    EliminateElementType[EliminateElementType["VirusOnly"] = 2] = "VirusOnly";
    EliminateElementType[EliminateElementType["PillAndVirus"] = 3] = "PillAndVirus";
})(EliminateElementType || (EliminateElementType = {}));
var EliminateMethod = (function () {
    function EliminateMethod() {
        this.methodType = EliminateMethodType.Normal;
        this.froceKill = false;
        this.eliminateElementType = EliminateElementType.Normal;
        this.specificColor = GameElementColor.blue;
        this.specificRegion = [];
        this.moveUpValue = 0;
    }
    EliminateMethod.prototype.Reset = function () {
        this.methodType = EliminateMethodType.Normal;
        this.froceKill = false;
        this.eliminateElementType = EliminateElementType.Normal;
        this.moveUpValue = 0;
    };
    return EliminateMethod;
}());
__reflect(EliminateMethod.prototype, "EliminateMethod");
//# sourceMappingURL=EliminateInfo.js.map