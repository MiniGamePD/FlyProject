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
var Virus = (function (_super) {
    __extends(Virus, _super);
    function Virus() {
        var _this = _super.call(this) || this;
        _this.hp = _this.maxHp = 1;
        _this.shield = 0;
        _this.virusRenderer = new SceneVirus(_this);
        _this.virusRenderer.RefreshTexture();
        _this.bornType = NpcBornType.Normal;
        _this.bornSound = "VirusBorn_mp3";
        return _this;
    }
    Virus.prototype.MoveTo = function (posx, posy) {
        this.posx = posx;
        this.posy = posy;
        this.virusRenderer.MoveTo(posx, posy);
    };
    Virus.prototype.FillSceneElementArray = function () {
        this.sceneElements.push(this.virusRenderer);
    };
    Virus.prototype.PlayAnim = function (animType) {
    };
    Virus.prototype.GetPreViewContainer = function () {
        console.error("Not Implement Error");
        return null;
    };
    return Virus;
}(NpcElement));
__reflect(Virus.prototype, "Virus");
//# sourceMappingURL=Virus.js.map