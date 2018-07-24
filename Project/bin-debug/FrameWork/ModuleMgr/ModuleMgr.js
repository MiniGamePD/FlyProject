var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModuleMgr = (function () {
    function ModuleMgr() {
    }
    ModuleMgr.prototype.Init = function () {
        this.CreateModule();
        this.InitModule();
    };
    ModuleMgr.prototype.CreateModule = function () {
        this.mModuleList = [];
        this.mModuleList.push(new ResModule);
        this.mModuleList.push(new LoadingModule);
        this.mModuleList.push(new InputModule);
        this.mModuleList.push(new SoundModule);
        this.mModuleList.push(new ProgrameAnimationModule);
        this.mModuleList.push(new LobbyModule);
        this.mModuleList.push(new BallMatchModule);
        this.mModuleList.push(new PlayerDataModule);
        this.mModuleList.push(new BallConfigModule);
        this.mModuleList.push(new NetworkConfigModule);
        this.mModuleCount = this.mModuleList.length;
    };
    ModuleMgr.prototype.InitModule = function () {
        for (var i = 0; i < this.mModuleCount; ++i) {
            this.mModuleList[i].Init();
        }
    };
    ModuleMgr.prototype.Update = function (deltaTime) {
        for (var i = 0; i < this.mModuleCount; ++i) {
            if (this.mModuleList[i].IsForeground())
                this.mModuleList[i].Update(deltaTime);
        }
    };
    ModuleMgr.prototype.Release = function () {
        for (var i = 0; i < this.mModuleCount; ++i) {
            this.mModuleList[i].Release();
        }
    };
    ModuleMgr.prototype.GetModule = function (moduleType) {
        return this.mModuleList[moduleType];
    };
    ModuleMgr.prototype.OnGameStateChange = function (from, to) {
        for (var i = 0; i < this.mModuleCount; ++i) {
            var iModule = this.mModuleList[i];
            var lastForegroundStat = iModule.IsForeground();
            iModule.SwitchForeOrBack(from, to);
            if (lastForegroundStat != iModule.IsForeground()) {
                if (lastForegroundStat) {
                    iModule.SwitchToBackground(from, to);
                }
                else {
                    iModule.SwitchToForeground(from, to);
                }
            }
        }
    };
    return ModuleMgr;
}());
__reflect(ModuleMgr.prototype, "ModuleMgr", ["IModuleMgr"]);
//# sourceMappingURL=ModuleMgr.js.map