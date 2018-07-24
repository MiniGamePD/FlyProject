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
var FullScreenCover = (function (_super) {
    __extends(FullScreenCover, _super);
    function FullScreenCover(color, alpha) {
        var _this = _super.call(this) || this;
        var res = GameMain.GetInstance().GetModule(ModuleType.RES);
        _this.cover = res.CreateBitmapByName("pd_res_json.bgCover");
        _this.cover.width = GameMain.GetInstance().GetStageWidth() + 2000;
        _this.cover.height = GameMain.GetInstance().GetStageHeight() + 2000;
        _this.cover.x = -1000;
        _this.cover.y = -1000;
        _this.cover.alpha = alpha;
        _this.addChild(_this.cover);
        return _this;
    }
    return FullScreenCover;
}(egret.DisplayObjectContainer));
__reflect(FullScreenCover.prototype, "FullScreenCover");
//# sourceMappingURL=FullScreenCover.js.map