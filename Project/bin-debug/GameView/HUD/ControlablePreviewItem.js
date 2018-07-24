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
var ControlablePreviewItem = (function (_super) {
    __extends(ControlablePreviewItem, _super);
    function ControlablePreviewItem(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.dropTargetY = 0; //Tools.ElementPosToGameStagePosY(0);
        _this.nextPreviewX = 4; //Tools.ElementPosToGameStagePosY(-3);
        _this.thirdPreviewX = 6.3; //Tools.ElementPosToGameStagePosY(-4);
        _this.previewY = -1.15; //Tools.ElementPosToGameStagePosX(4);
        _this.nextPreview = new egret.DisplayObjectContainer();
        _this.thirdPreview = new egret.DisplayObjectContainer();
        _this.nextPreview.y = _this.thirdPreview.y = Tools.ElementPosToGameStagePosY(_this.previewY);
        _this.nextPreview.x = Tools.ElementPosToGameStagePosX(_this.nextPreviewX);
        _this.thirdPreview.x = Tools.ElementPosToGameStagePosX(_this.thirdPreviewX);
        _this.addChild(_this.nextPreview);
        _this.addChild(_this.thirdPreview);
        return _this;
    }
    ControlablePreviewItem.prototype.Init = function () {
        GameMain.GetInstance().AddEventListener(SceneElementAccessAnswerEvent.EventName, this.OnReciveSceneData, this);
    };
    ControlablePreviewItem.prototype.Release = function () {
        GameMain.GetInstance().RemoveEventListener(SceneElementAccessAnswerEvent.EventName, this.OnReciveSceneData, this);
    };
    ControlablePreviewItem.prototype.OnReciveSceneData = function (event) {
        if (event.accesser == this) {
            var gameover = false;
            var queryAnswerArray = event.queryAnswerArray;
            if (this.nextPreviewSize == 2 /*将要掉下来两个元素*/
                && queryAnswerArray.length < 2) {
                gameover = true;
            }
            else if (this.nextPreviewSize == 1 /*将要掉下来一个元素*/) {
                if (queryAnswerArray.length < 1) {
                    gameover = true;
                }
                else if (queryAnswerArray.length == 1) {
                    var pos = queryAnswerArray[0];
                    if (pos[0] == Scene.Columns / 2) {
                        //如果空的是后一个，就输了
                        gameover = true;
                    }
                }
            }
            var realDropDuration = this.dropAnimDuration;
            var nextPreviewMoveDistanceY = Tools.ElementPosToGameStagePosY(this.dropTargetY) -
                Tools.ElementPosToGameStagePosY(this.previewY);
            var thirdPreviewMoveDistanceX = Tools.ElementPosToGameStagePosX(this.nextPreviewX) -
                Tools.ElementPosToGameStagePosX(this.thirdPreviewX);
            if (gameover) {
                //game over了就不用移动了
                return;
            }
            //将下一个药丸，移动到瓶口
            var param1 = new PaMovingParam;
            param1.displayObj = this.nextPreview.getChildAt(0);
            param1.duration = realDropDuration;
            param1.targetPosX = 0;
            param1.targetPosY = nextPreviewMoveDistanceY;
            var event1 = new PlayProgramAnimationEvent();
            event1.param = param1;
            GameMain.GetInstance().DispatchEvent(event1);
            //将下二个药丸，移动到下一个药丸的位置
            var param2 = new PaMovingParam;
            param2.displayObj = this.thirdPreview.getChildAt(0);
            param2.duration = realDropDuration;
            param2.targetPosX = thirdPreviewMoveDistanceX;
            param2.targetPosY = 0;
            var event2 = new PlayProgramAnimationEvent();
            event2.param = param2;
            GameMain.GetInstance().DispatchEvent(event2);
            var param2_scale = new PaScalingParam();
            param2_scale.displayObj = this.thirdPreview.getChildAt(0);
            param2_scale.duration = realDropDuration;
            param2_scale.targetScaleX = 1;
            param2_scale.targetScaleY = 1;
            var event2_scale = new PlayProgramAnimationEvent();
            event2_scale.param = param2_scale;
            GameMain.GetInstance().DispatchEvent(event2_scale);
        }
    };
    ControlablePreviewItem.prototype.PlayDropAnim = function (durationInMS) {
        this.dropAnimDuration = durationInMS;
        //向scene询问将要生成controlable element的格子是否是空，用来做动画移动位置的预判
        var event = new SceneElementAccessEvent();
        event.accesser = this;
        event.accessType = SceneElementType.Empty;
        event.answerType = SceneElementAccessAnswerType.Pos;
        event.startX = Scene.Columns / 2 - 1;
        event.startY = 0;
        event.endX = Scene.Columns / 2;
        event.endY = 0;
        GameMain.GetInstance().DispatchEvent(event);
    };
    ControlablePreviewItem.prototype.RefreshControlablePreview = function (nextControlableElementArray) {
        this.Reset();
        this.nextPreviewSize = nextControlableElementArray[0].GetPreviewSize();
        var nextPreviewObj = nextControlableElementArray[0].GetPreViewContainer();
        var thirdPreviewObj = nextControlableElementArray[1].GetPreViewContainer();
        thirdPreviewObj.scaleX = thirdPreviewObj.scaleY = 0.6;
        //thirdPreviewObj.alpha = 0.5;
        this.nextPreview.addChild(nextPreviewObj);
        this.thirdPreview.addChild(thirdPreviewObj);
    };
    ControlablePreviewItem.prototype.Reset = function () {
        this.nextPreviewSize = 0;
        this.nextPreview.removeChildren();
        this.thirdPreview.removeChildren();
    };
    return ControlablePreviewItem;
}(egret.DisplayObjectContainer));
__reflect(ControlablePreviewItem.prototype, "ControlablePreviewItem");
//# sourceMappingURL=ControlablePreviewItem.js.map