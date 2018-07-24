var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameplayElementFactory = (function () {
    function GameplayElementFactory() {
    }
    GameplayElementFactory.prototype.CreateGameplayElement = function (c) {
        return new c();
    };
    return GameplayElementFactory;
}());
__reflect(GameplayElementFactory.prototype, "GameplayElementFactory");
//# sourceMappingURL=GameplayElementFactory.js.map