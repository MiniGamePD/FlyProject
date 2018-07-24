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
var ControlableElementCreator = (function (_super) {
    __extends(ControlableElementCreator, _super);
    function ControlableElementCreator(gameplayElementFactory) {
        var _this = _super.call(this, gameplayElementFactory) || this;
        _this.paramDic = [];
        _this.paramDic.length = ControlableElementCreateType.Count;
        _this.allRandomPillParams = [];
        _this.allRandomPillParams.push(new InternalCreator(0, 2, GameElementColor.random, Pill));
        _this.paramDic[ControlableElementCreateType.AllRandomPill] = _this.allRandomPillParams;
        _this.normalParams = [];
        _this.normalParams.push(new InternalCreator(0, 0.96, GameElementColor.random, Pill));
        _this.normalParams.push(new InternalCreator(0.96, 0.97, GameElementColor.random, Boom));
        _this.normalParams.push(new InternalCreator(0.97, 0.98, GameElementColor.random, RowEliminater));
        _this.normalParams.push(new InternalCreator(0.98, 0.99, GameElementColor.random, ColumnEliminater));
        _this.normalParams.push(new InternalCreator(0.99, 1, GameElementColor.random, CrossEliminater));
        _this.paramDic[ControlableElementCreateType.Normal] = _this.normalParams;
        _this.randomEliminateTool = [];
        _this.randomEliminateTool.push(new InternalCreator(0.0, 0.2, GameElementColor.random, Boom)); //20%
        _this.randomEliminateTool.push(new InternalCreator(0.2, 0.4, GameElementColor.random, CrossEliminater)); //20%
        _this.randomEliminateTool.push(new InternalCreator(0.4, 0.7, GameElementColor.random, RowEliminater)); //30%
        _this.randomEliminateTool.push(new InternalCreator(0.7, 1, GameElementColor.random, ColumnEliminater)); //30%
        _this.paramDic[ControlableElementCreateType.RandomEliminateTool] = _this.randomEliminateTool;
        return _this;
    }
    return ControlableElementCreator;
}(GameplayElementCreator));
__reflect(ControlableElementCreator.prototype, "ControlableElementCreator");
var ControlableElementCreateType;
(function (ControlableElementCreateType) {
    ControlableElementCreateType[ControlableElementCreateType["AllRandomPill"] = 0] = "AllRandomPill";
    ControlableElementCreateType[ControlableElementCreateType["Normal"] = 1] = "Normal";
    ControlableElementCreateType[ControlableElementCreateType["RandomEliminateTool"] = 2] = "RandomEliminateTool";
    ControlableElementCreateType[ControlableElementCreateType["Count"] = 3] = "Count";
})(ControlableElementCreateType || (ControlableElementCreateType = {}));
//# sourceMappingURL=ControlableElementCreator.js.map