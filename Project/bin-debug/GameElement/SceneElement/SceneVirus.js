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
var SceneVirus = (function (_super) {
    __extends(SceneVirus, _super);
    function SceneVirus(owner) {
        var _this = _super.call(this, owner) || this;
        _this.color = _this.RandomColor();
        _this.renderer = new egret.Bitmap();
        _this.accessory = new egret.DisplayObjectContainer();
        _this.canDrop = true;
        _this.eliminateMinCount = Scene.EliminateMinCount;
        _this.elementType = SceneElementType.Virus;
        _this.RefreshTexture();
        _this.eliminateSound = "VirusEliminate_mp3";
        _this.animType = SceneVirusAnimType.Idle;
        return _this;
    }
    SceneVirus.prototype.GetAnimDelay = function () {
        var delay = 0;
        if (this.animType == SceneVirusAnimType.Idle) {
            switch (this.color) {
                case GameElementColor.red:
                    delay = 0;
                    break;
                case GameElementColor.blue:
                    delay = 250;
                    break;
                case GameElementColor.yellow:
                    delay = 500;
                    break;
            }
        }
        return delay;
    };
    SceneVirus.prototype.GetFramesAnimIdle = function () {
        if (this.color == GameElementColor.red) {
            return Frame_Anim_Virus_Red_Idle;
        }
        else if (this.color == GameElementColor.blue) {
            return Frame_Anim_Virus_Blue_Idle;
        }
        else if (this.color == GameElementColor.yellow) {
            return Frame_Anim_Virus_Yellow_Idle;
        }
        return [];
    };
    SceneVirus.prototype.GetFramesAnimFever = function () {
        if (this.color == GameElementColor.red) {
            return Frame_Anim_Virus_Red_Fever;
        }
        else if (this.color == GameElementColor.blue) {
            return Frame_Anim_Virus_Blue_Fever;
        }
        else if (this.color == GameElementColor.yellow) {
            return Frame_Anim_Virus_Yellow_Fever;
        }
        return [];
    };
    SceneVirus.prototype.GetCurAnimSeq = function () {
        if (this.animType == SceneVirusAnimType.Idle) {
            return this.GetFramesAnimIdle();
        }
        else if (this.animType == SceneVirusAnimType.Fever) {
            return this.GetFramesAnimFever();
        }
        return [];
    };
    SceneVirus.prototype.SetFeverState = function (isFever) {
        _super.prototype.SetFeverState.call(this, isFever);
        var lastAnimType = this.animType;
        this.animType = isFever ? SceneVirusAnimType.Fever : SceneVirusAnimType.Idle;
        if (lastAnimType != this.animType) {
            this.RefreshTexture();
        }
    };
    SceneVirus.prototype.GetAnimIntervel = function () {
        if (this.animType == SceneVirusAnimType.Idle) {
            return 100;
        }
        else if (this.animType == SceneVirusAnimType.Fever) {
            return 150;
        }
        return 0;
    };
    SceneVirus.prototype.CreateFramesAnim = function () {
        var framesAnim = new SyncFramesAnim();
        framesAnim.Init(this.renderer, this.GetCurAnimSeq(), this.GetAnimIntervel(), this.GetAnimDelay());
        return framesAnim;
    };
    SceneVirus.prototype.RefreshTexture = function () {
        this.framesAnim = this.CreateFramesAnim();
    };
    SceneVirus.prototype.GetResPrePath = function () {
        var path = "pd_res_json.Virus_";
        switch (this.color) {
            case GameElementColor.red:
                path += "Red";
                break;
            case GameElementColor.blue:
                path += "Blue";
                break;
            case GameElementColor.yellow:
                path += "Yellow";
                break;
            default:
                if (true) {
                    console.log("Unknow Color:" + this.color);
                }
                break;
        }
        return path;
    };
    SceneVirus.prototype.GetResPathByColor = function () {
        return this.GetResPrePath() + "_Idle1";
    };
    SceneVirus.prototype.PlayEliminateAnim = function () {
        this.PlayBoomEffect();
        this.PlayScaling();
        this.PlayEliminateSound();
    };
    return SceneVirus;
}(SceneElementBase));
__reflect(SceneVirus.prototype, "SceneVirus");
var SceneVirusAnimType;
(function (SceneVirusAnimType) {
    SceneVirusAnimType[SceneVirusAnimType["Idle"] = 0] = "Idle";
    SceneVirusAnimType[SceneVirusAnimType["Fever"] = 1] = "Fever";
})(SceneVirusAnimType || (SceneVirusAnimType = {}));
//# sourceMappingURL=SceneVirus.js.map