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
var MatchView = (function (_super) {
    __extends(MatchView, _super);
    function MatchView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatchView.prototype.CreateView = function () {
        this.mResModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        this.mSoundModule = GameMain.GetInstance().GetModule(ModuleType.SOUND);
        this.LoadBackGround();
        this.CreateHUD();
        this.CreateFeverRibbonsParticleArray();
        // this.PlayBgm();
        this.bossSkillAnim = new BossSkillAnimation();
        this.bossSkillAnim.Init(this);
        this.eliminatingAnim = new EliminatingAnimation();
        this.eliminatingAnim.Init(this);
        this.dynamicBg = new MatchViewDynamicBg();
        this.dynamicBg.Init(this.mResModule, this);
        GameMain.GetInstance().AddEventListener(SceneElementControlSuccessEvent.EventName, this.ProcessControlSuccess, this);
        GameMain.GetInstance().AddEventListener(ReplayGameEvent.EventName, this.OnReplayGame, this);
        GameMain.GetInstance().AddEventListener(ReviveEvent.EventName, this.OnRevive, this);
        GameMain.GetInstance().AddEventListener(EnemyBornWarningEvent.EventName, this.OnEnemyBornWarningEvent, this);
        GameMain.GetInstance().AddEventListener(SceneElementMoveUpEvent.EventName, this.OnSceneElementMoveUpEvent, this);
        GameMain.GetInstance().AddEventListener(FeverEvent.EventName, this.OnFeverEvent, this);
    };
    MatchView.prototype.ReleaseView = function () {
        this.DeleteHUD();
        if (this.dynamicBg != null) {
            this.dynamicBg.Release();
        }
        this.removeChild(this.mAdaptedStage);
        GameMain.GetInstance().ClearAdaptedStageContainer();
        GameMain.GetInstance().RemoveEventListener(SceneElementControlSuccessEvent.EventName, this.ProcessControlSuccess, this);
        GameMain.GetInstance().RemoveEventListener(ReplayGameEvent.EventName, this.OnReplayGame, this);
        GameMain.GetInstance().RemoveEventListener(ReviveEvent.EventName, this.OnRevive, this);
        GameMain.GetInstance().RemoveEventListener(EnemyBornWarningEvent.EventName, this.OnEnemyBornWarningEvent, this);
        GameMain.GetInstance().RemoveEventListener(SceneElementMoveUpEvent.EventName, this.OnSceneElementMoveUpEvent, this);
        GameMain.GetInstance().RemoveEventListener(FeverEvent.EventName, this.OnFeverEvent, this);
    };
    MatchView.prototype.ResetView = function () {
        this.mBattleGround.removeChildren();
        this.mBattleGround.addChild(this.mBattleGroundBlocks);
        this.ReleaseEnemyBornWarningElements();
        this.mBattleGroundCoverEff.removeChildren();
        if (this.feverRibbonsArray != null && this.feverRibbonsArray != undefined) {
            for (var i = 0; i < this.feverRibbonsArray.length; ++i) {
                this.feverRibbonsArray[i].stop();
            }
        }
        this.hud.Reset();
    };
    MatchView.prototype.SetScene = function (scene) {
        this.mScene = scene;
    };
    MatchView.prototype.SetMatchScore = function (matchScore) {
        this.matchScore = matchScore;
    };
    MatchView.prototype.UpdateView = function (deltaTime) {
        if (this.mScene.bossSkillInfo.hasInfo) {
            this.UpdateBossSkill(deltaTime);
        }
        else if (this.mScene.eliminateInfo.HasInfo) {
            this.UpdateEliminating(deltaTime);
        }
        else {
            this.RefreshScene();
        }
        this.hud.Update(deltaTime);
        if (this.dynamicBg != null) {
            this.dynamicBg.Update(deltaTime);
        }
    };
    MatchView.prototype.ProcessControlSuccess = function (event) {
        this.RefreshScene();
    };
    MatchView.prototype.UpdateBossSkill = function (deltaTime) {
        if (this.bossSkillAnim != null) {
            if (!this.bossSkillAnim.IsPlaying()) {
                this.bossSkillAnim.Start(this.mScene.bossSkillInfo);
            }
            this.bossSkillAnim.Update(deltaTime);
        }
    };
    MatchView.prototype.UpdateEliminating = function (deltaTime) {
        if (this.eliminatingAnim != null) {
            if (!this.eliminatingAnim.IsPlaying()) {
                this.eliminatingAnim.Start(this.mScene.eliminateInfo, this.matchScore);
            }
            this.eliminatingAnim.Update(deltaTime);
            //移除已经不用的DisplayObject
            var deadElementArray = this.eliminatingAnim.GetDeadElementArray();
            var count = deadElementArray.length;
            if (count > 0) {
                for (var i = 0; i < count; ++i) {
                    if (deadElementArray[i] != null) {
                        deadElementArray[i].Release();
                    }
                }
                this.eliminatingAnim.ClearGetDeadElementRenderArray();
            }
        }
    };
    MatchView.prototype.EliminatLightning = function (deltaTime) {
    };
    MatchView.prototype.RefreshScene = function () {
        for (var i = 0; i < Scene.Columns; ++i) {
            for (var j = 0; j < Scene.Rows; ++j) {
                var element = this.mScene.sceneData[i][j];
                if (element != null) {
                    if (!element.hasAddToDisplayList) {
                        //renderer == null，应该是一个placeholder
                        if (element.renderer != null) {
                            //bg accessory
                            if (element.accessoryBg != undefined)
                                this.mBattleGround.addChild(element.accessoryBg);
                            //本体
                            element.Adapte(Tools.MatchViewElementWidth * element.BlockWidth(), Tools.MatchViewElementHeight * element.BlockHeight());
                            this.mBattleGround.addChild(element.renderer);
                            //accessory
                            if (element.accessory != undefined)
                                this.mBattleGround.addChild(element.accessory);
                        }
                        element.hasAddToDisplayList = true;
                        //console.log(element + " add to dis " + element.renderer.width + "," + element.renderer.height);
                    }
                    if (element.dirty) {
                        //renderer == null，应该是一个placeholder
                        if (element.renderer != null) {
                            var x = Tools.GetMatchViewRenderPosX(element.posx);
                            var y = Tools.GetMatchViewRenderPosY(element.posy);
                            element.renderer.x = x;
                            element.renderer.y = y;
                            if (element.accessory != undefined) {
                                element.accessory.x = x;
                                element.accessory.y = y;
                            }
                            if (element.accessoryBg != undefined) {
                                element.accessoryBg.x = x;
                                element.accessoryBg.y = y;
                            }
                        }
                        element.dirty = false;
                        //console.log(element + " refresh " + element.renderer.x + "," + element.renderer.y);
                    }
                }
            }
        }
    };
    MatchView.prototype.BattleGroundAddChild = function (child) {
        this.mBattleGround.addChild(child);
    };
    MatchView.prototype.BattleGroundRemoveChild = function (child) {
        if (child != null && child != undefined && child.parent == this.mBattleGround) {
            this.mBattleGround.removeChild(child);
        }
    };
    MatchView.prototype.RefreshTextrue = function () {
        for (var i = 0; i < Scene.Columns; ++i) {
            for (var j = 0; j < Scene.Rows; ++j) {
                var element = this.mScene.sceneData[i][j];
                if (element != null && element.dirty) {
                    element.RefreshTexture();
                }
            }
        }
    };
    MatchView.prototype.LoadBackGround = function () {
        if (this.mResModule != null) {
            var bg = this.mResModule.CreateBitmapByName("pd_res_json.NewBackGround");
            this.addChild(bg);
            //bg.width = GameMain.GetInstance().GetStageWidth();
            //bg.height = GameMain.GetInstance().GetStageHeight();
            var adaptedStageRect = GameMain.GetInstance().GetAdaptedDisplayRect();
            this.mAdaptedStage = GameMain.GetInstance().GetAdaptedStageContainer();
            this.addChild(this.mAdaptedStage);
            // if(DEBUG)
            // {
            //     var adaptedStage = <egret.Sprite>this.mAdaptedStage;
            //     adaptedStage.graphics.beginFill(0x00FF00, 0.5);
            //     adaptedStage.graphics.drawRect(0,0,
            //         adaptedStage.width, adaptedStage.height);
            //     adaptedStage.graphics.endFill();
            // }
            var battleGroundBg = this.mResModule.CreateBitmapByName("pd_res_json.zhanqu");
            battleGroundBg.x = 0;
            battleGroundBg.y = 186;
            battleGroundBg.width = 640;
            battleGroundBg.height = 966;
            GameMain.GetInstance().AdapteDisplayObject(battleGroundBg);
            this.mAdaptedStage.addChild(battleGroundBg);
            this.mBattleGround = new egret.Sprite();
            //battle rect in stander resolution
            var battleRect = new egret.Rectangle(30, 280, 580, 812);
            battleRect.x = battleRect.x * adaptedStageRect.width / Screen_StanderScreenWidth;
            battleRect.y = battleRect.y * adaptedStageRect.height / Screen_StanderScreenHeight;
            battleRect.width = battleRect.width * adaptedStageRect.width / Screen_StanderScreenWidth;
            battleRect.height = battleRect.height * adaptedStageRect.height / Screen_StanderScreenHeight;
            // battleRect.x = battleRect.x * this.mStageWidth / Screen_StanderScreenWidth;
            // battleRect.y = battleRect.y * this.mStageHeight / Screen_StanderScreenHeight;
            // battleRect.width = battleRect.width * this.mStageWidth / Screen_StanderScreenWidth;
            // battleRect.height = battleRect.height * this.mStageHeight / Screen_StanderScreenHeight;
            Tools.MatchBattleGroundPosX = battleRect.x;
            Tools.MatchBattleGroundPosY = battleRect.y;
            this.mBattleGround.x = Tools.MatchBattleGroundPosX;
            this.mBattleGround.y = Tools.MatchBattleGroundPosY;
            // if(DEBUG)
            // {
            //     this.mBattleGround.graphics.beginFill(0xFF0000, 0.3);
            //     this.mBattleGround.graphics.drawRect(0, 0, battleRect.width, battleRect.height);
            //     this.mBattleGround.graphics.endFill();
            // }
            this.mAdaptedStage.addChild(this.mBattleGround);
            this.mBattleGroundCoverEff = new egret.DisplayObjectContainer();
            this.mBattleGroundCoverEff.x = battleRect.x;
            this.mBattleGroundCoverEff.y = battleRect.y;
            this.mBattleGroundCoverEff.width = battleRect.width;
            this.mBattleGroundCoverEff.height = battleRect.height;
            this.mAdaptedStage.addChild(this.mBattleGroundCoverEff);
            if (true)
                console.log("BattleRect is :" + battleRect);
            Tools.MatchViewElementWidth = battleRect.width / Scene.Columns;
            Tools.MatchViewElementHeight = battleRect.height / Scene.Rows;
            Tools.MatchViewBattleGroundStartXCenter = Tools.MatchViewElementWidth / 2;
            Tools.MatchViewBattleGroundStartYCenter = Tools.MatchViewElementHeight / 2;
            this.mBattleGroundBlocks = new egret.DisplayObjectContainer();
            this.mBattleGround.addChild(this.mBattleGroundBlocks);
            // for(var y = 0; y < Scene.Rows; ++y)
            // {
            //     for(var x = 0; x < Scene.Columns; ++x)
            //     {
            //         var block = this.mResModule.CreateBitmapByName("pd_res_json.gezi");
            //         block.fillMode = egret.BitmapFillMode.SCALE;
            //         block.x = Tools.GetMatchViewRenderPosX(x);
            //         block.y = Tools.GetMatchViewRenderPosY(y);
            //         block.anchorOffsetX = Tools.MatchViewElementWidth / 2;
            //         block.anchorOffsetY = Tools.MatchViewElementHeight / 2;
            //         block.width = Tools.MatchViewElementWidth
            //         block.height = Tools.MatchViewElementHeight
            //         this.mBattleGroundBlocks.addChild(block);
            //     }
            // }
        }
    };
    MatchView.prototype.CreateHUD = function () {
        this.hud = new MatchHUD();
        this.hud.width = this.mAdaptedStage.width;
        this.hud.height = this.mAdaptedStage.height;
        this.hud.x = this.hud.y = 0;
        this.hud.Init();
        this.mAdaptedStage.addChild(this.hud);
    };
    MatchView.prototype.DeleteHUD = function () {
        this.hud.Release();
        this.hud = null;
    };
    MatchView.prototype.OnReplayGame = function (event) {
        this.ResetView();
    };
    MatchView.prototype.OnRevive = function (event) {
        this.ReleaseEnemyBornWarningElements();
    };
    MatchView.prototype.ReleaseEnemyBornWarningElements = function () {
        if (this.enemyBornWarningItemArray != null && this.enemyBornWarningItemArray != undefined) {
            for (var i = 0; i < this.enemyBornWarningItemArray.length; ++i) {
                this.mBattleGroundCoverEff.removeChild(this.enemyBornWarningItemArray[i]);
            }
            this.enemyBornWarningItemArray = null;
        }
        if (this.enemyBornWarningCountDown != null && this.enemyBornWarningCountDown != undefined) {
            this.mBattleGroundCoverEff.removeChild(this.enemyBornWarningCountDown);
            this.enemyBornWarningCountDown = null;
        }
    };
    MatchView.prototype.ShowEnemyBornWarningCountDown = function (countDown) {
        if (countDown > 0) {
            if (this.enemyBornWarningCountDown == null || this.enemyBornWarningCountDown == undefined) {
                this.enemyBornWarningCountDown = this.mResModule.CreateBitmapByName("pd_res_json.NO" + countDown);
                this.enemyBornWarningCountDown.x = 4.3 * Tools.MatchViewElementWidth;
                this.enemyBornWarningCountDown.y = Tools.MatchViewElementHeight;
                this.enemyBornWarningCountDown.width = 1.5 * Tools.MatchViewElementWidth;
                this.enemyBornWarningCountDown.height = 1.5 * Tools.MatchViewElementHeight;
                this.mBattleGroundCoverEff.addChild(this.enemyBornWarningCountDown);
                //让他动起来
                var param = new PaAlphaLoopParam;
                param.displayObj = this.enemyBornWarningCountDown;
                param.interval = 800;
                param.duration = 10 * 60 * 1000;
                param.startAlpha = 0.1;
                param.endAlpha = 0.8;
                param.reverse = true;
                var event = new PlayProgramAnimationEvent();
                event.param = param;
                GameMain.GetInstance().DispatchEvent(event);
            }
            else {
                var tex = this.mResModule.GetRes("pd_res_json.NO" + countDown);
                this.enemyBornWarningCountDown.texture = tex;
            }
        }
        else {
            if (this.enemyBornWarningCountDown != null && this.enemyBornWarningCountDown != undefined) {
                this.mBattleGroundCoverEff.removeChild(this.enemyBornWarningCountDown);
                this.enemyBornWarningCountDown = null;
            }
        }
    };
    MatchView.prototype.ShowEnemyBornWarningItem = function (line) {
        this.enemyBornWarningItemArray = [];
        for (var i = 0; i < line; ++i) {
            var warningItem = this.mResModule.CreateBitmapByName("pd_res_json.Warning");
            warningItem.x = 0;
            warningItem.y = i * Tools.MatchViewElementHeight;
            warningItem.width = Scene.Columns * Tools.MatchViewElementWidth;
            warningItem.height = Tools.MatchViewElementHeight;
            warningItem.alpha = 0.1;
            //让他动起来
            var param = new PaAlphaLoopParam;
            param.displayObj = warningItem;
            param.interval = 800;
            param.duration = 10 * 60 * 1000;
            param.startAlpha = 0.1;
            param.endAlpha = 0.8;
            param.reverse = true;
            var event = new PlayProgramAnimationEvent();
            event.param = param;
            GameMain.GetInstance().DispatchEvent(event);
            this.enemyBornWarningItemArray.push(warningItem);
            this.mBattleGroundCoverEff.addChild(warningItem);
        }
    };
    MatchView.prototype.OnEnemyBornWarningEvent = function (event) {
        if (this.enemyBornWarningItemArray == null || this.enemyBornWarningItemArray == undefined ||
            this.enemyBornWarningItemArray.length <= 0) {
            this.ShowEnemyBornWarningItem(event.enemyLine);
        }
        //倒计时
        this.ShowEnemyBornWarningCountDown(event.bornCountDown);
    };
    MatchView.prototype.OnSceneElementMoveUpEvent = function (event) {
        if (event.isMoveSuccess) {
            //上移成功，消除一排enemey born warning
            var index = this.enemyBornWarningItemArray.length - 1;
            if (index < 0) {
                if (true) {
                    console.error("还在move up， enemy born warning却没有了？？");
                }
                return;
            }
            var warningItem = this.enemyBornWarningItemArray.splice(index, 1)[0];
            this.mBattleGroundCoverEff.removeChild(warningItem);
        }
    };
    MatchView.prototype.CreateFeverRibbonsParticleArray = function () {
        this.feverRibbonsArray = [];
        this.feverRibbonsArray.push(this.CreateFeverParticle("Caidai_Blue", "Caidai"));
        this.feverRibbonsArray.push(this.CreateFeverParticle("Caidai__zise", "Caidai"));
        this.feverRibbonsArray.push(this.CreateFeverParticle("Caidai_Red", "Caidai"));
        this.feverRibbonsArray.push(this.CreateFeverParticle("Caidai_Green", "Caidai"));
        this.feverRibbonsArray.push(this.CreateFeverParticle("Caidai_Yellow", "Caidai"));
        this.feverRibbonsArray.push(this.CreateFeverParticle("caihong_shinning1", "Caidai"));
        this.feverRibbonsArray.push(this.CreateFeverParticle("caihong_shinning2", "Caidai"));
        this.feverRibbonsArray.push(this.CreateFeverParticle("caihong_shinning3", "Caidai"));
    };
    MatchView.prototype.CreateFeverParticle = function (texName, jsonName) {
        var particleSys = this.mResModule.CreateParticle(texName, jsonName);
        particleSys.x = GameMain.GetInstance().GetStageWidth() / 2;
        particleSys.y = 0;
        var screenWidth = egret.Capabilities.boundingClientWidth;
        var screenHeight = egret.Capabilities.boundingClientHeight;
        var screenAspect = screenWidth / screenHeight;
        var standerAspect = Screen_StanderScreenWidth / Screen_StanderScreenHeight; //640:1136
        if (screenAspect <= standerAspect) {
            //屏幕很长，iphonex
            //有富余的高度，因此放在屏幕的顶端
            //层级1，跳过back ground
            this.addChildAt(particleSys, 1);
        }
        else {
            //屏幕更短，ipad
            //有富余的宽度，因此放在adaptStage顶端
            //层级0， 放在最底层
            this.mAdaptedStage.addChildAt(particleSys, 0);
        }
        return particleSys;
    };
    MatchView.prototype.OnFeverEvent = function (feverEvent) {
        if (feverEvent.feverBegin) {
            for (var i = 0; i < this.feverRibbonsArray.length; ++i) {
                this.feverRibbonsArray[i].start();
            }
        }
        else {
            for (var i = 0; i < this.feverRibbonsArray.length; ++i) {
                this.feverRibbonsArray[i].stop();
            }
        }
    };
    return MatchView;
}(GameView));
__reflect(MatchView.prototype, "MatchView");
//# sourceMappingURL=MatchView.js.map