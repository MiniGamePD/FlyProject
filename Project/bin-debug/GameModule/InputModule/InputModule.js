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
var InputModule = (function (_super) {
    __extends(InputModule, _super);
    function InputModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputModule.prototype.Init = function () {
        this.isForeground = true;
        this.continueDown = false;
        this.mInputEvent = new InputEvent(InputKey.Max, 0, 0);
        var stageWidth = GameMain.GetInstance().GetAdaptedStageWidth();
        var stageHeight = GameMain.GetInstance().GetAdaptedStageHeight();
        this.mMoveEventMinDisX = stageWidth * INPUT_MOVE_EVENT_DIS_RATE_HOR;
        this.mMoveEventMinDisY = stageHeight * INPUT_MOVE_EVENT_DIS_RATE_VER;
        this.RegisterTouchEvent();
        this.InitKey();
        return true;
    };
    InputModule.prototype.InitKey = function () {
        this.mKeyState = [];
        for (var i = 0; i < InputKey.Max; ++i) {
            this.mKeyState.push(false);
        }
    };
    InputModule.prototype.ClearKey = function () {
        for (var i = 0; i < InputKey.Max; ++i) {
            this.mKeyState[i] = false;
        }
    };
    InputModule.prototype.InputKey = function (key, stageX, stageY) {
        if (!this.mKeyState[key]) {
            this.mKeyState[key] = true;
            // egret.log("InputKey " + key + " (" + stageX + "," + stageY + ")");
            //Event
            if (this.mInputEvent != null) {
                this.mInputEvent.Key = key;
                this.mInputEvent.StageX = stageX;
                this.mInputEvent.StageY = stageY;
                GameMain.GetInstance().DispatchEvent(this.mInputEvent);
            }
        }
    };
    InputModule.prototype.RegisterTouchEvent = function () {
        GameMain.GetInstance().AddEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
        GameMain.GetInstance().AddEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
        GameMain.GetInstance().AddEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchTap, this);
        GameMain.GetInstance().AddEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
        GameMain.GetInstance().AddEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.OnTouchReleaseOutSide, this);
    };
    InputModule.prototype.UnRegisterTouchEvent = function () {
        GameMain.GetInstance().RemoveEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
        GameMain.GetInstance().RemoveEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
        GameMain.GetInstance().RemoveEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchTap, this);
        GameMain.GetInstance().RemoveEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
        GameMain.GetInstance().RemoveEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.OnTouchReleaseOutSide, this);
    };
    InputModule.prototype.OnTouchBegin = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.mTouchBeginX = evt.stageX;
            this.mTouchBeginY = evt.stageY;
            this.continueDown = false;
            // egret.log("OnTouchBegin(" + evt.stageX + "," + evt.stageY + ")");
            this.mLastTouchEvent = egret.TouchEvent.TOUCH_BEGIN;
        }
    };
    InputModule.prototype.OnTouchEnd = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_END) {
            this.continueDown = false;
            // egret.log("OnTouchBegin(" + evt.stageX + "," + evt.stageY + ")");
        }
    };
    InputModule.prototype.OnTouchMove = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
            // egret.log("OnTouchMove(" + evt.stageX + "," + evt.stageY + ")");
            var hasInput = false;
            var deltaX = evt.stageX - this.mTouchBeginX;
            var deltaY = evt.stageY - this.mTouchBeginY;
            if (deltaX >= this.mMoveEventMinDisX) {
                this.InputKey(InputKey.Right, evt.stageX, evt.stageY);
                this.continueDown = false;
                hasInput = true;
            }
            if (deltaX <= -this.mMoveEventMinDisX) {
                this.InputKey(InputKey.Left, evt.stageX, evt.stageY);
                this.continueDown = false;
                hasInput = true;
            }
            if (deltaY >= this.mMoveEventMinDisY) {
                this.continueDown = true;
                hasInput = true;
            }
            if (deltaY <= -this.mMoveEventMinDisY) {
                this.InputKey(InputKey.Up, evt.stageX, evt.stageY);
                hasInput = true;
            }
            if (hasInput) {
                this.mTouchBeginX = evt.stageX;
                this.mTouchBeginY = evt.stageY;
            }
            this.mLastTouchEvent = egret.TouchEvent.TOUCH_MOVE;
        }
    };
    InputModule.prototype.OnTouchTap = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_TAP) {
            if (!GameMain.GetInstance().GetPause() && !GameMain.GetInstance().IsTapTargetInInGameTouchableUIArray(evt.target)) {
                //没有点击在UI按钮上，才算对于药丸的操作
                // egret.log("OnTouchTap(" + evt.stageX + "," + evt.stageY + ")");
                if (this.mLastTouchEvent == egret.TouchEvent.TOUCH_BEGIN) {
                    this.InputKey(InputKey.Rotate, evt.stageX, evt.stageY);
                }
                this.mLastTouchEvent = egret.TouchEvent.TOUCH_TAP;
            }
        }
    };
    InputModule.prototype.OnTouchReleaseOutSide = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
            this.continueDown = false;
        }
    };
    InputModule.prototype.Update = function (deltaTime) {
        this.ClearKey();
        if (this.continueDown) {
            this.InputKey(InputKey.Down, 0, 0);
        }
    };
    InputModule.prototype.Release = function () {
        this.UnRegisterTouchEvent();
    };
    InputModule.prototype.SwitchForeOrBack = function (from, to) {
        this.isForeground = false;
    };
    InputModule.prototype.GetKey = function (key) {
        return this.mKeyState[key];
    };
    InputModule.prototype.OnStartNewTurn = function () {
        this.continueDown = false;
    };
    return InputModule;
}(ModuleBase));
__reflect(InputModule.prototype, "InputModule", ["IInputModule", "IModule"]);
//# sourceMappingURL=InputModule.js.map