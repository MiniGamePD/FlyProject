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
var PlayerControl = (function (_super) {
    __extends(PlayerControl, _super);
    function PlayerControl(gameplayElementFactory) {
        var _this = _super.call(this) || this;
        _this.creatorWorkParam = new CreatorWorkParam();
        _this.controlableElementCreator = new ControlableElementCreator(gameplayElementFactory);
        return _this;
    }
    PlayerControl.prototype.Init = function () {
        this.targetBeforeGameOver = null;
        this.nextControlableElementArray = [];
        this.nextCentainEliminateToolCountDown = Eliminate_NextCentainEliminateToolTurn;
        this.dropdownInterval = Difficulty_DropDownMaxInterval;
        GameMain.GetInstance().AddEventListener(InputEvent.EventName, this.OnInputEvent, this);
        GameMain.GetInstance().AddEventListener(SceneElementControlFailedEvent.EventName, this.OnPlayerControlFailed, this);
        GameMain.GetInstance().AddEventListener(SceneElementControlSuccessEvent.EventName, this.OnPlayerControlSuccess, this);
    };
    PlayerControl.prototype.Release = function () {
        this.nextControlableElementArray = null;
        if (this.startWorkTimer != null) {
            this.startWorkTimer.stop();
            this.startWorkTimer = null;
        }
        GameMain.GetInstance().RemoveEventListener(InputEvent.EventName, this.OnInputEvent, this);
        GameMain.GetInstance().RemoveEventListener(SceneElementControlFailedEvent.EventName, this.OnPlayerControlFailed, this);
        GameMain.GetInstance().RemoveEventListener(SceneElementControlSuccessEvent.EventName, this.OnPlayerControlSuccess, this);
    };
    PlayerControl.prototype.Work = function (param) {
        var controlWorkParam = param;
        //speed up 
        if (controlWorkParam.turn == Difficulty_DropDownSpeedUpTurn1 || controlWorkParam.turn == Difficulty_DropDownSpeedUpTurn2
            || controlWorkParam.turn == Difficulty_DropDownSpeedUpTurn3 || controlWorkParam.turn == Difficulty_DropDownSpeedUpTurn4) {
            this.dropdownInterval -= Difficulty_DropDownSpeedUpStep;
            if (this.dropdownInterval < Difficulty_DropDownMinInterval)
                this.dropdownInterval = Difficulty_DropDownMinInterval;
        }
        if (this.targetBeforeGameOver != null && this.targetBeforeGameOver != undefined) {
            this.PreviewDropDown();
            return;
        }
        if (controlWorkParam.turn == 1) {
            this.creatorWorkParam.paramIndex = ControlableElementCreateType.AllRandomPill;
            this.creatorWorkParam.createNum = 3;
            this.nextControlableElementArray = this.controlableElementCreator.CreateElement(this.creatorWorkParam);
            var hudEvent = new HUDEvent();
            hudEvent.eventType = HUDEventType.RefreshControlablePreview;
            hudEvent.param = this.nextControlableElementArray;
            GameMain.GetInstance().DispatchEvent(hudEvent);
            //等待ready go结束
            this.startWorkTimer = new egret.Timer(1500, 1);
            this.startWorkTimer.addEventListener(egret.TimerEvent.TIMER, this.PreviewDropDown, this);
            this.startWorkTimer.start();
            var event_1 = new HUDEvent();
            event_1.eventType = HUDEventType.ShowReadyGo;
            GameMain.GetInstance().DispatchEvent(event_1);
        }
        else {
            if (this.nextCentainEliminateToolCountDown <= 0) {
                //必然出特殊消除道具的倒计时已经到了，这次必须刷出一个消除道具
                this.creatorWorkParam.paramIndex = ControlableElementCreateType.RandomEliminateTool;
                //重置倒计时
                this.nextCentainEliminateToolCountDown = Eliminate_NextCentainEliminateToolTurn;
            }
            else {
                //根据概率，随机生成药丸或特殊消除道具
                this.creatorWorkParam.paramIndex = ControlableElementCreateType.Normal;
            }
            this.creatorWorkParam.createNum = 1;
            var newElement = this.controlableElementCreator.CreateElement(this.creatorWorkParam);
            if (true) {
                if (newElement == undefined || newElement == null) {
                    console.error("Create Controlable Element Failed");
                }
            }
            this.nextControlableElementArray.push(newElement);
            this.PreviewDropDown();
        }
    };
    PlayerControl.prototype.PreviewDropDown = function () {
        var previewDropDownTimeInMS = 750;
        var event = new HUDEvent();
        event.param = previewDropDownTimeInMS;
        event.eventType = HUDEventType.PlayPreviewDropDownAnim;
        GameMain.GetInstance().DispatchEvent(event);
        //等待preview dropdown anim结束
        this.startWorkTimer = new egret.Timer(previewDropDownTimeInMS, 1);
        this.startWorkTimer.addEventListener(egret.TimerEvent.TIMER, this.ReallyStartWork, this);
        this.startWorkTimer.start();
    };
    PlayerControl.prototype.ReallyStartWork = function () {
        if (this.nextControlableElementArray == undefined || this.nextControlableElementArray == null)
            return;
        if (this.targetBeforeGameOver != null && this.targetBeforeGameOver != undefined) {
            this.target = this.targetBeforeGameOver;
            this.targetBeforeGameOver = null;
        }
        else {
            this.target = this.nextControlableElementArray.splice(0, 1)[0];
        }
        this.startWorkTimer = null;
        this.dropdownTimer = 0;
        this.DispatchControlEvent(SceneElementControlType.Add);
        _super.prototype.Work.call(this);
    };
    PlayerControl.prototype.Sleep = function () {
        _super.prototype.Sleep.call(this);
        this.target = null;
    };
    PlayerControl.prototype.OnInputEvent = function (event) {
        if (this.target != null) {
            var key = event.Key;
            if (key == InputKey.Left) {
                this.DispatchControlEvent(SceneElementControlType.Move, Direction.Left, 1);
            }
            else if (key == InputKey.Right) {
                this.DispatchControlEvent(SceneElementControlType.Move, Direction.Right, 1);
            }
            else if (key == InputKey.Down) {
                this.DispatchControlEvent(SceneElementControlType.Move, Direction.Down, 1);
            }
            else if (key == InputKey.Rotate) {
                this.DispatchControlEvent(SceneElementControlType.Rotation);
            }
        }
    };
    PlayerControl.prototype.UpdateInternal = function (deltaTime) {
        if (this.target != null) {
            this.TryDropdown(deltaTime);
        }
    };
    PlayerControl.prototype.TryDropdown = function (deltaTime) {
        this.dropdownTimer += deltaTime;
        if (this.dropdownTimer >= this.dropdownInterval) {
            //即使时间很长，超过两个MatchModule.PillDropdownInterval，也还是移动一格，否则卡了，就忽然间下降很多，体验不好
            this.dropdownTimer = 0;
            this.DispatchControlEvent(SceneElementControlType.Move, Direction.Down, 1);
        }
    };
    PlayerControl.prototype.OnPlayerControlSuccess = function (event) {
        if (event != null) {
            if (event.controlType == SceneElementControlType.Rotation
                && this.target != null) {
                this.target.OnRotateACW();
                var playSoundEvent = new PlaySoundEvent("PillRotation_mp3", 1);
                GameMain.GetInstance().DispatchEvent(playSoundEvent);
            }
            else if (event.controlType == SceneElementControlType.Add
                && event.playerControl) {
                var hudEvent = new HUDEvent();
                hudEvent.eventType = HUDEventType.RefreshControlablePreview;
                hudEvent.param = this.nextControlableElementArray;
                GameMain.GetInstance().DispatchEvent(hudEvent);
            }
            else if (event.controlType == SceneElementControlType.Move) {
                var playSoundEvent = new PlaySoundEvent("PillMove_mp3", 1);
                GameMain.GetInstance().DispatchEvent(playSoundEvent);
            }
        }
    };
    PlayerControl.prototype.OnPlayerControlFailed = function (event) {
        if (this.isWorking && this.target == null) {
            if (true) {
                console.error("Control Failed While Player Control Is Not Working");
            }
            return;
        }
        if (event.controlType == SceneElementControlType.Move && event.moveDir == Direction.Down) {
            this.PlaySound("OnDown_mp3");
            //下落到不能再下落了，就进入消除状态        
            var event_2 = new PlayerControlFinishEvent();
            GameMain.GetInstance().DispatchEvent(event_2);
        }
        else if (event.controlType == SceneElementControlType.Add && event.playerControl) {
            //已经无法创建新的元素了，就进入死亡状态
            var event_3 = new GameOverEvent();
            GameMain.GetInstance().DispatchEvent(event_3);
        }
    };
    PlayerControl.prototype.DispatchControlEvent = function (controlType, moveDir, moveStep) {
        var event = new SceneElementControlEvent();
        event.sceneElements = this.target.GetSceneElements();
        event.controlType = controlType;
        event.moveDir = moveDir;
        event.moveStep = moveStep;
        event.playerControl = true;
        if (controlType == SceneElementControlType.Rotation) {
            event.rotateTargetPosList = this.target.GetRotateACWPosList();
        }
        GameMain.GetInstance().DispatchEvent(event);
    };
    PlayerControl.prototype.PlaySound = function (sound) {
        if (this.playSoundEvent == null) {
            this.playSoundEvent = new PlaySoundEvent(sound, 1);
        }
        this.playSoundEvent.Key = sound;
        GameMain.GetInstance().DispatchEvent(this.playSoundEvent);
    };
    PlayerControl.prototype.AddTurn = function () {
        this.nextCentainEliminateToolCountDown--;
        var inputModule = GameMain.GetInstance().GetModule(ModuleType.INPUT);
        inputModule.OnStartNewTurn();
    };
    PlayerControl.prototype.OnGameOver = function () {
        this.targetBeforeGameOver = this.target;
    };
    return PlayerControl;
}(GameModuleComponentBase));
__reflect(PlayerControl.prototype, "PlayerControl");
//# sourceMappingURL=PlayerControl.js.map