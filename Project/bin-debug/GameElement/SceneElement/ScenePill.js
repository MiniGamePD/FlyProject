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
var ScenePill = (function (_super) {
    __extends(ScenePill, _super);
    function ScenePill(owner) {
        var _this = _super.call(this, owner) || this;
        _this.renderer = new egret.Bitmap();
        _this.color = _this.RandomColor();
        _this.canDrop = true;
        _this.eliminateMinCount = Scene.EliminateMinCount;
        _this.elementType = SceneElementType.Pill;
        _this.eliminateSound = "VirusEliminate_mp3";
        return _this;
    }
    ScenePill.prototype.CreatePillLink = function () {
        this.mLink = this.resModule.CreateBitmapByName("pd_res_json.Pill_Middle");
        this.mLink.width = Tools.MatchViewElementWidth;
        this.mLink.height = Tools.MatchViewElementHeight;
        this.mLink.anchorOffsetX = this.mLink.width / 2;
        this.mLink.anchorOffsetY = this.mLink.height / 2;
        this.accessoryBg = new egret.DisplayObjectContainer();
        this.accessoryBg.addChild(this.mLink);
    };
    ScenePill.prototype.DeletePillLink = function () {
        if (this.mLink != undefined) {
            this.accessoryBg.removeChild(this.mLink);
            this.mLink = undefined;
        }
    };
    ScenePill.prototype.CreateLinkPreview = function () {
        var link = this.resModule.CreateBitmapByName("pd_res_json.Pill_Middle");
        link.width = Tools.MatchViewElementWidth;
        link.height = Tools.MatchViewElementHeight;
        link.anchorOffsetX = this.mLink.width / 2;
        link.anchorOffsetY = this.mLink.height / 2;
        link.x = link.width / 2;
        link.y = 0;
        link.rotation = 90;
        return link;
    };
    ScenePill.prototype.SetPillType = function (pillType) {
        this.mPillType = pillType;
        if (pillType == PillElementType.Single) {
            this.DeletePillLink();
        }
        else if (pillType == PillElementType.left) {
            if (this.mLink != undefined) {
                this.mLink.x = Tools.MatchViewElementWidth / 2;
                this.mLink.y = 0;
                this.mLink.rotation = 90;
            }
        }
        else if (pillType == PillElementType.right) {
            if (this.mLink != undefined) {
                this.mLink.x = -Tools.MatchViewElementWidth / 2;
                this.mLink.y = 0;
                this.mLink.rotation = 90;
            }
        }
        else if (pillType == PillElementType.up) {
            if (this.mLink != undefined) {
                this.mLink.x = 0;
                this.mLink.y = Tools.MatchViewElementHeight / 2;
                this.mLink.rotation = 0;
            }
        }
        else if (pillType == PillElementType.down) {
            if (this.mLink != undefined) {
                this.mLink.x = 0;
                this.mLink.y = -Tools.MatchViewElementHeight / 2;
                this.mLink.rotation = 0;
            }
        }
        this.dirty = true;
    };
    ScenePill.prototype.RefreshTexture = function () {
        _super.prototype.RefreshTexture.call(this);
        var textureRotate = 0;
        var scaleX = 1;
        switch (this.mPillType) {
            case PillElementType.left:
                {
                    textureRotate = 0;
                    scaleX = 1;
                    break;
                }
            case PillElementType.right:
                {
                    textureRotate = 0;
                    scaleX = -1;
                    break;
                }
            case PillElementType.up:
                {
                    textureRotate = 90;
                    scaleX = 1;
                    break;
                }
            case PillElementType.down:
                {
                    textureRotate = 90;
                    scaleX = -1;
                    break;
                }
        }
        // this.renderer.rotation = textureRotate;
        this.renderer.scaleX = scaleX;
    };
    ScenePill.prototype.GetResPathByColor = function () {
        var resPath = "pd_res_json.Pill_";
        // if (this.mPillType == PillElementType.Single)
        {
            resPath += "Single_";
        }
        switch (this.color) {
            case GameElementColor.red:
                resPath += "Red";
                break;
            case GameElementColor.blue:
                resPath += "Blue";
                break;
            case GameElementColor.yellow:
                resPath += "Yellow";
                break;
            default:
                if (true) {
                    console.log("Unknow Color:" + this.color);
                }
                break;
        }
        return resPath;
    };
    // 删除捆绑元素后，重新计算药丸的类型
    ScenePill.prototype.UnbindElement = function (element) {
        var result = _super.prototype.UnbindElement.call(this, element);
        if (result
            && this.GetBindElements().length == 0) {
            this.SetPillType(PillElementType.Single);
        }
        return result;
    };
    // 删除捆绑元素后，重新计算药丸的类型
    ScenePill.prototype.UnbindAllElement = function () {
        _super.prototype.UnbindAllElement.call(this);
        this.SetPillType(PillElementType.Single);
    };
    ScenePill.prototype.OnRotated = function () {
        var ownerPill = this.owner;
        ownerPill.OnRotateACW();
    };
    return ScenePill;
}(SceneElementBase));
__reflect(ScenePill.prototype, "ScenePill");
var PillElementType;
(function (PillElementType) {
    PillElementType[PillElementType["left"] = 0] = "left";
    PillElementType[PillElementType["right"] = 1] = "right";
    PillElementType[PillElementType["up"] = 2] = "up";
    PillElementType[PillElementType["down"] = 3] = "down";
    PillElementType[PillElementType["Single"] = 4] = "Single";
})(PillElementType || (PillElementType = {}));
//# sourceMappingURL=ScenePill.js.map