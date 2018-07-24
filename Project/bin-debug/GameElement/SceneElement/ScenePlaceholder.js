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
var ScenePlaceholder = (function (_super) {
    __extends(ScenePlaceholder, _super);
    function ScenePlaceholder(owner) {
        var _this = _super.call(this, owner) || this;
        //纯粹的placeHolder不显示任何东西
        _this.renderer = null;
        //For DEBUG
        // this.renderer = new egret.Bitmap();
        // let path = "pd_res_json.Virus_Yellow";
        // this.renderer.texture = this.GetTexture(path);
        // this.renderer.alpha = 0.2;
        //For DEBUG
        _this.color = owner.color;
        _this.canDrop = false;
        _this.eliminateMinCount = Scene.EliminateMinCount;
        _this.elementType = SceneElementType.PlaceHolder;
        return _this;
    }
    ScenePlaceholder.prototype.BlockWidth = function () {
        return 1;
    };
    ScenePlaceholder.prototype.BlockHeight = function () {
        return 1;
    };
    ScenePlaceholder.prototype.GetResPathByColor = function () {
        return null;
    };
    return ScenePlaceholder;
}(SceneElementBase));
__reflect(ScenePlaceholder.prototype, "ScenePlaceholder");
//# sourceMappingURL=ScenePlaceholder.js.map