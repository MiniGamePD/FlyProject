var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BoxType;
(function (BoxType) {
    BoxType[BoxType["None"] = 0] = "None";
    BoxType[BoxType["Square"] = 1] = "Square";
    BoxType[BoxType["Triangle"] = 2] = "Triangle";
    BoxType[BoxType["Circle"] = 3] = "Circle";
    BoxType[BoxType["SixMulDir"] = 4] = "SixMulDir";
    BoxType[BoxType["FireUp"] = 5] = "FireUp";
    BoxType[BoxType["LevelUp"] = 6] = "LevelUp";
    BoxType[BoxType["GoldCoin"] = 7] = "GoldCoin";
    BoxType[BoxType["Pause"] = 8] = "Pause";
})(BoxType || (BoxType = {}));
var BoxEmitter = (function () {
    function BoxEmitter() {
        this.boxList = [];
        this.instanceId = 0;
        this.hitSoundCdTime = 0;
        this.boxPauseLeftTime = 0;
    }
    BoxEmitter.prototype.Init = function (ballGameWorld, battleGround, ballDataMgr, matchView) {
        this.resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        this.soundModule = GameMain.GetInstance().GetModule(ModuleType.SOUND);
        this.matchView = matchView;
        this.ballDataMgr = ballDataMgr;
        this.ballGameWorld = ballGameWorld;
        this.battleGround = battleGround;
        this.center = this.ballGameWorld.center;
        this.boxList = [];
        this.instanceId = 0;
        this.ballGameWorld.world.on("beginContact", this.OnBeginContact, this);
        this.boxCreateStrategy = new BoxCreateStrategy();
        this.boxCreateStrategy.Init(this);
        this.hitBoxEvent = new HitBoxEvent();
        this.boxEliminateEvent = new BoxEliminateEvent();
        this.hitSoundArray = [];
        this.hitSoundChannelArray = [];
        if (this.soundModule.SoundHitBoxResReady()) {
            for (var i = 1; i <= 20; ++i) {
                var sound = this.resModule.GetRes("hitBox_" + i + "_mp3");
                this.hitSoundArray.push(sound);
                this.hitSoundChannelArray.push(null);
            }
        }
        this.RegisterEvent();
    };
    BoxEmitter.prototype.RegisterEvent = function () {
        GameMain.GetInstance().AddEventListener(SpecialBoxEliminateEvent.EventName, this.OnSpecialBoxEliminateEvent, this);
        GameMain.GetInstance().AddEventListener(ReviveEvent.EventName, this.OnReviveEvent, this);
    };
    BoxEmitter.prototype.UnRegisterEvent = function () {
        GameMain.GetInstance().RemoveEventListener(SpecialBoxEliminateEvent.EventName, this.OnSpecialBoxEliminateEvent, this);
        GameMain.GetInstance().RemoveEventListener(ReviveEvent.EventName, this.OnReviveEvent, this);
    };
    BoxEmitter.prototype.OnSpecialBoxEliminateEvent = function (evt) {
        if (evt != null) {
            if (evt.boxType == BoxType.Pause
                && this.boxPauseLeftTime <= 0) {
                this.boxPauseLeftTime = this.ballDataMgr.ballConfig.Box_Effect_Pause_Time;
                for (var i = 0; i < this.boxList.length; ++i) {
                    if (this.boxList[i] != null) {
                        this.boxList[i].Pause(this.boxPauseLeftTime);
                    }
                }
            }
        }
    };
    BoxEmitter.prototype.OnReviveEvent = function (evt) {
        if (evt != null) {
            if (this.gameOverBox != undefined
                && this.gameOverBox != null) {
                Tools.DetachDisplayObjFromParent(this.gameOverBox.boxDisplayObj);
                Tools.DetachDisplayObjFromParent(this.gameOverBox.healthDisplayObj);
                this.gameOverBox = null;
            }
            this.ClearAllBox();
        }
    };
    BoxEmitter.prototype.ClearAllBox = function () {
        for (var i = 0; i < this.boxList.length; ++i) {
            if (this.boxList[i] != null) {
                var deleteResult = this.DeleteBox(this.boxList[i], true);
                if (deleteResult) {
                    --i;
                }
            }
        }
    };
    BoxEmitter.prototype.Update = function (deltaTime) {
        if (this.boxPauseLeftTime > 0) {
            this.boxPauseLeftTime -= deltaTime;
        }
        if (this.hitSoundCdTime > 0) {
            this.hitSoundCdTime -= deltaTime;
        }
        this.boxCreateStrategy.Update(deltaTime);
        for (var i = 0; i < this.boxList.length; ++i) {
            if (this.boxList[i] != null) {
                this.boxList[i].Update(deltaTime);
            }
        }
        this.CheckBoxOverlay();
        this.CheckGameOver();
    };
    BoxEmitter.prototype.EmitBox = function (randomBoxType, birthPos, health) {
        ++this.instanceId;
        var id = this.instanceId;
        var box;
        if (randomBoxType == BoxType.Square) {
            box = new SquareBox(id, new egret.Point(birthPos.x, birthPos.y), this.center, health, 80);
        }
        else if (randomBoxType == BoxType.Circle) {
            box = new CircleBox(id, new egret.Point(birthPos.x, birthPos.y), this.center, health, 40);
        }
        else if (randomBoxType == BoxType.Triangle) {
            box = new TriangleBox(id, new egret.Point(birthPos.x, birthPos.y), this.center, health, 80);
        }
        else if (randomBoxType == BoxType.SixMulDir) {
            box = new SixMulDirBox(id, new egret.Point(birthPos.x, birthPos.y), this.center, health, 40);
        }
        else if (randomBoxType == BoxType.FireUp) {
            box = new FireUpBox(id, new egret.Point(birthPos.x, birthPos.y), this.center, health, 40);
        }
        else if (randomBoxType == BoxType.LevelUp) {
            box = new LevelUpBox(id, new egret.Point(birthPos.x, birthPos.y), this.center, health, 40);
        }
        else if (randomBoxType == BoxType.GoldCoin) {
            box = new GoldCoinBox(id, new egret.Point(birthPos.x, birthPos.y), this.center, health, 40);
        }
        else if (randomBoxType == BoxType.Pause) {
            box = new PauseBox(id, new egret.Point(birthPos.x, birthPos.y), this.center, health, 40);
        }
        if (this.boxPauseLeftTime > 0) {
            box.Pause(this.boxPauseLeftTime);
        }
        this.battleGround.addChild(box.boxDisplayObj);
        this.battleGround.addChild(box.healthDisplayObj);
        this.ballGameWorld.world.addBody(box.phyBody);
        this.boxList.push(box);
    };
    BoxEmitter.prototype.GetBoxById = function (id) {
        for (var i = 0; i < this.boxList.length; ++i) {
            if (this.boxList[i] != null
                && this.boxList[i].id == id) {
                return this.boxList[i];
            }
        }
        return null;
    };
    BoxEmitter.prototype.PlayHitSound = function () {
        if (this.soundModule.SoundHitBoxResReady() && this.hitSoundCdTime <= 0) {
            this.hitSoundCdTime = BoxHitSoundCDTime;
            platform.vibrateShort();
            // var availableIndex = -1;
            // for (var i = 0; i < this.hitSoundChannelArray.length; ++i)
            // {
            // 	if (this.hitSoundChannelArray[i] == null)
            // 	{
            // 		availableIndex = i;
            // 		break;
            // 	}
            // }
            // if (availableIndex >= 0)
            // {
            // 	var channel = this.hitSoundArray[availableIndex].play(0, 1);
            // 	this.hitSoundChannelArray[availableIndex] = channel;
            // 	channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onHitSoundComplete, this);
            // 	channel.volume = 0.5;
            // }
            // else
            // {
            // 	if (DEBUG)
            // 	{
            // 		console.log("No Available Hit Sound");
            // 	}
            // }
            // var soundChannel = this.soundModule.PlaySound("hitBox_mp3", 1);
            // // var soundChannel = this.soundModule.PlaySound("PillRotation_mp3", 1);
            // if (soundChannel != null)
            // {
            // 	//soundChannel.volume = 0.5;
            // }
        }
    };
    BoxEmitter.prototype.onHitSoundComplete = function (event) {
        var channel = event.target;
        var index = this.hitSoundChannelArray.indexOf(channel);
        this.hitSoundChannelArray[index] = null;
        //console.log("onSoundComplete " + index);
    };
    BoxEmitter.prototype.OnHitBox = function (box, ballPhyBody) {
        if (box != null
            && box != undefined) {
            this.hitBoxEvent.box = box;
            this.hitBoxEvent.ballPhyBody = ballPhyBody;
            GameMain.GetInstance().DispatchEvent(this.hitBoxEvent);
            this.PlayHitSound();
            if (this.ballDataMgr.IsTriggerSkill_BoomOnHit()) {
                this.BoomDamageOnHit(ballPhyBody, this.ballDataMgr.ballConfig.skill_BoomOnHit_Range, this.ballDataMgr.ballConfig.skill_BoomOnHit_Damage);
            }
            else if (this.ballDataMgr.IsTriggerSkill_CriticalStrike()) {
                this.ApplyCriticalStrike(box, this.ballDataMgr.ballConfig.skill_CriticalStrike_Damage, ballPhyBody);
            }
            else {
                this.ApplyDamageOnBox(box, 1, ballPhyBody);
            }
            if (box.health > 0
                && !box.pause
                && this.ballDataMgr.IsTriggerSkill_PauseBoxOnHit()
                && (box.GetBoxType() == BoxType.Square || box.GetBoxType() == BoxType.Triangle)) {
                var pauseTime = this.ballDataMgr.ballConfig.skill_PauseBoxOnHit_Time * 1000;
                var pauseEffect = this.resModule.CreateBitmapByName("Ball_BaBa");
                pauseEffect.width = 50;
                pauseEffect.height = 50;
                Tools.SetAnchor(pauseEffect, AnchorType.Center);
                pauseEffect.x = box.GetCenterPos().x;
                pauseEffect.y = box.GetCenterPos().y;
                this.battleGround.addChildAt(pauseEffect, 3);
                var scaleParam = new PaScalingParam();
                scaleParam.displayObj = pauseEffect;
                scaleParam.targetScaleX = 0.7;
                scaleParam.targetScaleY = 0.7;
                scaleParam.duration = pauseTime;
                scaleParam.interval = 100;
                scaleParam.reverse = true;
                scaleParam.needRemoveOnFinish = true;
                var scaleEvent = new PlayProgramAnimationEvent();
                scaleEvent.param = scaleParam;
                GameMain.GetInstance().DispatchEvent(scaleEvent);
                box.Pause(pauseTime, pauseEffect);
            }
        }
    };
    BoxEmitter.prototype.ApplyDamageOnBox = function (box, damage, ballPhyBody) {
        var healthChanged = box.changeHealth(-damage);
        this.matchView.OnApplyDamageOnBox(box, healthChanged);
        if (box.health <= 0) {
            this.boxEliminateEvent.boxType = box.GetBoxType();
            this.boxEliminateEvent.box = box;
            this.boxEliminateEvent.ballPhyBody = ballPhyBody;
            GameMain.GetInstance().DispatchEvent(this.boxEliminateEvent);
            box.OnEliminate();
            this.DeleteBox(box, true);
        }
    };
    // 暴击伤害
    BoxEmitter.prototype.ApplyCriticalStrike = function (box, damage, ballPhyBody) {
        this.ApplyDamageOnBox(box, damage, ballPhyBody);
        Tools.ShowTips(box.healthDisplayObj.x, box.healthDisplayObj.y + 20, this.battleGround, "-" + damage, 0xd6340a);
        var param = new PaPlayParticalParam;
        param.textureName = "Blade";
        param.jsonName = "Ball_Blade";
        param.duration = 1000;
        param.emitDuration = 100;
        param.posX = box.healthDisplayObj.x;
        param.posY = box.healthDisplayObj.y;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    // 爆炸伤害周围的盒子
    BoxEmitter.prototype.BoomDamageOnHit = function (ballPhyBody, range, damage) {
        if (ballPhyBody != null) {
            var posx = ballPhyBody.position[0];
            var posy = ballPhyBody.position[1];
            this.BoomDamagePartical(posx, posy, range);
            var point = new egret.Point();
            for (var i = 0; i < this.boxList.length; ++i) {
                if (this.boxList[i] != null) {
                    point.x = posx - this.boxList[i].boxDisplayObj.x;
                    point.y = posy - this.boxList[i].boxDisplayObj.y;
                    var dis = point.length;
                    if (dis <= range) {
                        Tools.ShowTips(this.boxList[i].healthDisplayObj.x, this.boxList[i].healthDisplayObj.y + 20, this.battleGround, "-" + damage, 0xd6340a);
                        this.ApplyDamageOnBox(this.boxList[i], damage, ballPhyBody);
                    }
                }
            }
        }
    };
    BoxEmitter.prototype.BoomDamagePartical = function (posx, posy, range) {
        var color = 0xd6340a;
        var shape = new egret.Shape();
        shape.graphics.lineStyle(4, color, 0.8);
        shape.graphics.beginFill(color, 0.4);
        shape.graphics.drawCircle(0, 0, range - 30);
        shape.graphics.endFill();
        shape.x = posx;
        shape.y = posy;
        this.battleGround.addChildAt(shape, 3);
        var scaleTime = 350; // 放大时长
        var alphaTime = 500; // 放大后，淡出的时长
        shape.scaleX = 0;
        shape.scaleY = 0;
        var scaleParam = new PaScalingParam();
        scaleParam.displayObj = shape;
        scaleParam.targetScaleX = 1;
        scaleParam.targetScaleY = 1;
        scaleParam.duration = scaleTime;
        scaleParam.interval = scaleTime;
        scaleParam.reverse = true;
        var scaleEvent = new PlayProgramAnimationEvent();
        scaleEvent.param = scaleParam;
        GameMain.GetInstance().DispatchEvent(scaleEvent);
        var alphaParam = new PaAlphaLoopParam();
        alphaParam.displayObj = shape;
        alphaParam.duration = alphaTime;
        alphaParam.interval = alphaTime;
        alphaParam.startAlpha = shape.alpha;
        alphaParam.endAlpha = 0;
        alphaParam.delayTime = scaleTime;
        alphaParam.needRemoveOnFinish = true;
        var alphaEvent = new PlayProgramAnimationEvent();
        alphaEvent.param = alphaParam;
        GameMain.GetInstance().DispatchEvent(alphaEvent);
        // var param = new PaPlayParticalParam;
        // param.textureName = "boom";
        // param.jsonName = "Ball_Boom";
        // param.duration = 1000;
        // param.emitDuration = 100;
        // param.posX = posx;
        // param.posY = posy;
        // var event = new PlayProgramAnimationEvent();
        // event.param = param;
        // GameMain.GetInstance().DispatchEvent(event);
    };
    BoxEmitter.prototype.DeleteBox = function (box, detachDisplay) {
        if (box != null
            && box != undefined) {
            var idx = this.boxList.indexOf(box);
            if (idx >= 0) {
                if (detachDisplay) {
                    Tools.DetachDisplayObjFromParent(box.boxDisplayObj);
                    Tools.DetachDisplayObjFromParent(box.healthDisplayObj);
                }
                if (box.phyBody != null) {
                    this.ballGameWorld.world.removeBody(box.phyBody);
                }
                this.boxList.splice(idx, 1);
                return true;
            }
        }
        return false;
    };
    BoxEmitter.prototype.CheckGameOver = function () {
        for (var i = 0; i < this.boxList.length; ++i) {
            var boxA = this.boxList[i];
            if (boxA.GetBoxType() == BoxType.Square
                || boxA.GetBoxType() == BoxType.Triangle
                || boxA.GetBoxType() == BoxType.Circle) {
                var centerSizeScale = (boxA.GetBoxType() == BoxType.Triangle) ? 0.5 : 1;
                var deltaX = Math.abs(boxA.boxDisplayObj.x - this.center.x);
                var deltaY = Math.abs(boxA.boxDisplayObj.y - this.center.y);
                if (deltaX < GameOverCenterSize.x * centerSizeScale && deltaY < GameOverCenterSize.y * centerSizeScale) {
                    boxA.SetHide(false, true);
                    var moveParam = new PaAccMovingParam();
                    moveParam.displayObj = boxA.boxDisplayObj;
                    moveParam.attachDisplayObj = [boxA.healthDisplayObj];
                    moveParam.startSpeed = 500;
                    moveParam.accelerate = 500;
                    moveParam.targetPos = new egret.Point(this.center.x, this.center.y);
                    // moveParam.needRemoveOnFinish = true;
                    var moveEvent = new PlayProgramAnimationEvent();
                    moveEvent.param = moveParam;
                    GameMain.GetInstance().DispatchEvent(moveEvent);
                    var scaleParam = new PaScalingParam();
                    scaleParam.displayObj = boxA.boxDisplayObj;
                    scaleParam.targetScaleX = 1.2 * (boxA.boxDisplayObj.scaleX > 0 ? 1 : -1);
                    scaleParam.targetScaleY = 1.2 * (boxA.boxDisplayObj.scaleY > 0 ? 1 : -1);
                    scaleParam.duration = 2000;
                    scaleParam.interval = 200;
                    scaleParam.reverse = true;
                    var scaleEvent = new PlayProgramAnimationEvent();
                    scaleEvent.param = scaleParam;
                    GameMain.GetInstance().DispatchEvent(scaleEvent);
                    this.gameOverBox = boxA;
                    this.DeleteBox(boxA, false);
                    var event_1 = new GameOverEvent();
                    GameMain.GetInstance().DispatchEvent(event_1);
                }
            }
        }
    };
    BoxEmitter.prototype.CheckBoxOverlay = function () {
        for (var i = 0; i < this.boxList.length; ++i) {
            for (var j = i + 1; j < this.boxList.length; ++j) {
                var boxA = this.boxList[i];
                var boxB = this.boxList[j];
                if (boxA.canMerge && boxB.canMerge) {
                    var deltaX = Math.abs(boxA.boxDisplayObj.x - boxB.boxDisplayObj.x);
                    var deltaY = Math.abs(boxA.boxDisplayObj.y - boxB.boxDisplayObj.y);
                    if ((deltaX < boxA.boxSize.x || deltaX < boxB.boxSize.x)
                        && (deltaY < boxA.boxSize.y || deltaY < boxB.boxSize.y)) {
                        this.MergeBox(boxA, boxB);
                    }
                }
            }
        }
    };
    BoxEmitter.prototype.MergeBox = function (boxA, boxB) {
        if (boxA != null
            && boxB != null) {
            var disA = this.center.subtract(new egret.Point(boxA.boxDisplayObj.x, boxA.boxDisplayObj.y)).length;
            var disB = this.center.subtract(new egret.Point(boxB.boxDisplayObj.x, boxB.boxDisplayObj.y)).length;
            var nearBox = disA < disB ? boxA : boxB;
            var farBox = disA < disB ? boxB : boxA;
            farBox.changeHealth(nearBox.health);
            var moveParam = new PaAccMovingParam();
            moveParam.displayObj = nearBox.boxDisplayObj;
            moveParam.attachDisplayObj = [nearBox.healthDisplayObj];
            moveParam.startSpeed = 500;
            moveParam.accelerate = 500;
            moveParam.targetPos = new egret.Point(farBox.boxDisplayObj.x, farBox.boxDisplayObj.y);
            moveParam.needRemoveOnFinish = true;
            var moveEvent = new PlayProgramAnimationEvent();
            moveEvent.param = moveParam;
            GameMain.GetInstance().DispatchEvent(moveEvent);
            var scaleParam = new PaScalingParam();
            scaleParam.displayObj = nearBox.boxDisplayObj;
            scaleParam.targetScaleX = 0;
            scaleParam.targetScaleY = 0;
            scaleParam.duration = 200;
            scaleParam.interval = 200;
            var scaleEvent = new PlayProgramAnimationEvent();
            scaleEvent.param = scaleParam;
            GameMain.GetInstance().DispatchEvent(scaleEvent);
            Tools.DetachDisplayObjFromParent(nearBox.pauseEffect);
            this.DeleteBox(nearBox, false);
        }
    };
    BoxEmitter.prototype.OnBeginContact = function (event) {
        var shapeA = event.shapeA;
        var shapeB = event.shapeB;
        var bodyA = event.bodyA;
        var bodyB = event.bodyB;
        if (shapeA != null
            && shapeB != null) {
            if (shapeA.collisionGroup == Collision_Layer_Box
                && shapeB.collisionGroup == Collision_Layer_Ball) {
                var box = this.GetBoxById(shapeA.id);
                this.OnHitBox(box, bodyB);
            }
            if (shapeA.collisionGroup == Collision_Layer_Ball
                && shapeB.collisionGroup == Collision_Layer_Box) {
                var box = this.GetBoxById(shapeB.id);
                this.OnHitBox(box, bodyA);
            }
            // if (shapeA.collisionGroup == Collision_Layer_Box
            // 	&& shapeB.collisionGroup == Collision_Layer_Box)
            // {
            // 	var boxA = this.GetBoxById(shapeA.id);
            // 	var boxB = this.GetBoxById(shapeB.id);
            // 	this.MergeBox(boxA, boxB);
            // }
        }
    };
    BoxEmitter.prototype.Release = function () {
        this.UnRegisterEvent();
    };
    return BoxEmitter;
}());
__reflect(BoxEmitter.prototype, "BoxEmitter");
//# sourceMappingURL=BoxEmitter.js.map