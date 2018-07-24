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
var CircleBox = (function (_super) {
    __extends(CircleBox, _super);
    function CircleBox(id, initPos, targetPos, health, radius) {
        var _this = _super.call(this, id, initPos, targetPos, health) || this;
        _this.radius = radius;
        _this.canMerge = true;
        _this.CreateBox();
        return _this;
    }
    CircleBox.prototype.GetBoxType = function () {
        return BoxType.Circle;
    };
    CircleBox.prototype.CreateDisplay = function () {
        var shape = new egret.Shape();
        shape.graphics.lineStyle(BoxLineWidth, this.color);
        shape.graphics.beginFill(this.color, BoxBackGroundAlpha);
        shape.graphics.drawCircle(0, 0, this.radius);
        shape.graphics.endFill();
        shape.x = this.initPos.x;
        shape.y = this.initPos.y;
        return shape;
    };
    CircleBox.prototype.CreateBox = function () {
        var moveDir = new egret.Point(this.targetPos.x - this.initPos.x, this.targetPos.y - this.initPos.y);
        moveDir.normalize(this.moveSpeed);
        this.boxDisplayObj = this.CreateDisplay();
        this.healthDisplayObj = new egret.TextField();
        this.healthDisplayObj.text = this.health.toString();
        this.healthDisplayObj.x = this.initPos.x;
        this.healthDisplayObj.y = this.initPos.y;
        this.healthDisplayObj.width = this.radius * 2;
        this.healthDisplayObj.height = this.radius * 2;
        this.healthDisplayObj.anchorOffsetX = this.healthDisplayObj.width / 2;
        this.healthDisplayObj.anchorOffsetY = this.healthDisplayObj.height / 2;
        this.healthDisplayObj.textAlign = egret.HorizontalAlign.CENTER;
        this.healthDisplayObj.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.healthDisplayObj.textColor = this.color;
        this.phyShape = new p2.Circle({ radius: this.radius });
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
    return CircleBox;
}(Box));
__reflect(CircleBox.prototype, "CircleBox");
//# sourceMappingURL=CircleBox.js.map