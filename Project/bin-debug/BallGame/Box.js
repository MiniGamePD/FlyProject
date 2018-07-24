var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Box = (function () {
    function Box(id, initPos, targetPos, health) {
        this.boxMass = 20000;
        this.moveSpeed = BoxMoveSpeed;
        this.isHide = false;
        this.hideCDTime = 0;
        this.canMerge = false;
        this.pause = false;
        this.pauseLeftTime = 0;
        this.id = id;
        this.health = health;
        this.isHide = false;
        this.initPos = initPos;
        this.boxSize = new egret.Point(80, 80);
        this.targetPos = targetPos;
        this.moveSpeed = BoxMoveSpeed;
        this.SetColor(this.GetRandomBoxColor());
        this.boxCenterPosTemp = new egret.Point();
    }
    Box.prototype.GetRandomBoxColor = function () {
        this.colorIndex = Math.floor(Math.random() * BoxColorPool.length);
        return BoxColorPool[this.colorIndex];
    };
    Box.prototype.SetColor = function (color) {
        this.color = color;
        if (this.healthDisplayObj != undefined
            && this.healthDisplayObj != null) {
            this.healthDisplayObj.textColor = color;
        }
    };
    Box.prototype.GetCenterPos = function () {
        this.boxCenterPosTemp.x = this.healthDisplayObj.x;
        this.boxCenterPosTemp.y = this.healthDisplayObj.y;
        return this.boxCenterPosTemp;
    };
    Box.prototype.Update = function (deltaTime) {
        if (this.pauseLeftTime > 0) {
            this.pauseLeftTime -= deltaTime;
            if (this.pauseLeftTime <= 0) {
                this.SetPause(false);
            }
        }
        if (this.hideCDTime > 0) {
            this.hideCDTime -= deltaTime;
            if (this.hideCDTime <= 0
                && this.isHide) {
                this.SetHide(false);
            }
        }
    };
    Box.prototype.changeHealth = function (healthValue) {
        var lastHealth = this.health;
        this.health += healthValue;
        this.health = this.health < 0 ? 0 : this.health;
        this.SetHide(true);
        this.RefreshDisplay();
        return this.health - lastHealth;
    };
    Box.prototype.OnEliminate = function () {
        Tools.DetachDisplayObjFromParent(this.pauseEffect);
        this.PlayBoxBoomEffect();
    };
    Box.prototype.PlayBoxBoomEffect = function () {
        for (var i = 1; i <= 7; ++i) {
            this.BoxBoomPartical("BoxBoom" + i);
        }
    };
    Box.prototype.BoxBoomPartical = function (textureName) {
        var param = new PaPlayParticalParam;
        param.textureName = textureName;
        param.jsonName = "BoxBoom";
        param.duration = 3000;
        param.emitDuration = 100;
        param.posX = this.boxDisplayObj.x;
        param.posY = this.boxDisplayObj.y;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    Box.prototype.RefreshDisplay = function () {
        if (this.healthDisplayObj != undefined
            && this.healthDisplayObj != null) {
            this.healthDisplayObj.text = this.health.toString();
        }
    };
    Box.prototype.SetHide = function (hide, froce) {
        if (this.hideCDTime <= 0 || froce == true) {
            this.hideCDTime = BoxHitHideCDTime;
            this.isHide = hide;
            var alpha = this.isHide ? 0 : 1;
            if (this.boxDisplayObj != undefined
                && this.boxDisplayObj != null) {
                this.boxDisplayObj.alpha = alpha;
            }
            if (this.healthDisplayObj != undefined
                && this.healthDisplayObj != null) {
                this.healthDisplayObj.alpha = alpha;
            }
        }
    };
    Box.prototype.Pause = function (pauseTime, pauseEffect) {
        this.SetPause(true);
        this.pauseLeftTime = pauseTime;
        Tools.DetachDisplayObjFromParent(this.pauseEffect);
        this.pauseEffect = pauseEffect;
    };
    Box.prototype.SetPause = function (pause) {
        this.pause = pause;
        if (this.moveSpeed > 0
            && this.phyBody != null) {
            if (pause) {
                this.phyBody.velocity = [0, 0];
            }
            else {
                var moveDir = new egret.Point(this.targetPos.x - this.initPos.x, this.targetPos.y - this.initPos.y);
                moveDir.normalize(this.moveSpeed);
                this.phyBody.velocity = [moveDir.x, moveDir.y];
            }
        }
    };
    return Box;
}());
__reflect(Box.prototype, "Box");
//# sourceMappingURL=Box.js.map