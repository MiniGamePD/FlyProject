var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Ball = (function () {
    function Ball(resModule) {
        this.resModule = resModule;
    }
    Ball.prototype.Init = function (id, emitPos, emitDir, emitSpeed, ballMass, ballRadius, ballTextureName, canSplit, displayScale) {
        this.id = id;
        this.emitPos = emitPos;
        this.emitDir = emitDir;
        this.emitSpeed = emitSpeed;
        this.ballMass = ballMass;
        this.ballRadius = ballRadius;
        this.ballTextureName = ballTextureName;
        this.canSplitOnHit = canSplit;
        this.displayScale = displayScale;
        emitDir.normalize(emitSpeed);
        this.phyShape = new p2.Circle({ id: id, radius: this.ballRadius });
        this.phyShape.collisionGroup = Collision_Layer_Ball;
        this.phyShape.collisionMask = Collision_Layer_Box;
        this.ballDisplay = this.resModule.CreateBitmapByName(ballTextureName);
        this.ballDisplay.width = this.ballRadius * 2 * this.displayScale;
        this.ballDisplay.height = this.ballRadius * 2 * this.displayScale;
        this.ballDisplay.x = emitPos.x;
        this.ballDisplay.y = emitPos.y;
        this.ballDisplay.anchorOffsetX = this.ballDisplay.width / 2;
        this.ballDisplay.anchorOffsetY = this.ballDisplay.height / 2;
        this.phyBody = new p2.Body({
            id: id,
            mass: this.ballMass,
            position: [emitPos.x, emitPos.y],
            velocity: [emitDir.x, emitDir.y]
        });
        this.phyBody.addShape(this.phyShape);
        this.phyBody.displays = [this.ballDisplay];
    };
    Ball.prototype.ScaleBallRadius = function (scale, maxRadius) {
        var radius = this.ballRadius * scale;
        radius = Tools.Clamp(radius, 0.1, maxRadius);
        if (this.ballRadius != radius) {
            this.ballRadius = radius;
            this.phyShape.radius = this.ballRadius;
            this.ballDisplay.width = this.ballRadius * 2 * this.displayScale;
            this.ballDisplay.height = this.ballRadius * 2 * this.displayScale;
            this.ballDisplay.anchorOffsetX = this.ballDisplay.width / 2;
            this.ballDisplay.anchorOffsetY = this.ballDisplay.height / 2;
        }
    };
    return Ball;
}());
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Ball.js.map