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
var LevelUpBox = (function (_super) {
    __extends(LevelUpBox, _super);
    function LevelUpBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelUpBox.prototype.GetBoxType = function () {
        return BoxType.LevelUp;
    };
    LevelUpBox.prototype.GetSkillBitmapName = function () {
        return "Skill_LvUp";
    };
    return LevelUpBox;
}(SkillCricleBoxBase));
__reflect(LevelUpBox.prototype, "LevelUpBox");
//# sourceMappingURL=LevelUpBox.js.map