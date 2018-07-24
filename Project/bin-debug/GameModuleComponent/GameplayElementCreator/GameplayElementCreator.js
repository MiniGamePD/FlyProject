var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameplayElementCreator = (function () {
    function GameplayElementCreator(gameplayElementFactory) {
        this.gameplayElementFactory = gameplayElementFactory;
    }
    GameplayElementCreator.prototype.CreateElement = function (param) {
        var paramIndex = param.paramIndex;
        var createParams = this.paramDic[paramIndex];
        var element = null;
        var random = Math.random();
        for (var i = 0; i < createParams.length; ++i) {
            var internalCreator = createParams[i];
            if (internalCreator.ProbabilityMatch(random)) {
                if (param.createNum == 1) {
                    return internalCreator.CreateElement(this.gameplayElementFactory);
                }
                else {
                    var result = [];
                    for (var i = 0; i < param.createNum; ++i) {
                        result.push(internalCreator.CreateElement(this.gameplayElementFactory));
                    }
                    return result;
                }
            }
        }
        console.error("Can't Create GameplayElement for " + param.paramIndex);
    };
    return GameplayElementCreator;
}());
__reflect(GameplayElementCreator.prototype, "GameplayElementCreator");
var CreatorWorkParam = (function () {
    function CreatorWorkParam() {
    }
    return CreatorWorkParam;
}());
__reflect(CreatorWorkParam.prototype, "CreatorWorkParam");
var InternalCreator = (function () {
    //add more..
    function InternalCreator(probabilityBegin, probabilityEnd, elementColor, c) {
        this.probabilityBegin = probabilityBegin;
        this.probabilityEnd = probabilityEnd;
        this.elementColor = elementColor;
        this.objConstructor = c;
    }
    InternalCreator.prototype.ProbabilityMatch = function (randomNum) {
        return (randomNum >= this.probabilityBegin && randomNum < this.probabilityEnd);
    };
    InternalCreator.prototype.CreateElement = function (gameplayElementFactory) {
        return gameplayElementFactory.CreateGameplayElement(this.objConstructor);
    };
    return InternalCreator;
}());
__reflect(InternalCreator.prototype, "InternalCreator", ["InternalCreatorBase"]);
//# sourceMappingURL=GameplayElementCreator.js.map