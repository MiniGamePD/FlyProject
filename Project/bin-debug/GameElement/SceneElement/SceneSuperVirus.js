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
var SceneSuperVirus = (function (_super) {
    __extends(SceneSuperVirus, _super);
    function SceneSuperVirus(owner) {
        var _this = _super.call(this, owner) || this;
        _this.renderer = new egret.Bitmap();
        var offset = _this.ArrangeHpBarPosByColor();
        offset.x *= Tools.MatchViewElementWidth;
        offset.y *= Tools.MatchViewElementHeight;
        var hpBarBgRect = new egret.Rectangle(offset.x, offset.y, Tools.MatchViewElementWidth * 1.5, Tools.MatchViewElementHeight * 0.5);
        var dx = hpBarBgRect.width * 0.05;
        var dy = hpBarBgRect.height * 0.05;
        var hpBarFgRect = hpBarBgRect.clone();
        hpBarFgRect.inflate(-dx, -dy);
        _this.hpBar = new ProgressBar("pd_res_json.Pill_Bg", hpBarBgRect, "pd_res_json.Bottle2", hpBarFgRect);
        _this.accessory.addChild(_this.hpBar);
        _this.canDrop = false;
        _this.eliminateMinCount = Scene.EliminateMinCount;
        _this.elementType = SceneElementType.PlaceHolder;
        _this.RefreshTexture();
        return _this;
    }
    SceneSuperVirus.prototype.GetResPathByColor = function () {
        var path = "pd_res_json.Boss_";
        switch (this.color) {
            case GameElementColor.red:
                path += "Red";
                break;
            case GameElementColor.blue:
                path += "Blue";
                break;
            case GameElementColor.yellow:
                path += "Yellow";
                break;
            default:
                if (true) {
                    console.log("Unknow Color:" + this.color);
                }
                break;
        }
        return path;
    };
    SceneSuperVirus.prototype.BlockWidth = function () {
        return this.owner.blockWidth;
    };
    SceneSuperVirus.prototype.BlockHeight = function () {
        return this.owner.blockHeight;
    };
    SceneSuperVirus.prototype.ArrangeHpBarPosByColor = function () {
        var result = new egret.Point();
        if (this.color == GameElementColor.red) {
            //2x4
            // @@
            // @@
            // @@
            // @@
            result.x = -0.25;
            result.y = 3;
        }
        else if (this.color == GameElementColor.blue) {
            //3x3
            // @@@
            // @ @
            // @@@
            result.x = 0.25;
            result.y = 2;
        }
        else if (this.color == GameElementColor.yellow) {
            //4x2
            // @@@@
            // @@@@
            result.x = 0.75;
            result.y = 1;
        }
        return result;
    };
    SceneSuperVirus.prototype.SetHpBarProgress = function (progress) {
        this.hpBar.SetProgress(progress);
    };
    return SceneSuperVirus;
}(ScenePlaceholder));
__reflect(SceneSuperVirus.prototype, "SceneSuperVirus");
//# sourceMappingURL=SceneSuperVirus.js.map