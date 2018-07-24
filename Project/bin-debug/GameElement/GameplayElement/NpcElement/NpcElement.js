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
var NpcElement = (function (_super) {
    __extends(NpcElement, _super);
    function NpcElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NpcElement.prototype.MoveTo = function (posx, posy) { };
    NpcElement.prototype.PlayAnim = function (animTYpe) { };
    NpcElement.prototype.PlaySound = function (soundType) {
        if (soundType == NpcSoundType.Born) {
            this.PlaySoundInternal(this.bornSound);
        }
    };
    NpcElement.prototype.PlaySoundInternal = function (soundName) {
        var event = new PlaySoundEvent(soundName, 1);
        GameMain.GetInstance().DispatchEvent(event);
    };
    NpcElement.prototype.SkillType = function () {
        return NpcSkillType.None;
    };
    return NpcElement;
}(GameplayElementBase));
__reflect(NpcElement.prototype, "NpcElement");
var NpcBornType;
(function (NpcBornType) {
    NpcBornType[NpcBornType["Normal"] = 0] = "Normal";
    NpcBornType[NpcBornType["DestroyObstruction"] = 1] = "DestroyObstruction";
})(NpcBornType || (NpcBornType = {}));
var NpcAnimType;
(function (NpcAnimType) {
    NpcAnimType[NpcAnimType["Born"] = 0] = "Born";
    NpcAnimType[NpcAnimType["Idel"] = 1] = "Idel";
    NpcAnimType[NpcAnimType["UseSkill"] = 2] = "UseSkill";
})(NpcAnimType || (NpcAnimType = {}));
var NpcSoundType;
(function (NpcSoundType) {
    NpcSoundType[NpcSoundType["Born"] = 0] = "Born";
})(NpcSoundType || (NpcSoundType = {}));
var NpcSkillType;
(function (NpcSkillType) {
    NpcSkillType[NpcSkillType["None"] = 0] = "None";
    NpcSkillType[NpcSkillType["AddShieldForVirus"] = 1] = "AddShieldForVirus";
    NpcSkillType[NpcSkillType["ChangePillToVirus"] = 2] = "ChangePillToVirus";
    NpcSkillType[NpcSkillType["ChangeVirusColor"] = 3] = "ChangeVirusColor";
})(NpcSkillType || (NpcSkillType = {}));
//# sourceMappingURL=NpcElement.js.map