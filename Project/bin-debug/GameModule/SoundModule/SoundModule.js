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
var SoundModule = (function (_super) {
    __extends(SoundModule, _super);
    function SoundModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SoundModule.prototype.Init = function () {
        this.isForeground = true;
        this.mFadeParamArray = [];
        this.mBgmPausePosDic = {};
        this.mResModule = GameMain.GetInstance().GetModule(ModuleType.RES);
        GameMain.GetInstance().AddEventListener(PlaySoundEvent.EventName, this.OnPlaySoundEvent, this);
        GameMain.GetInstance().AddEventListener(BgmControlEvent.EventName, this.OnBgmControlEvent, this);
        this.soundHitBoxResReady = false;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.OnResourceLoadComplete, this);
        return true;
    };
    SoundModule.prototype.Update = function (deltaTime) {
        var tobeDelete = null;
        for (var i = 0; i < this.mFadeParamArray.length; ++i) {
            var fadeParam = this.mFadeParamArray[i];
            if (fadeParam.fadeIn) {
                var newVolume = fadeParam.channel.volume + fadeParam.speed * deltaTime;
                if (newVolume > 1) {
                    newVolume = 1;
                    if (tobeDelete == null) {
                        tobeDelete = [];
                    }
                    tobeDelete.push(fadeParam);
                }
                fadeParam.channel.volume = newVolume;
            }
            else {
                var newVolume = fadeParam.channel.volume - fadeParam.speed * deltaTime;
                if (newVolume < 0) {
                    newVolume = 0;
                    if (tobeDelete == null) {
                        tobeDelete = [];
                    }
                    tobeDelete.push(fadeParam);
                }
                fadeParam.channel.volume = newVolume;
            }
        }
        if (tobeDelete != null) {
            for (var i = 0; i < tobeDelete.length; ++i) {
                var index = this.mFadeParamArray.indexOf(tobeDelete[i]);
                this.mFadeParamArray.splice(index, 1);
            }
        }
    };
    SoundModule.prototype.Release = function () {
        GameMain.GetInstance().RemoveEventListener(PlaySoundEvent.EventName, this.OnPlaySoundEvent, this);
        GameMain.GetInstance().RemoveEventListener(BgmControlEvent.EventName, this.OnBgmControlEvent, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.OnResourceLoadComplete, this);
    };
    SoundModule.prototype.OnResourceLoadComplete = function (event) {
        if (event.groupName == "SoundHitBox") {
            this.soundHitBoxResReady = true;
        }
    };
    SoundModule.prototype.SwitchForeOrBack = function (from, to) {
        this.isForeground = true;
    };
    SoundModule.prototype.PlaySound = function (key, loops) {
        if (this.mResModule != null) {
            var sound = this.mResModule.GetRes(key);
            if (sound != null) {
                return sound.play(0, loops);
            }
        }
        return null;
    };
    SoundModule.prototype.OnPlaySoundEvent = function (event) {
        this.PlaySound(event.Key, event.Loops);
    };
    SoundModule.prototype.OnBgmControlEvent = function (event) {
        switch (event.controlType) {
            case BgmControlType.Play:
                {
                    this.PlayBgm(event.bgmStage, 0);
                    break;
                }
            case BgmControlType.Stop:
                {
                    if (this.CheckStageValidity(event.bgmStage))
                        this.StopBgm();
                    break;
                }
            case BgmControlType.FadeIn:
                {
                    if (this.CheckStageValidity(event.bgmStage))
                        this.FadeBgm(true, event.controlParam);
                    break;
                }
            case BgmControlType.FadeOut:
                {
                    if (this.CheckStageValidity(event.bgmStage))
                        this.FadeBgm(false, event.controlParam);
                    break;
                }
            case BgmControlType.Pause:
                {
                    if (this.CheckStageValidity(event.bgmStage))
                        this.PauseBgm();
                    break;
                }
            case BgmControlType.Resume:
                {
                    this.ResumeBgm(event.bgmStage);
                    break;
                }
            default:
                console.error("Unknow Bgm Control Type");
        }
    };
    SoundModule.prototype.LoadBgm = function (stage) {
        var bgmRes;
        if (stage == BgmStage.Global) {
            bgmRes = "bgm_mp3";
        }
        else if (stage == BgmStage.Fever) {
            bgmRes = "fever_bgm_mp3";
        }
        else {
            console.error("Unknow Bgm Stage:" + stage);
            return;
        }
        var sound = this.mResModule.GetRes(bgmRes);
        sound.type = egret.Sound.MUSIC;
        return sound;
    };
    SoundModule.prototype.PlayBgm = function (stage, pos) {
        if (this.mCurBgmStage != undefined || this.mCurBgmStage != null) {
            if (true) {
                console.error("BGM is playing, stop first then play again:" + this.mCurBgmStage);
            }
            return;
        }
        this.mBgmSoundRes = this.LoadBgm(stage);
        this.mCurBgmStage = stage;
        this.PlayBgmInternal(pos);
    };
    SoundModule.prototype.PlayBgmInternal = function (pos) {
        //每次都只播放一遍，时间到了再播放一遍，模拟loop的效果
        this.mBgmChannel = this.mBgmSoundRes.play(pos, -1);
        this.mBgmLoopTimer = new egret.Timer((this.mBgmSoundRes.length - pos) * 1000, 1);
        this.mBgmLoopTimer.addEventListener(egret.TimerEvent.TIMER, this.OnBgmLoopTimer, this);
        this.mBgmLoopTimer.start();
    };
    SoundModule.prototype.OnBgmLoopTimer = function (event) {
        if (this.mCurBgmStage == undefined || this.mCurBgmStage == null) {
            if (true) {
                console.error("No BGM when BgmLoopTimer trigger");
            }
            return;
        }
        this.mBgmChannel.stop();
        this.PlayBgmInternal(0);
    };
    SoundModule.prototype.StopBgm = function () {
        if (this.mCurBgmStage == undefined || this.mCurBgmStage == null) {
            if (true) {
                console.error("No BGM is playing:Stop");
            }
            return;
        }
        this.mBgmChannel.stop();
        this.mBgmLoopTimer.stop();
        this.mBgmChannel = null;
        var stageId = this.mCurBgmStage;
        this.mBgmPausePosDic[stageId] = null;
        this.mCurBgmStage = null;
        this.mBgmSoundRes = null;
        this.mBgmLoopTimer = null;
    };
    SoundModule.prototype.FadeBgm = function (fadeIn, fadeSpeed) {
        if (this.mCurBgmStage == undefined || this.mCurBgmStage == null) {
            if (true) {
                console.error("No BGM is playing:Fade");
            }
            return;
        }
        var fadeParam = new SoundFadeParam();
        fadeParam.channel = this.mBgmChannel;
        fadeParam.fadeIn = fadeIn;
        fadeParam.speed = fadeSpeed;
        this.mFadeParamArray.push(fadeParam);
    };
    SoundModule.prototype.PauseBgm = function () {
        if (this.mCurBgmStage == undefined || this.mCurBgmStage == null) {
            if (true) {
                console.error("No BGM is playing:Pause");
            }
            return;
        }
        var pos = this.mBgmChannel.position;
        var stageId = this.mCurBgmStage;
        this.StopBgm();
        this.mBgmPausePosDic[stageId] = pos;
    };
    SoundModule.prototype.ResumeBgm = function (stage) {
        if (this.mCurBgmStage != undefined || this.mCurBgmStage != null) {
            if (true) {
                console.error("Can not play multi bgm:Resume");
            }
            return;
        }
        var stageId = stage;
        this.PlayBgm(stage, this.mBgmPausePosDic[stageId]);
        this.mBgmPausePosDic[stageId] = null;
    };
    SoundModule.prototype.CheckStageValidity = function (stage) {
        return stage == this.mCurBgmStage;
    };
    SoundModule.prototype.SoundHitBoxResReady = function () {
        return this.soundHitBoxResReady;
    };
    return SoundModule;
}(ModuleBase));
__reflect(SoundModule.prototype, "SoundModule", ["ISoundModule", "IModule"]);
var SoundFadeParam = (function () {
    function SoundFadeParam() {
    }
    return SoundFadeParam;
}());
__reflect(SoundFadeParam.prototype, "SoundFadeParam");
var BgmStage;
(function (BgmStage) {
    BgmStage[BgmStage["Global"] = 0] = "Global";
    BgmStage[BgmStage["Fever"] = 1] = "Fever";
})(BgmStage || (BgmStage = {}));
//# sourceMappingURL=SoundModule.js.map