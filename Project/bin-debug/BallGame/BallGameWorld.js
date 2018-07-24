var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BallGameWorld = (function () {
    function BallGameWorld() {
        this.factor = 1;
        this.enableDebugDraw = false;
    }
    BallGameWorld.prototype.Init = function () {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world.applyGravity = false;
        this.world.defaultContactMaterial.restitution = 1;
        // this.world.setGlobalStiffness(Number.MAX_VALUE);
        this.center = new egret.Point(GameMain.GetInstance().GetStageWidth() / 2, GameMain.GetInstance().GetStageHeight() / 2);
        if (this.enableDebugDraw) {
            this.debugDraw = new p2DebugDraw(this.world);
            this.createDebug();
        }
    };
    BallGameWorld.prototype.createDebug = function () {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
        var sprite = new egret.Sprite();
        GameMain.GetInstance().GetGameStage().addChild(sprite);
        this.debugDraw.setSprite(sprite);
        this.debugDraw.setLineWidth(0.02);
        sprite.scaleX = 1;
        sprite.scaleY = 1;
    };
    BallGameWorld.prototype.Update = function (deltaTime) {
        this.world.step(deltaTime * 0.001);
        this.SyncDisplayObj();
        if (this.enableDebugDraw && this.debugDraw != null) {
            this.debugDraw.drawDebug();
        }
    };
    BallGameWorld.prototype.SyncDisplayObj = function () {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        var l = this.world.bodies.length;
        for (var i = 0; i < l; i++) {
            var boxBody = this.world.bodies[i];
            for (var disId = 0; disId < boxBody.displays.length; ++disId) {
                var displayObj = boxBody.displays[disId];
                if (displayObj) {
                    displayObj.x = boxBody.position[0] * this.factor;
                    displayObj.y = boxBody.position[1] * this.factor;
                    displayObj.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
                    if (this.enableDebugDraw) {
                        // 如果是sleep状态，改变一下Alpha
                        if (boxBody.sleepState == p2.Body.SLEEPING) {
                            displayObj.alpha = 0.5;
                        }
                        else {
                            displayObj.alpha = 1;
                        }
                    }
                }
            }
        }
    };
    BallGameWorld.prototype.Release = function () {
        this.world.clear();
    };
    return BallGameWorld;
}());
__reflect(BallGameWorld.prototype, "BallGameWorld");
//# sourceMappingURL=BallGameWorld.js.map