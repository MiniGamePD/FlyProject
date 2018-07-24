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
var PaAccMovingParam = (function (_super) {
    __extends(PaAccMovingParam, _super);
    function PaAccMovingParam() {
        var _this = _super.call(this) || this;
        _this.animType = ProgramAnimationType.AccMoving;
        _this.displayObj = null;
        _this.attachDisplayObj = null;
        _this.startSpeed = 0;
        _this.accelerate = 0;
        _this.startPos = null;
        _this.targetPos = null;
        _this.needRotate = false;
        _this.needRemoveOnFinish = false;
        return _this;
    }
    return PaAccMovingParam;
}(ProgramAnimationParamBase));
__reflect(PaAccMovingParam.prototype, "PaAccMovingParam");
var PaAccMoving = (function (_super) {
    __extends(PaAccMoving, _super);
    function PaAccMoving() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaAccMoving.prototype.OnInit = function () {
        this.isFinish = false;
        this.moveDistance = 0;
        if (this.param.startPos != null && this.param.startPos != undefined) {
            this.startPos = this.param.startPos;
            this.param.displayObj.x = this.param.startPos.x;
            this.param.displayObj.y = this.param.startPos.y;
            if (this.param.attachDisplayObj != null) {
                for (var i = 0; i < this.param.attachDisplayObj.length; ++i) {
                    if (this.param.attachDisplayObj[i] != undefined && this.param.attachDisplayObj[i] != null) {
                        this.param.attachDisplayObj[i].x = this.param.displayObj.x;
                        this.param.attachDisplayObj[i].y = this.param.displayObj.y;
                    }
                }
            }
        }
        else {
            this.startPos = new egret.Point(this.param.displayObj.x, this.param.displayObj.y);
        }
        this.moveDir = this.param.targetPos.subtract(this.startPos);
        this.targetDistance = this.moveDir.length;
        this.speed = this.param.startSpeed;
        if (this.param.needRotate) {
            this.param.displayObj.rotation =
                Tools.GetRotateAngle(this.startPos.x, this.startPos.y, this.param.targetPos.x, this.param.targetPos.y);
            if (this.param.attachDisplayObj != null) {
                for (var i = 0; i < this.param.attachDisplayObj.length; ++i) {
                    if (this.param.attachDisplayObj[i] != undefined && this.param.attachDisplayObj[i] != null) {
                        this.param.attachDisplayObj[i].rotation = this.param.displayObj.rotation;
                    }
                }
            }
        }
    };
    PaAccMoving.prototype.OnUpdate = function (deltaTime) {
        if (!this.isFinish) {
            this.speed += this.param.accelerate * deltaTime * 0.001;
            var moveDis = this.speed * deltaTime * 0.001;
            this.moveDistance += moveDis;
            this.moveDir.normalize(moveDis);
            this.param.displayObj.x += this.moveDir.x;
            this.param.displayObj.y += this.moveDir.y;
            if (this.moveDistance > this.targetDistance) {
                this.param.displayObj.x = this.param.targetPos.x;
                this.param.displayObj.y = this.param.targetPos.y;
                this.isFinish = true;
            }
            if (this.param.attachDisplayObj != null) {
                for (var i = 0; i < this.param.attachDisplayObj.length; ++i) {
                    if (this.param.attachDisplayObj[i] != undefined && this.param.attachDisplayObj[i] != null) {
                        this.param.attachDisplayObj[i].x = this.param.displayObj.x;
                        this.param.attachDisplayObj[i].y = this.param.displayObj.y;
                    }
                }
            }
        }
    };
    PaAccMoving.prototype.OnRelease = function () {
        if (this.param.needRemoveOnFinish) {
            Tools.DetachDisplayObjFromParent(this.param.displayObj);
            if (this.param.attachDisplayObj != null) {
                for (var i = 0; i < this.param.attachDisplayObj.length; ++i) {
                    Tools.DetachDisplayObjFromParent(this.param.attachDisplayObj[i]);
                }
            }
        }
    };
    PaAccMoving.prototype.IsFinish = function () {
        return this.isFinish;
    };
    return PaAccMoving;
}(ProgramAnimationBase));
__reflect(PaAccMoving.prototype, "PaAccMoving");
//# sourceMappingURL=PaAccMoving.js.map