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
var SkillCricleBoxBase = (function (_super) {
    __extends(SkillCricleBoxBase, _super);
    function SkillCricleBoxBase(id, initPos, targetPos, health, radius) {
        var _this = _super.call(this, id, initPos, targetPos, health) || this;
        _this.canMerge = false;
        _this.radius = radius;
        _this.moveSpeed = 0;
        _this.CreateBox();
        _this.SetColor(0xffffff);
        return _this;
    }
    SkillCricleBoxBase.prototype.GetBoxType = function () {
        return BoxType.None;
    };
    SkillCricleBoxBase.prototype.GetSkillBitmapName = function () {
        if (true) {
            console.assert(false, "Can not instance SkillCricleBox!");
        }
        return "";
    };
    SkillCricleBoxBase.prototype.CreateDisplay = function () {
        var resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        var shape = resModule.CreateBitmapByName(this.GetSkillBitmapName());
        shape.width = this.radius * 2;
        shape.height = this.radius * 2;
        shape.x = this.initPos.x;
        shape.y = this.initPos.y;
        shape.anchorOffsetX = this.radius;
        shape.anchorOffsetY = this.radius;
        return shape;
    };
    SkillCricleBoxBase.prototype.CreateBox = function () {
        // var moveDir = new egret.Point(this.targetPos.x - this.initPos.x, this.targetPos.y - this.initPos.y);
        // moveDir.normalize(this.moveSpeed);
        this.boxDisplayObj = this.CreateDisplay();
        this.healthDisplayObj = new egret.TextField();
        this.healthDisplayObj.text = this.health.toString();
        this.healthDisplayObj.x = this.initPos.x;
        this.healthDisplayObj.y = this.initPos.y;
        this.healthDisplayObj.width = this.radius * 2;
        this.healthDisplayObj.height = this.radius * 2;
        this.healthDisplayObj.anchorOffsetX = this.healthDisplayObj.width / 2;
        this.healthDisplayObj.anchorOffsetY = this.healthDisplayObj.height / 2 - 18;
        this.healthDisplayObj.textAlign = egret.HorizontalAlign.CENTER;
        this.healthDisplayObj.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.phyShape = new p2.Circle({ radius: this.radius });
        this.phyShape.id = this.id;
        this.phyShape.collisionGroup = Collision_Layer_Box;
        this.phyShape.collisionMask = Collision_Layer_Ball;
        this.phyBody = new p2.Body({
            id: this.id,
            mass: this.boxMass, position: [this.initPos.x, this.initPos.y],
            /*velocity: [moveDir.x, moveDir.y],*/ type: p2.Body.KINEMATIC
        });
        this.phyBody.collisionResponse = true;
        this.phyBody.addShape(this.phyShape);
        this.phyBody.displays = [this.boxDisplayObj, this.healthDisplayObj];
    };
    SkillCricleBoxBase.prototype.OnEliminate = function () {
        _super.prototype.OnEliminate.call(this);
        var event = new SpecialBoxEliminateEvent();
        event.boxType = this.GetBoxType();
        GameMain.GetInstance().DispatchEvent(event);
    };
    return SkillCricleBoxBase;
}(Box));
__reflect(SkillCricleBoxBase.prototype, "SkillCricleBoxBase");
//# sourceMappingURL=SkillCricleBoxBase.js.map