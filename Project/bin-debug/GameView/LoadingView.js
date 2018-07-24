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
var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingView.prototype.CreateView = function () {
        this.InitBackGround();
        if (true) {
            this.textDebug = new egret.TextField;
            this.textDebug.x = 0;
            this.textDebug.y = 0;
            this.textDebug.size = 20;
            this.addChild(this.textDebug);
            this.debugTime = 0;
            this.error = "";
            this.loaded = 0;
            this.total = 0;
            this.fakeLoadingRate = 0;
        }
    };
    LoadingView.prototype.UpdateView = function (deltaTime) {
        if (true) {
            this.debugTime += deltaTime;
            this.textDebug.text = this.debugTime.toString() + "\n" + this.error;
        }
        // this.fakeLoadingRate += 10;
        // this.fakeLoadingRate = Math.min(100, this.fakeLoadingRate);
        // this.SetProgress(this.fakeLoadingRate);
    };
    LoadingView.prototype.InitBackGround = function () {
        var stageWidth = GameMain.GetInstance().GetStageWidth();
        var stageHeight = GameMain.GetInstance().GetStageHeight();
        // var bg = new FullScreenCover(0x000000, 1);
        // this.addChild(bg);
        // this.textField = new egret.TextField();
        // this.textField.x = 0;
        // this.textField.y = stageHeight / 4;
        // this.textField.width = stageWidth;
        // this.textField.height = 100;
        // this.textField.rotation = -5;
        // this.textField.fontFamily = "Impact";
        // this.textField.size *= 2;
        // this.textField.textAlign = "center";
        // this.textField.text = "Pocket Doctor";
        // this.addChild(this.textField);
        this.loadingText = new egret.TextField();
        this.loadingText.text = "加载中...马上就好哦~";
        this.loadingText.x = 0;
        this.loadingText.y = stageHeight / 2;
        this.loadingText.textAlign = egret.HorizontalAlign.CENTER;
        this.loadingText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.loadingText.width = stageWidth;
        this.loadingText.height = 100;
        this.addChild(this.loadingText);
    };
    // public SetProgress(rate: number)
    // {
    // 	var text = "Loading... " + rate.toFixed(0) + "%";
    // 	this.loadingText.text = text
    // }
    // public SetGroupDebugInfo(loaded:number, total:number)
    // {
    //     this.loaded = loaded;
    //     this.total = total;
    // }
    LoadingView.prototype.SetError = function (err) {
        this.error += "\n" + err;
    };
    return LoadingView;
}(GameView));
__reflect(LoadingView.prototype, "LoadingView");
//# sourceMappingURL=LoadingView.js.map