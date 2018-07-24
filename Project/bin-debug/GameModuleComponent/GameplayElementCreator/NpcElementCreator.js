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
var NpcElementCreator = (function (_super) {
    __extends(NpcElementCreator, _super);
    function NpcElementCreator(gameplayElementFactory) {
        var _this = _super.call(this, gameplayElementFactory) || this;
        _this.paramDic = [];
        _this.paramDic.length = NpcElementCreateType.Count;
        _this.randomVirusParams = [];
        _this.randomVirusParams.push(new InternalCreator(0, 2, GameElementColor.random, Virus));
        _this.paramDic[NpcElementCreateType.RandomVirus] = _this.randomVirusParams;
        _this.randomSuperVirusParams = [];
        _this.randomSuperVirusParams.push(new InternalCreator(0, 2, GameElementColor.random, SuperVirus));
        _this.paramDic[NpcElementCreateType.RandomSuperVirus] = _this.randomSuperVirusParams;
        return _this;
    }
    return NpcElementCreator;
}(GameplayElementCreator));
__reflect(NpcElementCreator.prototype, "NpcElementCreator");
var NpcElementCreateType;
(function (NpcElementCreateType) {
    NpcElementCreateType[NpcElementCreateType["RandomVirus"] = 0] = "RandomVirus";
    NpcElementCreateType[NpcElementCreateType["RandomSuperVirus"] = 1] = "RandomSuperVirus";
    NpcElementCreateType[NpcElementCreateType["Count"] = 2] = "Count";
})(NpcElementCreateType || (NpcElementCreateType = {}));
//# sourceMappingURL=NpcElementCreator.js.map