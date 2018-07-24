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
var Pill = (function (_super) {
    __extends(Pill, _super);
    function Pill() {
        var _this = _super.call(this) || this;
        _this.rotAngle = 0;
        _this.pill1 = new ScenePill(_this);
        _this.pill1.CreatePillLink();
        _this.pill2 = new ScenePill(_this);
        _this.pill1.SetPillType(PillElementType.left);
        _this.pill1.RefreshTexture();
        _this.pill2.SetPillType(PillElementType.right);
        _this.pill2.RefreshTexture();
        _this.pill1.BindElement(_this.pill2);
        //坐标表示药丸左下角块的坐标, 初始坐标在瓶子正中间的最上方
        _this.InitPos(Scene.Columns / 2 - 1, 0);
        return _this;
    }
    Pill.prototype.AdjustRotateAngle = function () {
        if (this.pill1.posx == this.pill2.posx) {
            if (this.pill1.posy > this.pill2.posy) {
                return 90;
            }
            else {
                return 270;
            }
        }
        else {
            if (this.pill1.posx > this.pill2.posx) {
                return 180;
            }
            else {
                return 0;
            }
        }
    };
    Pill.prototype.OnRotateACW = function () {
        this.rotAngle = this.AdjustRotateAngle();
        if (this.rotAngle == 0) {
            this.pill1.SetPillType(PillElementType.left);
            this.pill2.SetPillType(PillElementType.right);
        }
        else if (this.rotAngle == 90) {
            this.pill1.SetPillType(PillElementType.down);
            this.pill2.SetPillType(PillElementType.up);
        }
        else if (this.rotAngle == 180) {
            this.pill1.SetPillType(PillElementType.right);
            this.pill2.SetPillType(PillElementType.left);
        }
        else if (this.rotAngle == 270) {
            this.pill1.SetPillType(PillElementType.up);
            this.pill2.SetPillType(PillElementType.down);
        }
        // this.pill1.RefreshTexture();
        // this.pill2.RefreshTexture();
    };
    Pill.prototype.GetRotateACWPosList = function () {
        this.rotatePosListTemp = [];
        this.rotatePosListTemp.push(this.pill1.posx);
        this.rotatePosListTemp.push(this.pill1.posy);
        var pill2RotatePos = Tools.RotateACW(this.rotatePosListTemp, [this.pill2.posx, this.pill2.posy]);
        this.rotatePosListTemp.push(pill2RotatePos[0]);
        this.rotatePosListTemp.push(pill2RotatePos[1]);
        return this.rotatePosListTemp;
    };
    Pill.prototype.InitPos = function (posx, posy) {
        this.posx = posx;
        this.posy = posy;
        this.pill1.MoveTo(this.posx, this.posy);
        this.pill2.MoveTo(this.posx + 1, this.posy);
    };
    Pill.prototype.FillSceneElementArray = function () {
        this.sceneElements.push(this.pill1);
        this.sceneElements.push(this.pill2);
    };
    Pill.prototype.GetPreViewContainer = function () {
        var previewContainer = new egret.DisplayObjectContainer();
        var link = this.pill1.CreateLinkPreview();
        var preview1 = this.pill1.GetPreView();
        preview1.x = 0;
        preview1.y = 0;
        var preview2 = this.pill2.GetPreView();
        preview2.x = Tools.MatchViewElementWidth;
        preview2.y = 0;
        previewContainer.addChild(link);
        previewContainer.addChild(preview1);
        previewContainer.addChild(preview2);
        return previewContainer;
    };
    Pill.prototype.GetPreviewSize = function () { return 2; };
    return Pill;
}(ControlableElement));
__reflect(Pill.prototype, "Pill");
//# sourceMappingURL=Pill.js.map