var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BallController = (function () {
    function BallController() {
        this.curTouchPointId = -1;
        this.UIMoveMaxDis = 60;
        this.UIMoveMinis = 10;
        this.curAlpha = 0; // 控制UI的当前Alpha
        this.MaxAlpha = 1; // 控制UI的最大Alpha
        this.MinAlpha = 0.2; // 控制UI的最低Alpha
        this.LerpAlphaDownSpeed = 0.5; // 控制UI的Alpha降低的时长
        this.LerpAlphaUpSpeed = 0.1; // 控制UI的Alpha增加的时长
    }
    BallController.prototype.Init = function (matchModule, ballGameWorld, ballEmitter, battleGround) {
        this.matchModule = matchModule;
        this.resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        this.emitDir = new egret.Point();
        this.beginTouchPoint = new egret.Point(GameMain.GetInstance().GetStageWidth() / 2, GameMain.GetInstance().GetStageHeight() * (4 / 5));
        this.movePoint = new egret.Point();
        this.tempPoint = new egret.Point();
        this.ballGameWorld = ballGameWorld;
        this.ballEmitter = ballEmitter;
        this.battleGround = battleGround;
        var playerData = GameMain.GetInstance().GetModule(ModuleType.PLAYER_DATA);
        this.controllerType = playerData.GetControlType();
        //For Debug
        //this.controllerType = BallControllerType.TouchMove;
        if (this.controllerType == BallControllerType.TouchMove) {
            this.InitTouchMoveUI();
        }
        this.RegisterTouchEvent();
    };
    BallController.prototype.InitTouchMoveUI = function () {
        Tools.DetachDisplayObjFromParent(this.movePointBitmap);
        Tools.DetachDisplayObjFromParent(this.moveUiBgBitmap);
        this.curAlpha = 1;
        var uiInitX = GameMain.GetInstance().GetStageWidth() / 2;
        var uiInitY = GameMain.GetInstance().GetStageHeight() / 4 * 3;
        this.moveUiBgBitmap = this.resModule.CreateBitmap("ControllerBg", uiInitX, uiInitY, this.battleGround);
        this.moveUiBgBitmap.width = 150;
        this.moveUiBgBitmap.height = 150;
        Tools.SetAnchor(this.moveUiBgBitmap, AnchorType.Center);
        this.movePointBitmap = this.resModule.CreateBitmap("Lobby_Light_Red", uiInitX, uiInitY, this.battleGround);
        this.movePointBitmap.width = 80;
        this.movePointBitmap.height = 80;
        Tools.SetAnchor(this.movePointBitmap, AnchorType.Center);
        this.movePointBitmap.alpha = this.curAlpha;
        this.moveUiBgBitmap.alpha = this.curAlpha;
    };
    BallController.prototype.SwitchControllerType = function (controllerType) {
        this.controllerType = controllerType;
        if (this.controllerType == BallControllerType.TouchMove) {
            this.InitTouchMoveUI();
        }
        else {
            Tools.DetachDisplayObjFromParent(this.movePointBitmap);
            Tools.DetachDisplayObjFromParent(this.moveUiBgBitmap);
        }
    };
    // 输入相关 begin
    BallController.prototype.RegisterTouchEvent = function () {
        GameMain.GetInstance().AddEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
        GameMain.GetInstance().AddEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
        GameMain.GetInstance().AddEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchTap, this);
        GameMain.GetInstance().AddEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
        GameMain.GetInstance().AddEventListener(SwitchControlTypeEvent.EventName, this.OnSwitchControlTypeEvent, this);
    };
    BallController.prototype.UnRegisterTouchEvent = function () {
        GameMain.GetInstance().RemoveEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
        GameMain.GetInstance().RemoveEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
        GameMain.GetInstance().RemoveEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchTap, this);
        GameMain.GetInstance().RemoveEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
        GameMain.GetInstance().RemoveEventListener(SwitchControlTypeEvent.EventName, this.OnSwitchControlTypeEvent, this);
    };
    BallController.prototype.OnSwitchControlTypeEvent = function (event) {
        this.SwitchControllerType(event.newControlType);
    };
    BallController.prototype.OnTouchBegin = function (evt) {
        if (evt != null
            && evt.stageX != undefined
            && evt.stageY != undefined) {
            if (this.controllerType == BallControllerType.TouchPoint) {
                this.OnTouchPosition(evt.stageX, evt.stageY);
            }
            else {
                if (this.curTouchPointId < 0) {
                    this.curTouchPointId = evt.touchPointID;
                    this.movePoint.x = evt.stageX;
                    this.movePoint.y = evt.stageY;
                    this.OnCtrlTouchMove();
                }
            }
        }
    };
    BallController.prototype.OnCtrlTouchMove = function () {
        if (this.matchModule.GetMatchState() == BallMatchState.playing) {
            this.emitDir.x = this.movePoint.x - this.beginTouchPoint.x;
            this.emitDir.y = this.movePoint.y - this.beginTouchPoint.y;
            if (this.emitDir.length > this.UIMoveMinis) {
                this.ballEmitter.SetEmitDir(this.emitDir);
            }
            this.RefreshUIMove();
        }
    };
    BallController.prototype.OnTouchMove = function (evt) {
        if (evt != null
            && evt.stageX != undefined
            && evt.stageY != undefined) {
            if (this.controllerType == BallControllerType.TouchPoint) {
                this.OnTouchPosition(evt.stageX, evt.stageY);
            }
            else {
                if (this.curTouchPointId == evt.touchPointID) {
                    this.movePoint.x = evt.stageX;
                    this.movePoint.y = evt.stageY;
                    this.OnCtrlTouchMove();
                }
            }
        }
    };
    BallController.prototype.RefreshUIMove = function () {
        this.tempPoint.x = this.movePoint.x - this.beginTouchPoint.x;
        this.tempPoint.y = this.movePoint.y - this.beginTouchPoint.y;
        if (this.tempPoint.length > this.UIMoveMaxDis) {
            this.tempPoint.normalize(this.UIMoveMaxDis);
            this.movePoint.x = this.beginTouchPoint.x + this.tempPoint.x;
            this.movePoint.y = this.beginTouchPoint.y + this.tempPoint.y;
        }
        this.movePointBitmap.x = this.movePoint.x;
        this.movePointBitmap.y = this.movePoint.y;
        this.moveUiBgBitmap.x = this.beginTouchPoint.x;
        this.moveUiBgBitmap.y = this.beginTouchPoint.y;
    };
    BallController.prototype.OnTouchEnd = function (evt) {
        if (evt != null
            && evt.stageX != undefined
            && evt.stageY != undefined) {
            if (this.controllerType == BallControllerType.TouchPoint) {
                this.OnTouchPosition(evt.stageX, evt.stageY);
            }
            else {
                if (this.curTouchPointId == evt.touchPointID) {
                    this.movePoint.x = evt.stageX;
                    this.movePoint.y = evt.stageY;
                    this.OnCtrlTouchMove();
                    this.curTouchPointId = -1;
                }
            }
        }
    };
    BallController.prototype.OnTouchTap = function (evt) {
        if (evt != null
            && evt.stageX != undefined
            && evt.stageY != undefined) {
            if (this.controllerType == BallControllerType.TouchPoint) {
                this.OnTouchPosition(evt.stageX, evt.stageY);
            }
        }
    };
    BallController.prototype.OnTouchPosition = function (posX, posY) {
        if (this.matchModule.GetMatchState() == BallMatchState.playing) {
            this.emitDir.x = posX - this.ballEmitter.emitPos.x;
            this.emitDir.y = posY - this.ballEmitter.emitPos.y;
            this.ballEmitter.SetEmitDir(this.emitDir);
        }
    };
    BallController.prototype.Update = function (deltaTime) {
        this.UpdateUiAlpha(deltaTime);
    };
    BallController.prototype.UpdateUiAlpha = function (deltaTime) {
        if (this.controllerType == BallControllerType.TouchMove
            && this.movePointBitmap
            && this.moveUiBgBitmap) {
            if (this.curTouchPointId < 0) {
                if (this.curAlpha > this.MinAlpha) {
                    this.curAlpha -= deltaTime * 0.001 / this.LerpAlphaDownSpeed;
                    if (this.curAlpha < this.MinAlpha) {
                        this.curAlpha = this.MinAlpha;
                    }
                    this.movePointBitmap.alpha = this.curAlpha;
                    this.moveUiBgBitmap.alpha = this.curAlpha;
                }
            }
            else {
                if (this.curAlpha < this.MaxAlpha) {
                    this.curAlpha += deltaTime * 0.001 / this.LerpAlphaUpSpeed;
                    if (this.curAlpha > this.MaxAlpha) {
                        this.curAlpha = this.MaxAlpha;
                    }
                    this.movePointBitmap.alpha = this.curAlpha;
                    this.moveUiBgBitmap.alpha = this.curAlpha;
                }
            }
        }
    };
    BallController.prototype.Release = function () {
        this.UnRegisterTouchEvent();
    };
    return BallController;
}());
__reflect(BallController.prototype, "BallController");
var BallControllerType;
(function (BallControllerType) {
    BallControllerType[BallControllerType["TouchPoint"] = 0] = "TouchPoint";
    BallControllerType[BallControllerType["TouchMove"] = 1] = "TouchMove";
})(BallControllerType || (BallControllerType = {}));
//# sourceMappingURL=BallController.js.map