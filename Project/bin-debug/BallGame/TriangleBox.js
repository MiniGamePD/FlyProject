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
var TriangleBoxType;
(function (TriangleBoxType) {
    TriangleBoxType[TriangleBoxType["LeftTop"] = 0] = "LeftTop";
    TriangleBoxType[TriangleBoxType["LeftBottom"] = 1] = "LeftBottom";
    TriangleBoxType[TriangleBoxType["RightTop"] = 2] = "RightTop";
    TriangleBoxType[TriangleBoxType["RightBottom"] = 3] = "RightBottom";
})(TriangleBoxType || (TriangleBoxType = {}));
var TriangleBox = (function (_super) {
    __extends(TriangleBox, _super);
    function TriangleBox(id, initPos, targetPos, health, width) {
        var _this = _super.call(this, id, initPos, targetPos, health) || this;
        _this.healthOffsetRate = 0.2;
        _this.canMerge = true;
        _this.width = width;
        _this.InitTriangleBoxType();
        _this.CreatePoint();
        _this.CreateBox();
        return _this;
    }
    TriangleBox.prototype.InitTriangleBoxType = function () {
        var deltaX = this.targetPos.x - this.initPos.x;
        var deltaY = this.targetPos.y - this.initPos.y;
        if (deltaX >= 0 && deltaY >= 0) {
            this.triangleBoxType = TriangleBoxType.LeftTop;
        }
        else if (deltaX >= 0 && deltaY <= 0) {
            this.triangleBoxType = TriangleBoxType.LeftBottom;
        }
        else if (deltaX <= 0 && deltaY <= 0) {
            this.triangleBoxType = TriangleBoxType.RightBottom;
        }
        else {
            this.triangleBoxType = TriangleBoxType.RightTop;
        }
    };
    TriangleBox.prototype.CreatePoint = function () {
        this.pointList = [];
        var leftTop = new egret.Point(-this.width / 2, -this.width / 2);
        var leftBottom = new egret.Point(-this.width / 2, this.width / 2);
        var rightTop = new egret.Point(this.width / 2, -this.width / 2);
        var rightBottom = new egret.Point(this.width / 2, this.width / 2);
        this.displayScale = new egret.Point;
        if (this.triangleBoxType == TriangleBoxType.LeftTop) {
            this.displayScale.x = 1;
            this.displayScale.y = 1;
            this.pointList.push(leftBottom);
            this.pointList.push(leftTop);
            this.pointList.push(rightTop);
            this.healthOffset = new egret.Point(-this.width * this.healthOffsetRate, -this.width * this.healthOffsetRate);
        }
        else if (this.triangleBoxType == TriangleBoxType.LeftBottom) {
            this.displayScale.x = 1;
            this.displayScale.y = -1;
            this.pointList.push(rightBottom);
            this.pointList.push(leftBottom);
            this.pointList.push(leftTop);
            this.healthOffset = new egret.Point(-this.width * this.healthOffsetRate, this.width * this.healthOffsetRate);
        }
        else if (this.triangleBoxType == TriangleBoxType.RightBottom) {
            this.displayScale.x = -1;
            this.displayScale.y = -1;
            this.pointList.push(rightTop);
            this.pointList.push(rightBottom);
            this.pointList.push(leftBottom);
            this.healthOffset = new egret.Point(this.width * this.healthOffsetRate, this.width * this.healthOffsetRate);
        }
        else if (this.triangleBoxType == TriangleBoxType.RightTop) {
            this.displayScale.x = -1;
            this.displayScale.y = 1;
            this.pointList.push(leftTop);
            this.pointList.push(rightTop);
            this.pointList.push(rightBottom);
            this.healthOffset = new egret.Point(this.width * this.healthOffsetRate, -this.width * this.healthOffsetRate);
        }
    };
    TriangleBox.prototype.GetBoxType = function () {
        return BoxType.Triangle;
    };
    TriangleBox.prototype.GetCenterPos = function () {
        this.boxCenterPosTemp.x = this.healthDisplayObj.x + this.healthOffset.x;
        this.boxCenterPosTemp.y = this.healthDisplayObj.y + this.healthOffset.y;
        return this.boxCenterPosTemp;
    };
    TriangleBox.prototype.CreateDisplay = function () {
        var resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        var boxName = "TriangleBox" + (this.colorIndex + 1);
        var shape = resModule.CreateBitmap(boxName, this.initPos.x, this.initPos.y);
        shape.width = this.width;
        shape.height = this.width;
        Tools.SetAnchor(shape, AnchorType.Center);
        shape.scaleX = this.displayScale.x;
        shape.scaleY = this.displayScale.y;
        return shape;
    };
    TriangleBox.prototype.CreateBox = function () {
        var moveDir = new egret.Point(this.targetPos.x - this.initPos.x, this.targetPos.y - this.initPos.y);
        moveDir.normalize(this.moveSpeed);
        this.boxDisplayObj = this.CreateDisplay();
        this.healthDisplayObj = new egret.TextField();
        this.healthDisplayObj.text = this.health.toString();
        this.healthDisplayObj.x = this.initPos.x;
        this.healthDisplayObj.y = this.initPos.y;
        this.healthDisplayObj.width = this.width;
        this.healthDisplayObj.height = this.width;
        this.healthDisplayObj.anchorOffsetX = this.width / 2 - this.healthOffset.x;
        this.healthDisplayObj.anchorOffsetY = this.width / 2 - this.healthOffset.y;
        this.healthDisplayObj.textAlign = egret.HorizontalAlign.CENTER;
        this.healthDisplayObj.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.healthDisplayObj.textColor = this.color;
        var vertices = [];
        for (var i = 0; i < this.pointList.length; ++i) {
            vertices.push([this.pointList[i].x, this.pointList[i].y]);
        }
        this.phyShape = new p2.Convex({ vertices: vertices });
        this.phyShape.id = this.id;
        this.phyShape.collisionGroup = Collision_Layer_Box;
        this.phyShape.collisionMask = Collision_Layer_Ball;
        this.phyBody = new p2.Body({
            id: this.id,
            mass: this.boxMass, position: [this.initPos.x, this.initPos.y],
            velocity: [moveDir.x, moveDir.y], type: p2.Body.KINEMATIC
        });
        this.phyBody.collisionResponse = true;
        this.phyBody.addShape(this.phyShape);
        this.phyBody.displays = [this.boxDisplayObj, this.healthDisplayObj];
    };
    return TriangleBox;
}(Box));
__reflect(TriangleBox.prototype, "TriangleBox");
//# sourceMappingURL=TriangleBox.js.map