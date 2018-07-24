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
var SquareBox = (function (_super) {
    __extends(SquareBox, _super);
    function SquareBox(id, initPos, targetPos, health, width) {
        var _this = _super.call(this, id, initPos, targetPos, health) || this;
        _this.canMerge = true;
        _this.boxSize = new egret.Point(width, width);
        _this.CreateBox();
        return _this;
    }
    SquareBox.prototype.GetBoxType = function () {
        return BoxType.Square;
    };
    SquareBox.prototype.CreateDisplay = function () {
        var resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        var boxName = "SquareBox" + (this.colorIndex + 1);
        var shape = resModule.CreateBitmap(boxName, this.initPos.x, this.initPos.y);
        shape.width = this.boxSize.x;
        shape.height = this.boxSize.y;
        Tools.SetAnchor(shape, AnchorType.Center);
        return shape;
    };
    SquareBox.prototype.CreateBox = function () {
        var moveDir = new egret.Point(this.targetPos.x - this.initPos.x, this.targetPos.y - this.initPos.y);
        moveDir.normalize(this.moveSpeed);
        this.boxDisplayObj = this.CreateDisplay();
        this.healthDisplayObj = new egret.TextField();
        this.healthDisplayObj.text = this.health.toString();
        this.healthDisplayObj.x = this.initPos.x;
        this.healthDisplayObj.y = this.initPos.y;
        this.healthDisplayObj.width = this.boxSize.x;
        this.healthDisplayObj.height = this.boxSize.y;
        this.healthDisplayObj.anchorOffsetX = this.healthDisplayObj.width / 2;
        this.healthDisplayObj.anchorOffsetY = this.healthDisplayObj.height / 2;
        this.healthDisplayObj.textAlign = egret.HorizontalAlign.CENTER;
        this.healthDisplayObj.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.healthDisplayObj.textColor = this.color;
        this.phyShape = new p2.Box({ width: this.boxSize.x, height: this.boxSize.y });
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
    return SquareBox;
}(Box));
__reflect(SquareBox.prototype, "SquareBox");
//# sourceMappingURL=SquareBox.js.map