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
var SuperVirus = (function (_super) {
    __extends(SuperVirus, _super);
    function SuperVirus() {
        var _this = _super.call(this) || this;
        _this.color = _this.RandomColor();
        _this.hp = _this.maxHp = 3;
        _this.shield = 0;
        _this.virusRenderer = new SceneSuperVirus(_this);
        _this.virusRenderer.RefreshTexture();
        _this.placeholderArray = [];
        //每个super virus都由八个元素组成，renderer固定都放在第一个
        _this.placeholderArray.push(_this.virusRenderer);
        for (var i = 0; i < 7; ++i) {
            _this.placeholderArray.push(new ScenePlaceholder(_this));
        }
        _this.ArrangeSceneElementsPosByColor();
        _this.bornType = NpcBornType.DestroyObstruction;
        _this.bornSound = "VirusBorn_mp3";
        _this.eliminateEvent = new SuperVirusEliminateEvent();
        return _this;
    }
    SuperVirus.prototype.MoveTo = function (posx, posy) {
        //this.pos是super virus左上角点的位置
        this.posx = posx;
        this.posy = posy;
        for (var i = 0; i < this.placeholderArray.length; ++i) {
            this.placeholderArray[i].Move(posx, posy);
        }
    };
    SuperVirus.prototype.FillSceneElementArray = function () {
        for (var i = 0; i < this.placeholderArray.length; ++i) {
            this.sceneElements.push(this.placeholderArray[i]);
        }
    };
    SuperVirus.prototype.PlayAnim = function (animType) {
    };
    SuperVirus.prototype.SetRenderAlpha = function (alpha) {
        this.virusRenderer.renderer.alpha = alpha;
    };
    SuperVirus.prototype.ArrangeSceneElementsPosByColor = function () {
        if (this.color == GameElementColor.red) {
            //2x4
            // @@
            // @@
            // @@
            // @@
            this.blockWidth = 2;
            this.blockHeight = 4;
            this.placeholderArray[0].MoveTo(0, 0);
            this.placeholderArray[1].MoveTo(1, 0);
            this.placeholderArray[2].MoveTo(0, 1);
            this.placeholderArray[3].MoveTo(1, 1);
            this.placeholderArray[4].MoveTo(0, 2);
            this.placeholderArray[5].MoveTo(1, 2);
            this.placeholderArray[6].MoveTo(0, 3);
            this.placeholderArray[7].MoveTo(1, 3);
        }
        else if (this.color == GameElementColor.blue) {
            //3x3
            // @@@
            // @ @
            // @@@
            this.blockWidth = 3;
            this.blockHeight = 3;
            this.placeholderArray[0].MoveTo(0, 0);
            this.placeholderArray[1].MoveTo(1, 0);
            this.placeholderArray[2].MoveTo(2, 0);
            this.placeholderArray[3].MoveTo(0, 1);
            this.placeholderArray[4].MoveTo(2, 1);
            this.placeholderArray[5].MoveTo(0, 2);
            this.placeholderArray[6].MoveTo(1, 2);
            this.placeholderArray[7].MoveTo(2, 2);
        }
        else if (this.color == GameElementColor.yellow) {
            //4x2
            // @@@@
            // @@@@
            this.blockWidth = 4;
            this.blockHeight = 2;
            this.placeholderArray[0].MoveTo(0, 0);
            this.placeholderArray[1].MoveTo(1, 0);
            this.placeholderArray[2].MoveTo(2, 0);
            this.placeholderArray[3].MoveTo(3, 0);
            this.placeholderArray[4].MoveTo(0, 1);
            this.placeholderArray[5].MoveTo(1, 1);
            this.placeholderArray[6].MoveTo(2, 1);
            this.placeholderArray[7].MoveTo(3, 1);
        }
    };
    SuperVirus.prototype.OnEliminate = function () {
        if (!this.hasReduceHpThisRound) {
            var oldHp = this.hp;
            var oldShield = this.shield;
            _super.prototype.OnEliminate.call(this);
            this.virusRenderer.SetHpBarProgress(this.GetRemainHpPercentage());
            this.eliminateEvent.hpChange = oldHp - this.hp;
            this.eliminateEvent.shieldChange = oldShield - this.shield;
            this.eliminateEvent.superVirus = this;
            GameMain.GetInstance().DispatchEvent(this.eliminateEvent);
        }
        return true;
    };
    SuperVirus.prototype.SkillType = function () {
        if (this.color == GameElementColor.blue) {
            return NpcSkillType.AddShieldForVirus;
        }
        else if (this.color == GameElementColor.red) {
            return NpcSkillType.ChangePillToVirus;
        }
        else if (this.color == GameElementColor.yellow) {
            return NpcSkillType.ChangeVirusColor;
        }
        else {
            return NpcSkillType.None;
        }
    };
    SuperVirus.prototype.GetMainSceneElement = function () {
        return this.virusRenderer;
    };
    SuperVirus.prototype.GetPreViewContainer = function () {
        console.error("Not Implement Error");
        return null;
    };
    return SuperVirus;
}(NpcElement));
__reflect(SuperVirus.prototype, "SuperVirus");
//# sourceMappingURL=SuperVirus.js.map