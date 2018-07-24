var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BossSkillInfo = (function () {
    function BossSkillInfo() {
        this.hasInfo = false;
        this.skillCaster = null;
        this.addHealthElement = [];
        this.elementTransList = [];
        this.elementChangeColorList = [];
    }
    // 重置
    BossSkillInfo.prototype.Reset = function () {
        this.hasInfo = false;
        this.skillCaster = null;
        this.addHealthElement = [];
        this.elementTransList = [];
        this.elementChangeColorList = [];
    };
    return BossSkillInfo;
}());
__reflect(BossSkillInfo.prototype, "BossSkillInfo");
// 元素转换信息
var ElementTransInfo = (function () {
    function ElementTransInfo() {
    }
    return ElementTransInfo;
}());
__reflect(ElementTransInfo.prototype, "ElementTransInfo");
// 元素换色信息
var ElementChangeColorInfo = (function () {
    function ElementChangeColorInfo() {
    }
    return ElementChangeColorInfo;
}());
__reflect(ElementChangeColorInfo.prototype, "ElementChangeColorInfo");
//# sourceMappingURL=BossSkillInfo.js.map