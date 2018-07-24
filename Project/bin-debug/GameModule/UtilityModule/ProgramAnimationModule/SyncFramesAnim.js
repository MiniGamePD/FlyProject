var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SyncFramesAnim = (function () {
    function SyncFramesAnim() {
    }
    SyncFramesAnim.prototype.Init = function (bitmap, textSeq, interval, delay) {
        this.bitmap = bitmap;
        this.textureSeq = [];
        this.interval = interval;
        this.delayTime = 0;
        if (delay != undefined && delay != null) {
            this.delayTime = delay;
        }
        var resModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        if (resModule != null) {
            for (var i = 0; i < textSeq.length; ++i) {
                var texture = resModule.GetRes(textSeq[i]);
                if (texture != null) {
                    this.textureSeq.push(texture);
                }
            }
        }
        this.oneRoundTime = interval * this.textureSeq.length;
        this.Update();
    };
    SyncFramesAnim.prototype.Update = function () {
        if (this.bitmap != undefined
            && this.bitmap != null
            && this.oneRoundTime > 0) {
            var time = egret.getTimer() - this.delayTime;
            if (time <= 0) {
                time = 0;
            }
            var curRoundTime = time % this.oneRoundTime;
            var index = Math.floor(curRoundTime / this.interval);
            if (index < this.textureSeq.length
                && this.textureSeq[index] != null) {
                this.bitmap.texture = this.textureSeq[index];
            }
        }
    };
    SyncFramesAnim.prototype.Release = function () {
        this.bitmap = null;
        this.textureSeq = [];
        this.interval = 0;
        this.oneRoundTime = 0;
    };
    return SyncFramesAnim;
}());
__reflect(SyncFramesAnim.prototype, "SyncFramesAnim");
//# sourceMappingURL=SyncFramesAnim.js.map