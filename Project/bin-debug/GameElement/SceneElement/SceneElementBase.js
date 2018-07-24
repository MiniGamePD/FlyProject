var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//在scene中占一个格子的元素，处理显示相关，和一些与消除相关逻辑，并转发gameplay的逻辑给到GameplayElement层
var SceneElementBase = (function () {
    function SceneElementBase(owner) {
        this.posx = 0;
        this.posy = 0;
        this.canDrop = true;
        this.owner = owner;
        this.bindedElements = [];
        this.eliminateDelay = 0;
        this.isInFever = false;
        if (this.resModule == null) {
            this.resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        }
    }
    SceneElementBase.prototype.Adapte = function (width, height) {
        this.renderer.width = width;
        this.renderer.height = height;
        this.renderer.anchorOffsetX = Tools.MatchViewElementWidth / 2;
        this.renderer.anchorOffsetY = Tools.MatchViewElementHeight / 2;
    };
    SceneElementBase.prototype.ElementType = function () {
        return this.elementType;
    };
    SceneElementBase.prototype.MoveTo = function (posx, posy) {
        if (this.posx != posx
            || this.posy != posy) {
            this.posx = posx;
            this.posy = posy;
            this.dirty = true;
        }
    };
    SceneElementBase.prototype.Move = function (posx, posy) {
        this.posx += posx;
        this.posy += posy;
        this.dirty = true;
    };
    SceneElementBase.prototype.RandomColor = function () {
        return GameElementColorGenerator.RandomColor();
    };
    SceneElementBase.prototype.RefreshTexture = function () {
        var texture;
        var path = this.GetResPathByColor();
        texture = this.GetTexture(path);
        var bitMap = this.renderer;
        if (bitMap != null) {
            bitMap.texture = texture;
        }
    };
    SceneElementBase.prototype.SetRenderPos = function (x, y) {
        if (this.renderer != null && this.renderer != undefined) {
            this.renderer.x = x;
            this.renderer.y = y;
        }
        if (this.accessory != null && this.accessory != undefined) {
            this.accessory.x = x;
            this.accessory.y = y;
        }
        if (this.accessoryBg != null && this.accessoryBg != undefined) {
            this.accessoryBg.x = x;
            this.accessoryBg.y = y;
        }
    };
    SceneElementBase.prototype.Update = function (deltaTime) {
        if (!this.HasShield()) {
            this.UpdateFramesAnim();
        }
    };
    SceneElementBase.prototype.UpdateFramesAnim = function () {
        if (this.framesAnim != null
            && this.framesAnim != undefined) {
            this.framesAnim.Update();
        }
    };
    SceneElementBase.prototype.GetTexture = function (path) {
        return this.resModule.GetRes(path);
    };
    // 返回捆绑元素的列表
    SceneElementBase.prototype.GetBindElements = function () {
        return this.bindedElements;
    };
    // 和某个元素绑定（双向）
    SceneElementBase.prototype.BindElement = function (element) {
        if (element != null) {
            var index = this.bindedElements.indexOf(element);
            if (index < 0) {
                this.bindedElements.push(element);
                element.BindElement(this);
                return true;
            }
        }
        return false;
    };
    // 和某个元素解除绑定（双向）
    SceneElementBase.prototype.UnbindElement = function (element) {
        if (element != null) {
            var index = this.bindedElements.indexOf(element);
            if (index >= 0) {
                this.bindedElements.splice(index, 1);
                element.UnbindElement(this);
                return true;
            }
        }
        return false;
    };
    // 和所有元素绑定（双向）    
    SceneElementBase.prototype.UnbindAllElement = function () {
        for (var index = this.bindedElements.length - 1; index >= 0; --index) {
            var element = this.bindedElements[index];
            if (element != null) {
                element.UnbindElement(this);
            }
        }
        this.bindedElements = [];
    };
    //处理一个scene element被消除之后的逻辑，返回true来让scene继续进入消除检测
    SceneElementBase.prototype.OnEliminate = function () {
        return this.owner.OnEliminate();
    };
    SceneElementBase.prototype.BlockWidth = function () {
        return this.owner.blockWidth;
    };
    SceneElementBase.prototype.BlockHeight = function () {
        return this.owner.blockHeight;
    };
    SceneElementBase.prototype.IsOwnerAlive = function () {
        return this.owner.IsAlive();
    };
    SceneElementBase.prototype.HasShield = function () {
        return this.owner.HasShield();
    };
    SceneElementBase.prototype.AddShield = function (shield) {
        this.owner.AddShield(shield);
    };
    SceneElementBase.prototype.PlayEliminateAnim = function () {
        this.PlayBoomEffect();
        this.PlayScaling();
        this.PlayEliminateSound();
    };
    SceneElementBase.prototype.PlayEliminateSound = function () {
        if (this.eliminateSound != null
            && this.eliminateSound != undefined
            && this.eliminateSound != "") {
            var playSoundEvent = new PlaySoundEvent(this.eliminateSound, 1);
            GameMain.GetInstance().DispatchEvent(playSoundEvent);
        }
    };
    SceneElementBase.prototype.PlayParticalEff = function () {
        var param = new PaPlayParticalParam;
        param.textureName = "Particle_Boom_Red";
        param.jsonName = "Particle_Boom";
        param.duration = 1000;
        param.emitDuration = 100;
        param.posX = Tools.ElementPosToGameStagePosX(this.posx);
        param.posY = Tools.ElementPosToGameStagePosY(this.posy);
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    SceneElementBase.prototype.PlayCrossEliminaterEffect = function (dir) {
        var startX = Tools.ElementPosToGameStagePosX(this.posx);
        var startY = Tools.ElementPosToGameStagePosY(this.posy);
        var param = new PaPlayCrossEliminaterEffectParam;
        param.pos = new egret.Point(startX, startY);
        param.direction = dir;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    SceneElementBase.prototype.PlayScaling = function () {
        var param = new PaScalingParam;
        param.displayObj = this.renderer;
        param.duration = 100;
        param.targetScaleX = 0;
        param.targetScaleY = 0;
        var event = new PlayProgramAnimationEvent();
        event.param = param;
        GameMain.GetInstance().DispatchEvent(event);
    };
    SceneElementBase.prototype.PlayBoomEffect = function () {
        var playEffectParam = new PaPlayFramesAnimParam();
        playEffectParam.pos = new egret.Point(Tools.ElementPosToGameStagePosX(this.posx), Tools.ElementPosToGameStagePosY(this.posy));
        playEffectParam.textNameSeq = Frame_Anim_Pill_Boom_Effect;
        playEffectParam.interval = 100;
        playEffectParam.times = 1;
        playEffectParam.scale = new egret.Point(2, 2);
        var event = new PlayProgramAnimationEvent();
        event.param = playEffectParam;
        GameMain.GetInstance().DispatchEvent(event);
    };
    SceneElementBase.prototype.MoveOneSide = function (dir) {
        var startX = Tools.ElementPosToGameStagePosX(this.posx);
        var startY = Tools.ElementPosToGameStagePosY(this.posy);
        var particleOffset = -100;
        var targetOffset = Math.max(GameMain.GetInstance().GetStageHeight(), GameMain.GetInstance().GetStageWidth());
        var particalParam = new PaMoveParticalParam;
        particalParam.textureName = "huojian";
        particalParam.jsonName = "huojian";
        particalParam.duration = 1000;
        particalParam.flyDuration = 1000;
        particalParam.stayDuration = 0;
        particalParam.stratPosX = Tools.MoveScenePosX(startX, dir, particleOffset);
        particalParam.stratPosY = Tools.MoveScenePosY(startY, dir, particleOffset);
        particalParam.endPosX = Tools.MoveScenePosX(startX, dir, targetOffset + particleOffset);
        particalParam.endPosY = Tools.MoveScenePosY(startY, dir, targetOffset + particleOffset);
        particalParam.isMoveEmitter = true;
        var event = new PlayProgramAnimationEvent();
        event.param = particalParam;
        GameMain.GetInstance().DispatchEvent(event);
        var headPic = this.resModule.CreateBitmapByName("huojian1");
        headPic.anchorOffsetX = headPic.width / 2;
        headPic.anchorOffsetY = headPic.height / 2;
        headPic.x = startX;
        headPic.y = startY;
        GameMain.GetInstance().AdapteDisplayObjectScale(headPic);
        GameMain.GetInstance().GetAdaptedStageContainer().addChild(headPic);
        var movingParam = new PaMovingParam;
        movingParam.displayObj = headPic;
        movingParam.duration = 1000;
        movingParam.targetPosX = Tools.MoveScenePosX(startX, dir, targetOffset);
        movingParam.targetPosY = Tools.MoveScenePosY(startY, dir, targetOffset);
        movingParam.needRotate = true;
        movingParam.needRemoveOnFinish = true;
        var event = new PlayProgramAnimationEvent();
        event.param = movingParam;
        GameMain.GetInstance().DispatchEvent(event);
    };
    SceneElementBase.prototype.GetPreView = function () {
        var resPath = this.GetResPathByColor();
        if (resPath != null) {
            var res = GameMain.GetInstance().GetModule(ModuleType.RES);
            var preview = res.CreateBitmapByName(resPath);
            preview.width = Tools.MatchViewElementWidth;
            preview.height = Tools.MatchViewElementHeight;
            preview.anchorOffsetX = Tools.MatchViewElementWidth / 2;
            preview.anchorOffsetY = Tools.MatchViewElementHeight / 2;
            return preview;
        }
        return null;
    };
    SceneElementBase.prototype.PlayShieldCreateAnim = function () {
        if (this.bubbleShield == undefined
            || this.bubbleShield == null) {
            var res = GameMain.GetInstance().GetModule(ModuleType.RES);
            this.bubbleShield = res.CreateBitmapByName("pd_res_json.Shield");
            this.bubbleShield.width = Tools.MatchViewElementWidth;
            this.bubbleShield.height = Tools.MatchViewElementHeight;
            this.bubbleShield.anchorOffsetX = Tools.MatchViewElementWidth / 2;
            this.bubbleShield.anchorOffsetY = Tools.MatchViewElementHeight / 2;
            this.accessory.addChild(this.bubbleShield);
        }
    };
    SceneElementBase.prototype.PlayShieldBreakAnim = function () {
        if (this.bubbleShield != undefined
            && this.bubbleShield != null) {
            var particalParam = new PaPlayParticalParam();
            particalParam.textureName = "ice_Boom";
            particalParam.jsonName = "ice_Boom";
            particalParam.duration = 2000;
            particalParam.emitDuration = 100;
            particalParam.posX = Tools.ElementPosToGameStagePosX(this.posx);
            particalParam.posY = Tools.ElementPosToGameStagePosY(this.posy);
            var event = new PlayProgramAnimationEvent();
            event.param = particalParam;
            GameMain.GetInstance().DispatchEvent(event);
            this.accessory.removeChild(this.bubbleShield);
            this.bubbleShield = null;
        }
        this.PlayEliminateSound();
    };
    SceneElementBase.prototype.SetFeverState = function (isFever) {
        this.isInFever = isFever;
    };
    SceneElementBase.prototype.IsInFeverState = function () {
        return this.isInFever;
    };
    SceneElementBase.prototype.Release = function () {
        if (this.renderer != null
            && this.renderer != undefined
            && this.renderer.parent != null) {
            this.renderer.parent.removeChild(this.renderer);
        }
        this.renderer = null;
        if (this.accessory != undefined
            && this.accessory != null
            && this.accessory.parent != null) {
            this.accessory.parent.removeChild(this.accessory);
        }
        this.accessory = null;
        if (this.accessoryBg != undefined
            && this.accessoryBg != null
            && this.accessoryBg.parent != null) {
            this.accessoryBg.parent.removeChild(this.accessoryBg);
        }
        this.accessoryBg = null;
    };
    return SceneElementBase;
}());
__reflect(SceneElementBase.prototype, "SceneElementBase");
var GameElementColor;
(function (GameElementColor) {
    GameElementColor[GameElementColor["red"] = 0] = "red";
    GameElementColor[GameElementColor["blue"] = 1] = "blue";
    GameElementColor[GameElementColor["yellow"] = 2] = "yellow";
    GameElementColor[GameElementColor["random"] = 3] = "random";
})(GameElementColor || (GameElementColor = {}));
var GameElementColorGenerator = (function () {
    function GameElementColorGenerator() {
    }
    GameElementColorGenerator.RandomColor = function (iDontWantThatDolor) {
        var result = undefined;
        do {
            var random = Math.floor(Math.random() * 3);
            if (random == 0) {
                result = GameElementColor.red;
            }
            else if (random == 1) {
                result = GameElementColor.blue;
            }
            else {
                result = GameElementColor.yellow;
            }
        } while (iDontWantThatDolor != undefined && result == iDontWantThatDolor);
        return result;
    };
    GameElementColorGenerator.prototype.PlayEliminateAnim = function () {
    };
    return GameElementColorGenerator;
}());
__reflect(GameElementColorGenerator.prototype, "GameElementColorGenerator");
var SceneElementType;
(function (SceneElementType) {
    SceneElementType[SceneElementType["None"] = 0] = "None";
    SceneElementType[SceneElementType["Pill"] = 1] = "Pill";
    SceneElementType[SceneElementType["Virus"] = 2] = "Virus";
    SceneElementType[SceneElementType["Vitamins"] = 3] = "Vitamins";
    SceneElementType[SceneElementType["ColunmEliminater"] = 4] = "ColunmEliminater";
    SceneElementType[SceneElementType["RowEliminater"] = 5] = "RowEliminater";
    SceneElementType[SceneElementType["CrossEliminater"] = 6] = "CrossEliminater";
    SceneElementType[SceneElementType["PlaceHolder"] = 7] = "PlaceHolder";
    SceneElementType[SceneElementType["Boom"] = 8] = "Boom";
    SceneElementType[SceneElementType["Empty"] = 9] = "Empty";
})(SceneElementType || (SceneElementType = {}));
//# sourceMappingURL=SceneElementBase.js.map