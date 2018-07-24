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
var FireUpBox = (function (_super) {
    __extends(FireUpBox, _super);
    function FireUpBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FireUpBox.prototype.GetBoxType = function () {
        return BoxType.FireUp;
    };
    FireUpBox.prototype.GetSkillBitmapName = function () {
        return "Skill_FireUp";
    };
    return FireUpBox;
}(SkillCricleBoxBase));
__reflect(FireUpBox.prototype, "FireUpBox");
//# sourceMappingURL=FireUpBox.js.map