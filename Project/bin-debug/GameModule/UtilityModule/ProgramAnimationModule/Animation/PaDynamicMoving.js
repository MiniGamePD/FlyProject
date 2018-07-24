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
var PaDynamicMovingParam = (function (_super) {
    __extends(PaDynamicMovingParam, _super);
    function PaDynamicMovingParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.DynamicMoving;
        _this.displayObj = null;
        _this.startSpeed = 0;
        _this.startSpeedAngle = 0;
        _this.acceleration = 0;
        _this.targetPos = new egret.Point(0, 0);
        _this.needRotate = false;
        _this.needRemoveOnFinish = false;
        return _this;
    }
    return PaDynamicMovingParam;
}(ProgramAnimationParamBase));
__reflect(PaDynamicMovingParam.prototype, "PaDynamicMovingParam");
var PaDynamicMoving = (function (_super) {
    __extends(PaDynamicMoving, _super);
    function PaDynamicMoving() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.finish = false;
        return _this;
    }
    PaDynamicMoving.prototype.OnInit = function () {
        var curPos = new egret.Point(this.param.displayObj.x, this.param.displayObj.y);
        this.velocity = this.param.targetPos.subtract(curPos);
        this.velocity.normalize(this.param.startSpeed);
        this.velocity.x = this.velocity.x + 100;
        this.RotateToTarget(curPos);
    };
    PaDynamicMoving.prototype.RotateToTarget = function (curPos) {
        if (this.param.needRotate) {
            this.param.displayObj.rotation =
                Tools.GetRotateAngleByPoint(curPos, this.param.targetPos);
        }
    };
    PaDynamicMoving.prototype.OnUpdate = function (deltaTime) {
        if (!this.finish) {
            var curPos = new egret.Point(this.param.displayObj.x, this.param.displayObj.y);
            var delta = this.param.targetPos.subtract(curPos);
            var dis = delta.length;
            if (Tools.IsZero(dis)) {
                this.param.displayObj.x = this.param.targetPos.x;
                this.param.displayObj.y = this.param.targetPos.y;
                this.finish = true;
            }
            else {
                this.RotateToTarget(curPos);
                var deltaTimeSecond = deltaTime * MathTools.MilliSecond2Second;
                var deltaVel = delta;
                deltaVel.normalize(this.param.acceleration * deltaTimeSecond);
                this.velocity = this.velocity.add(deltaVel);
                var deltaMove = new egret.Point(this.velocity.x * deltaTimeSecond, this.velocity.y * deltaTimeSecond);
                var movedPos = curPos.add(deltaMove);
                this.param.displayObj.x = movedPos.x;
                this.param.displayObj.y = movedPos.y;
            }
        }
    };
    PaDynamicMoving.prototype.OnRelease = function () {
        if (this.param.needRemoveOnFinish) {
            if (this.param.displayObj.parent != undefined
                && this.param.displayObj.parent != null) {
                this.param.displayObj.parent.removeChild(this.param.displayObj);
            }
        }
    };
    PaDynamicMoving.prototype.IsFinish = function () {
        return this.finish;
    };
    return PaDynamicMoving;
}(ProgramAnimationBase));
__reflect(PaDynamicMoving.prototype, "PaDynamicMoving");
//# sourceMappingURL=PaDynamicMoving.js.map