var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tools = (function () {
    function Tools() {
    }
    Tools.GetMatchViewRenderPosX = function (posx) {
        return Tools.MatchViewBattleGroundStartXCenter + Tools.MatchViewElementWidth * posx;
    };
    Tools.GetMatchViewRenderPosY = function (posy) {
        return Tools.MatchViewBattleGroundStartYCenter + Tools.MatchViewElementHeight * posy;
    };
    Tools.ElementPosToGameStagePosX = function (posx) {
        return Tools.MatchBattleGroundPosX + this.GetMatchViewRenderPosX(posx);
    };
    Tools.ElementPosToGameStagePosY = function (posy) {
        return Tools.MatchBattleGroundPosY + this.GetMatchViewRenderPosY(posy);
    };
    Tools.MoveScenePosX = function (posX, dir, step) {
        var targetPosX = posX;
        switch (dir) {
            case Direction.Left:
                targetPosX -= step;
                break;
            case Direction.Right:
                targetPosX += step;
                break;
            default:
                break;
        }
        return targetPosX;
    };
    Tools.MoveScenePosY = function (posY, dir, step) {
        var targetPosY = posY;
        switch (dir) {
            case Direction.Up:
                targetPosY -= step;
                break;
            case Direction.Down:
                targetPosY += step;
                break;
            default:
                break;
        }
        return targetPosY;
    };
    Tools.IsZero = function (value) {
        return Math.abs(value) < Tools.ZeroValue;
    };
    Tools.MoveNumber = function (from, to, moveValue) {
        if (Tools.IsZero(from - to)) {
            return to;
        }
        else {
            var value = from;
            if (from < to) {
                value += moveValue;
            }
            else {
                value -= moveValue;
            }
            value = Tools.Clamp(value, from, to);
            return value;
        }
    };
    Tools.Clamp = function (value, p1, p2) {
        var result = value;
        if (p1 < p2) {
            result = value < p1 ? p1 : value;
            result = value > p2 ? p2 : value;
        }
        else if (p1 > p2) {
            result = value > p1 ? p1 : value;
            result = value < p2 ? p2 : value;
        }
        return result;
    };
    // 顺时针旋转
    Tools.RotateCW = function (center, pos) {
        if (center.length != 2 && pos.length != 2) {
            if (true) {
                console.assert(false, "Can not move element while elements not in scene!");
            }
        }
        var target = [];
        target.push(center[0] - (pos[1] - center[1]));
        target.push(center[1] + (pos[0] - center[0]));
        return target;
    };
    // 逆时针旋转
    Tools.RotateACW = function (center, pos) {
        if (center.length != 2 && pos.length != 2) {
            if (true) {
                console.assert(false, "Can not move element while elements not in scene!");
            }
        }
        var target = [];
        target.push(center[0] + (pos[1] - center[1]));
        target.push(center[1] - (pos[0] - center[0]));
        return target;
    };
    // 计算以某个点为中心，range为外围圈数的一个正方形的列表
    Tools.GetSquareRangePosList = function (centerX, centerY, range) {
        var target = [];
        for (var x = -range; x <= range; ++x) {
            for (var y = -range; y <= range; ++y) {
                target.push(centerX + x, centerY + y);
            }
        }
        return target;
    };
    // 计算以某个点为中心炸弹爆炸范围
    Tools.GetBoomRangePosList = function (centerX, centerY) {
        var target = [];
        target = this.GetSquareRangePosList(centerX, centerY, 1);
        target.push(centerX - 2, centerY);
        target.push(centerX + 2, centerY);
        target.push(centerX, centerY - 2);
        target.push(centerX, centerY + 2);
        return target;
    };
    // 计算以某个点为中心，range为单边扩充数量的一列坐标
    Tools.GetColunmPosList = function (centerX, centerY, range) {
        var target = [];
        for (var y = -range; y <= range; ++y) {
            target.push(centerX, centerY + y);
        }
        return target;
    };
    // 计算以某个点为中心，range为单边扩充数量的一行坐标
    Tools.GetRowPosList = function (centerX, centerY, range) {
        var target = [];
        for (var x = -range; x <= range; ++x) {
            target.push(centerX + x, centerY);
        }
        return target;
    };
    // 计算以某个点为中心，range为单边扩充数量的一行和一列坐标
    Tools.GetCrossPosList = function (centerX, centerY, range) {
        var target = [];
        for (var y = -range; y <= range; ++y) {
            target.push(centerX, centerY + y);
        }
        for (var x = -range; x <= range; ++x) {
            if (x != 0) {
                target.push(centerX + x, centerY);
            }
        }
        return target;
    };
    // 计算某两个左边的构成的区域的坐标点
    Tools.GetRegionPosList = function (startX, startY, endX, endY) {
        var target = [];
        var minX = Math.min(startX, endX);
        var maxX = Math.max(startX, endX);
        var minY = Math.min(startY, endY);
        var maxY = Math.max(startY, endY);
        for (var x = minX; x <= maxX; ++x) {
            for (var y = minY; y <= maxY; ++y) {
                target.push(x, y);
            }
        }
        return target;
    };
    // 判断一个boss是否在列表内
    Tools.IsInSuperVirusList = function (superVirus, list) {
        var result = false;
        if (list != null) {
            for (var i = 0; i < list.length; ++i) {
                if (list[i] == superVirus) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    };
    // 判读一个元素是否在列表里面
    Tools.IsInList = function (t, list) {
        var result = false;
        if (list != null) {
            for (var i = 0; i < list.length; ++i) {
                if (list[i] == t) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    };
    // 计算两个值的差值
    Tools.Lerp = function (from, to, rate) {
        return from + (to - from) * rate;
    };
    Tools.GetRotateAngle = function (fromX, fromY, toX, toY) {
        var angle = Tools.Radians2Angle(Math.atan2(toY - fromY, toX - fromX));
        return angle;
    };
    Tools.GetRotateAngleByPoint = function (from, to) {
        var angle = Tools.Radians2Angle(Math.atan2(to.y - from.y, to.x - from.x));
        return angle;
    };
    Tools.Radians2Angle = function (radians) {
        return radians * 180 / Math.PI;
    };
    Tools.Angle2Radians = function (angel) {
        return Math.PI * angel / 180;
    };
    Tools.PointDistance = function (fromX, fromY, toX, toY) {
        return Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    };
    Tools.GetDirectionRotateAngle = function (direction) {
        var angle = 0;
        switch (direction) {
            case Direction.Right:
                angle = 0;
                break;
            case Direction.Up:
                angle = 270;
                break;
            case Direction.Left:
                angle = 180;
                break;
            case Direction.Down:
                angle = 90;
                break;
        }
        return angle;
    };
    Tools.SetAnchor = function (disPlayObj, anchorType) {
        if (disPlayObj != null) {
            switch (anchorType) {
                case AnchorType.Center:
                    disPlayObj.anchorOffsetX = disPlayObj.width / 2;
                    disPlayObj.anchorOffsetY = disPlayObj.height / 2;
                    break;
                case AnchorType.Left:
                    disPlayObj.anchorOffsetX = 0;
                    disPlayObj.anchorOffsetY = disPlayObj.height / 2;
                    break;
                case AnchorType.Right:
                    disPlayObj.anchorOffsetX = disPlayObj.width;
                    disPlayObj.anchorOffsetY = disPlayObj.height / 2;
                    break;
                case AnchorType.Up:
                    disPlayObj.anchorOffsetX = disPlayObj.width / 2;
                    disPlayObj.anchorOffsetY = 0;
                    break;
                case AnchorType.Down:
                    disPlayObj.anchorOffsetX = disPlayObj.width / 2;
                    disPlayObj.anchorOffsetY = disPlayObj.height;
                    break;
            }
        }
    };
    // 播放药丸落地特效（坐标是转换过的位置坐标）
    Tools.PlayPillLandEffect = function (pos) {
        var particalParam = new PaPlayParticalParam();
        particalParam.textureName = "xingxing1";
        particalParam.jsonName = "LandEffect";
        particalParam.duration = 2000;
        particalParam.emitDuration = 40;
        particalParam.posX = pos.x;
        particalParam.posY = pos.y;
        var event = new PlayProgramAnimationEvent();
        event.param = particalParam;
        GameMain.GetInstance().DispatchEvent(event);
    };
    Tools.GetBackGroundDynamicLayer = function () {
        var screenWidth = egret.Capabilities.boundingClientWidth;
        var screenHeight = egret.Capabilities.boundingClientHeight;
        var screenAspect = screenWidth / screenHeight;
        var standerAspect = Screen_StanderScreenWidth / Screen_StanderScreenHeight; //640:1136
        if (screenAspect <= standerAspect) {
            //屏幕很长，iphonex
            //有富余的高度，因此放在屏幕的顶端
            //层级1，跳过back ground
            return 1;
        }
        else {
            //屏幕更短，ipad
            //有富余的宽度，因此放在adaptStage顶端
            //层级0， 放在最底层
            return 0;
        }
    };
    Tools.DetachDisplayObjFromParent = function (disPlayObj) {
        if (disPlayObj != undefined
            && disPlayObj != null
            && disPlayObj.parent != undefined
            && disPlayObj.parent != null) {
            disPlayObj.parent.removeChild(disPlayObj);
        }
    };
    Tools.RotateDirection = function (dir, angle) {
        var targetDir = new egret.Point(dir.x, dir.y);
        var matrix = new egret.Matrix();
        matrix.identity();
        matrix.rotate(angle);
        matrix.transformPoint(dir.x, dir.y, targetDir);
        targetDir.normalize(1);
        return targetDir;
    };
    Tools.RandomInterval = function (minInterval, maxInterval) {
        return Math.floor(Math.random() * (maxInterval - minInterval) + minInterval);
    };
    // 判断当前时间是否超过指定日期
    Tools.IsTimeExpired = function (year, month, date, hours, minutes) {
        var targetDate = new Date(year, month - 1, date, hours, minutes);
        var curDate = new Date();
        var delta = targetDate.getTime() - curDate.getTime();
        console.log("targetDate=" + targetDate.toString() + ", curDate=" + curDate.toString() + ", delta=" + delta);
        return delta < 0;
    };
    //判断是否超过了审核时间
    Tools.IsWxReviewTimeExpired = function () {
        return Tools.IsTimeExpired(2017, 6, 22, 18, 0);
    };
    Tools.AdapteDisplayObject = function (item) {
        if (item != null) {
            var adaptFactor = GameMain.GetInstance().GetStageWidth() / Screen_StanderScreenWidth;
            item.width *= adaptFactor;
            item.height *= adaptFactor;
            item.x *= adaptFactor;
        }
    };
    Tools.ShowTips = function (posx, posy, parent, tipString, color) {
        var tips;
        tips = new egret.TextField();
        tips.text = tipString;
        tips.size = 30;
        tips.width = 200;
        tips.height = 60;
        tips.anchorOffsetX = tips.width / 2;
        tips.anchorOffsetY = tips.height / 2;
        tips.textAlign = "center";
        // tips.bold = true;
        tips.x = posx;
        tips.y = posy;
        tips.textColor = color;
        parent.addChild(tips);
        var moveParam = new PaMovingParam();
        moveParam.displayObj = tips;
        moveParam.duration = 800;
        moveParam.targetPosX = tips.x;
        moveParam.targetPosY = tips.y - 60;
        moveParam.needRemoveOnFinish = true;
        var moveEvent = new PlayProgramAnimationEvent();
        moveEvent.param = moveParam;
        GameMain.GetInstance().DispatchEvent(moveEvent);
        var alphaParam = new PaAlphaLoopParam();
        alphaParam.displayObj = tips;
        alphaParam.duration = 800;
        alphaParam.interval = alphaParam.duration / 2;
        alphaParam.startAlpha = 0.7;
        alphaParam.endAlpha = 1;
        alphaParam.reverse = true;
        var alphaEvent = new PlayProgramAnimationEvent();
        alphaEvent.param = alphaParam;
        GameMain.GetInstance().DispatchEvent(alphaEvent);
    };
    Tools.GetConfigInList = function (list, level, defaultValue) {
        if (list != undefined && list != null && list.length > 0) {
            if (level > 0 && level < list.length) {
                return list[level - 1];
            }
            else if (level >= list.length) {
                return list[list.length - 1];
            }
            else {
                return defaultValue;
            }
        }
        return defaultValue;
    };
    Tools.MatchViewBattleGroundStartXCenter = 0; //00号元素的中心点坐标x
    Tools.MatchViewBattleGroundStartYCenter = 0; //00号元素的中心点坐标y
    Tools.MatchViewElementHeight = 0;
    Tools.MatchViewElementWidth = 0;
    Tools.MatchBattleGroundPosX = 0;
    Tools.MatchBattleGroundPosY = 0;
    Tools.FeverPowerTargetPos = new egret.Point(160, 150); // Fever能力目标点
    Tools.ZeroValue = 0.00001;
    return Tools;
}());
__reflect(Tools.prototype, "Tools");
//# sourceMappingURL=Tools.js.map