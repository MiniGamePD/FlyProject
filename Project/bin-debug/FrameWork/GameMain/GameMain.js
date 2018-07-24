var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameMain = (function () {
    function GameMain() {
    }
    //创建单例
    GameMain.CreatInstance = function (egretMain) {
        if (!GameMain.HasInstance()) {
            GameMain.msInstance = new GameMain();
            GameMain.msInstance.mEgretMain = egretMain;
            return true;
        }
        else {
            return false;
        }
    };
    //是否存在单例
    GameMain.HasInstance = function () {
        return GameMain.msInstance != null;
    };
    //获取单例
    GameMain.GetInstance = function () {
        return GameMain.msInstance;
    };
    //初始化
    GameMain.prototype.Init = function (stage) {
        this.GameStage = stage;
        this.mStateMgr = new StateMgr();
        this.mStateMgr.Init();
        this.mModuleMgr = new ModuleMgr();
        this.mModuleMgr.Init();
        this.SwitchGameState(GameStateType.Init);
    };
    //更新
    GameMain.prototype.Update = function (deltaTime) {
        if (this.mStateMgr != null) {
            this.mStateMgr.Update(deltaTime);
        }
        if (this.mModuleMgr != null) {
            this.mModuleMgr.Update(deltaTime);
        }
    };
    //释放
    GameMain.prototype.Release = function () {
        if (this.mStateMgr != null) {
            this.mStateMgr.Release();
        }
        if (this.mModuleMgr != null) {
            this.mModuleMgr.Release();
        }
    };
    GameMain.prototype.GetGameStage = function () {
        return this.GameStage;
    };
    GameMain.prototype.GetCureGameState = function () {
        if (this.mStateMgr != null) {
            return this.mStateMgr.CurGameState();
        }
        return GameStateType.Init;
    };
    GameMain.prototype.SwitchGameState = function (toState) {
        var hasSwitch = false;
        if (this.mStateMgr != null) {
            var fromState = this.mStateMgr.CurGameState();
            if (fromState != toState) {
                hasSwitch = this.mStateMgr.SwitchGameState(toState);
                if (hasSwitch && this.mModuleMgr != null) {
                    this.mModuleMgr.OnGameStateChange(fromState, toState);
                }
            }
        }
        return hasSwitch;
    };
    GameMain.prototype.GetModule = function (moduleType) {
        if (this.mModuleMgr != null) {
            return this.mModuleMgr.GetModule(moduleType);
        }
        return null;
    };
    GameMain.prototype.GetEgretMain = function () {
        return this.mEgretMain;
    };
    GameMain.prototype.DispatchEvent = function (event) {
        if (this.mEgretMain.hasEventListener(event.$type)) {
            //if(DEBUG)
            //	console.log(event.$type + " dispatch event " + this.mEgretMain.willTrigger(event.$type));
            this.mEgretMain.dispatchEvent(event);
        }
        else {
            if (true)
                console.log(event.$type + " has no lisenter");
        }
    };
    GameMain.prototype.AddEventListener = function (type, listener, thisObject, useCapture, priority) {
        this.mEgretMain.addEventListener(type, listener, thisObject, useCapture, priority);
    };
    GameMain.prototype.RemoveEventListener = function (type, listener, thisObject, useCapture) {
        this.mEgretMain.removeEventListener(type, listener, thisObject, useCapture);
    };
    GameMain.prototype.GetStageWidth = function () {
        return this.GameStage.stageWidth;
    };
    GameMain.prototype.GetStageHeight = function () {
        return this.GameStage.stageHeight;
    };
    GameMain.prototype.GetScreenRatio = function () {
        return this.GameStage.stageHeight / this.GameStage.stageWidth;
    };
    GameMain.prototype.GetAdaptedStageWidth = function () {
        if (this.adaptedStageRect == undefined)
            this.AdaptStageRect();
        return this.adaptedStageRect.width;
    };
    GameMain.prototype.GetAdaptedStageHeight = function () {
        if (this.adaptedStageRect == undefined)
            this.AdaptStageRect();
        return this.adaptedStageRect.height;
    };
    GameMain.prototype.GetAdaptedDisplayRect = function () {
        if (this.adaptedStageRect == undefined)
            this.AdaptStageRect();
        return this.adaptedStageRect;
    };
    GameMain.prototype.AdapteDisplayObject = function (item) {
        var xFactor = this.GetAdaptedStageWidth() / Screen_StanderScreenWidth;
        var yFactor = this.GetAdaptedStageHeight() / Screen_StanderScreenHeight;
        item.x = item.x * xFactor;
        item.y = item.y * yFactor;
        item.width = item.width * xFactor;
        item.height = item.height * yFactor;
        item.anchorOffsetX = item.anchorOffsetX * xFactor;
        item.anchorOffsetY = item.anchorOffsetY * yFactor;
    };
    GameMain.prototype.AdapteDisplayObjectScale = function (item) {
        var xFactor = this.GetAdaptedStageWidth() / Screen_StanderScreenWidth;
        var yFactor = this.GetAdaptedStageHeight() / Screen_StanderScreenHeight;
        item.scaleX = item.scaleX * xFactor;
        item.scaleY = item.scaleY * yFactor;
    };
    GameMain.prototype.AdaptTextField = function (item) {
        this.AdapteDisplayObject(item);
        item.size = item.size * this.GetAdaptedStageWidth() / Screen_StanderScreenWidth;
    };
    GameMain.prototype.AdaptPoint = function (point) {
        var result = new egret.Point();
        result.x = point.x * this.GetAdaptedStageWidth() / Screen_StanderScreenWidth;
        result.y = point.y * this.GetAdaptedStageHeight() / Screen_StanderScreenHeight;
        return result;
    };
    GameMain.prototype.GetAdaptedStageContainer = function () {
        if (this.adaptedStageRect == undefined)
            this.AdaptStageRect();
        return this.adaptedStageContainer;
    };
    GameMain.prototype.ClearAdaptedStageContainer = function () {
        if (this.adaptedStageContainer != undefined) {
            this.adaptedStageContainer.removeChildren();
        }
    };
    GameMain.prototype.AdaptStageRect = function () {
        this.adaptedStageRect = new egret.Rectangle();
        var screenWidth = egret.Capabilities.boundingClientWidth;
        var screenHeight = egret.Capabilities.boundingClientHeight;
        var screenAspect = screenWidth / screenHeight;
        var standerAspect = Screen_StanderScreenWidth / Screen_StanderScreenHeight; //640:1136
        if (screenAspect <= standerAspect) {
            //屏幕很长，iphonex
            //有富余的高度，因此以宽度为准进行适配
            this.adaptedStageRect.width = Math.floor(this.GameStage.stageHeight * screenAspect);
            this.adaptedStageRect.height = Math.floor(this.adaptedStageRect.width / standerAspect);
            //将这块显示区域，放在屏幕的中间
            this.adaptedStageRect.x = Math.floor((this.GameStage.stageWidth - this.adaptedStageRect.width) / 2);
            this.adaptedStageRect.y = Math.floor((this.GameStage.stageHeight - this.adaptedStageRect.height) / 2);
        }
        else {
            //屏幕更短，ipad
            //有富余的宽度，因此以高度为准进行适配
            this.adaptedStageRect.height = Math.floor(this.GameStage.stageWidth / screenAspect);
            this.adaptedStageRect.width = Math.floor(this.adaptedStageRect.height * standerAspect);
            //将这块显示区域，放在屏幕中间
            this.adaptedStageRect.x = Math.floor((this.GameStage.stageWidth - this.adaptedStageRect.width) / 2);
            this.adaptedStageRect.y = Math.floor((this.GameStage.stageHeight - this.adaptedStageRect.height) / 2);
        }
        if (this.adaptedStageContainer == undefined) {
            this.adaptedStageContainer = new egret.Sprite();
            this.adaptedStageContainer.x = this.adaptedStageRect.x;
            this.adaptedStageContainer.y = this.adaptedStageRect.y;
            this.adaptedStageContainer.width = this.adaptedStageRect.width;
            this.adaptedStageContainer.height = this.adaptedStageRect.height;
        }
    };
    GameMain.prototype.RegisterInGameTouchableUI = function (ui) {
        if (this.mInGameTouchableUIArray == undefined)
            this.mInGameTouchableUIArray = [];
        this.mInGameTouchableUIArray.push(ui);
    };
    GameMain.prototype.UnregisterInGameTouchableUI = function (ui) {
        if (this.mInGameTouchableUIArray != undefined) {
            var index = this.mInGameTouchableUIArray.indexOf(ui);
            if (index >= 0) {
                this.mInGameTouchableUIArray.splice(index, 1);
            }
        }
    };
    GameMain.prototype.IsTapTargetInInGameTouchableUIArray = function (tapTarget) {
        var result = false;
        if (this.mInGameTouchableUIArray != undefined) {
            for (var i = 0; i < this.mInGameTouchableUIArray.length; ++i) {
                if (tapTarget == this.mInGameTouchableUIArray[i]) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    };
    GameMain.prototype.SetPause = function (pause) {
        this.pause = pause;
    };
    GameMain.prototype.GetPause = function () {
        return this.pause;
    };
    GameMain.prototype.PlayerLogin = function () {
        console.log("GameMain.PlayerLogin");
        this.mEgretMain.PlayerLogin().catch(function (e) {
            console.log(e);
        });
    };
    GameMain.prototype.ShareAppMsg = function () {
        this.mEgretMain.ShareAppMsg();
    };
    GameMain.prototype.ShareAppMsgRank = function (score) {
        this.mEgretMain.ShareAppMsgRank(score);
    };
    GameMain.prototype.ShareAppMsgRevive = function () {
        this.mEgretMain.ShareAppMsgRevive();
    };
    GameMain.prototype.SaveUserData = function (userData) {
        this.mEgretMain.SaveUserData(userData);
    };
    GameMain.prototype.LoadUserData = function () {
        if (this.mEgretMain.hasUserData())
            return this.mEgretMain.loadUserData();
        else
            return null;
    };
    GameMain.prototype.HasUserData = function () {
        return this.mEgretMain.hasUserData();
    };
    return GameMain;
}());
__reflect(GameMain.prototype, "GameMain", ["IGameMain"]);
//# sourceMappingURL=GameMain.js.map