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
var MatchModule = (function (_super) {
    __extends(MatchModule, _super);
    function MatchModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.matchState = MatchState.None;
        return _this;
    }
    MatchModule.prototype.CreateView = function () {
        GameMain.GetInstance().AddEventListener(PlayerControlFinishEvent.EventName, this.StartSceneEliminate, this);
        GameMain.GetInstance().AddEventListener(SceneEliminateFinishEvent.EventName, this.OnSceneEliminateFinish, this);
        GameMain.GetInstance().AddEventListener(NpcControlFinishEvent.EventName, this.OnNpcControlFinish, this);
        GameMain.GetInstance().AddEventListener(GameOverEvent.EventName, this.OnGameOver, this);
        GameMain.GetInstance().AddEventListener(ReplayGameEvent.EventName, this.OnReplayGame, this);
        GameMain.GetInstance().AddEventListener(ReviveEvent.EventName, this.OnRevive, this);
        GameMain.GetInstance().AddEventListener(SceneElementMoveUpEvent.EventName, this.OnSceneElementMoveUpFinish, this);
        GameMain.GetInstance().AddEventListener(PauseEvent.EventName, this.OnPause, this);
        this.pause = false;
        this.InitComponents();
        this.matchView = new MatchView();
        this.matchView.SetScene(this.scene);
        this.matchView.SetMatchScore(this.matchScore);
        this.matchView.CreateView();
        this.gameViewList.push(this.matchView);
        this.feverControl.AttachToHUD();
        this.InitMatch();
        return true;
    };
    MatchModule.prototype.ReleaseView = function () {
        _super.prototype.ReleaseView.call(this);
        this.DeInitComponents();
        GameMain.GetInstance().RemoveEventListener(PlayerControlFinishEvent.EventName, this.StartSceneEliminate, this);
        GameMain.GetInstance().RemoveEventListener(SceneEliminateFinishEvent.EventName, this.OnSceneEliminateFinish, this);
        GameMain.GetInstance().RemoveEventListener(NpcControlFinishEvent.EventName, this.OnNpcControlFinish, this);
        GameMain.GetInstance().RemoveEventListener(GameOverEvent.EventName, this.OnGameOver, this);
        GameMain.GetInstance().RemoveEventListener(ReplayGameEvent.EventName, this.OnReplayGame, this);
        GameMain.GetInstance().RemoveEventListener(ReviveEvent.EventName, this.OnRevive, this);
        GameMain.GetInstance().RemoveEventListener(SceneElementMoveUpEvent.EventName, this.OnSceneElementMoveUpFinish, this);
        GameMain.GetInstance().RemoveEventListener(PauseEvent.EventName, this.OnPause, this);
    };
    MatchModule.prototype.InitComponents = function () {
        this.scene = new Scene();
        this.scene.Init();
        this.gameplayElementFactory = new GameplayElementFactory();
        this.playerControl = new PlayerControl(this.gameplayElementFactory);
        this.playerControl.Init();
        this.npcControl = new NpcControl(this.gameplayElementFactory);
        this.npcControl.Init();
        this.matchScore = new MatchScore();
        this.matchScore.Init();
        this.feverControl = new FeverControl();
        this.feverControl.Init();
        this.comboControl = new ComboControl();
        this.comboControl.Init();
        this.controlWorkParam = new GameplayControlWorkParam();
        this.difficulty = 0;
        this.turn = 0;
    };
    MatchModule.prototype.DeInitComponents = function () {
        this.scene.Release();
        this.scene = null;
        this.playerControl.Release();
        this.playerControl = null;
        this.npcControl.Release();
        this.npcControl = null;
        this.matchScore.Release();
        this.matchScore = null;
        this.feverControl.Release();
        this.feverControl = null;
        this.comboControl.Release();
        this.comboControl = null;
    };
    MatchModule.prototype.SwitchForeOrBack = function (from, to) {
        this.isForeground = to == GameStateType.Match;
    };
    MatchModule.prototype.Update = function (deltaTime) {
        _super.prototype.Update.call(this, deltaTime);
        if (!this.pause) {
            this.scene.Update(deltaTime);
            this.playerControl.Update(deltaTime);
            this.npcControl.Update(deltaTime);
            this.feverControl.Update(deltaTime);
        }
    };
    MatchModule.prototype.InitMatch = function () {
        this.difficulty = 0;
        this.turn = 0;
        this.matchState = MatchState.Init;
        this.StartNpcControl();
    };
    MatchModule.prototype.StartSceneEliminate = function (event) {
        if (this.matchState == MatchState.GameOver)
            return;
        this.matchState = MatchState.Eliminate;
        this.playerControl.Sleep();
        this.scene.Work();
    };
    MatchModule.prototype.OnSceneEliminateFinish = function (event) {
        if (this.matchState == MatchState.GameOver)
            return;
        this.comboControl.ResetCombo();
        this.StartNpcControl();
    };
    MatchModule.prototype.StartNpcControl = function () {
        if (this.matchState == MatchState.GameOver)
            return;
        this.matchState = MatchState.NpcControl;
        this.scene.Sleep();
        this.controlWorkParam.difficulty = this.difficulty;
        this.controlWorkParam.turn = this.turn;
        this.npcControl.Work(this.controlWorkParam);
    };
    MatchModule.prototype.OnNpcControlFinish = function (event) {
        if (this.matchState == MatchState.GameOver)
            return;
        if (event.specialEliminateMethod != null) {
            this.npcControl.Sleep();
            this.StartSpecialSceneEliminate(event.specialEliminateMethod);
        }
        else if (event.bossSkillInfo != null) {
            this.StartNpcSkill(event);
        }
        else if (event.moveUpFinish) {
            this.StartSceneEliminate(null);
        }
        else {
            this.StartPlayerControl();
        }
    };
    MatchModule.prototype.StartPlayerControl = function () {
        if (this.matchState == MatchState.GameOver)
            return;
        this.matchState = MatchState.PlayerControl;
        this.AddTurn();
        this.npcControl.Sleep();
        this.controlWorkParam.difficulty = this.difficulty;
        this.controlWorkParam.turn = this.turn;
        this.playerControl.Work(this.controlWorkParam);
    };
    MatchModule.prototype.StartSpecialSceneEliminate = function (specialEliminateMethod) {
        if (this.matchState == MatchState.GameOver)
            return;
        this.matchState = MatchState.SpecialEliminate;
        this.scene.SetEliminateMethodNext(specialEliminateMethod);
        this.scene.SetNextEliminateUnMove();
        this.scene.Work();
    };
    MatchModule.prototype.StartNpcSkill = function (event) {
        if (this.matchState == MatchState.GameOver)
            return;
        this.matchState = MatchState.NpcSkill;
        this.npcControl.Sleep();
        this.scene.TriggerBossSkill(event.bossSkillInfo);
        this.scene.Work();
    };
    MatchModule.prototype.OnGameOver = function (event) {
        this.matchState = MatchState.GameOver;
        this.playerControl.OnGameOver();
        this.npcControl.OnGameOver();
        this.playerControl.Sleep();
        this.npcControl.Sleep();
        this.scene.Sleep();
    };
    MatchModule.prototype.OnSceneElementMoveUpFinish = function (event) {
        if (this.matchState == MatchState.GameOver)
            return;
        if (!event.isMoveSuccess) {
            //上移失败，gameover
            var gameOverEvent = new GameOverEvent();
            GameMain.GetInstance().DispatchEvent(gameOverEvent);
        }
    };
    MatchModule.prototype.OnReplayGame = function (event) {
        if (this.matchState == MatchState.GameOver) {
            this.DeInitComponents();
            this.InitComponents();
            this.matchView.SetScene(this.scene);
            this.feverControl.AttachToHUD();
            this.InitMatch();
        }
    };
    MatchModule.prototype.OnRevive = function (event) {
        if (this.matchState == MatchState.GameOver) {
            var method = new EliminateMethod();
            method.froceKill = true;
            method.methodType = EliminateMethodType.SpecificRegion;
            method.eliminateElementType = EliminateElementType.PillAndVirus;
            method.specificRegion = Tools.GetRegionPosList(0, 0, Scene.Columns - 1, Procedure_ReviveEliminateLine - 1);
            this.matchState = MatchState.SpecialEliminate;
            this.StartSpecialSceneEliminate(method);
        }
    };
    MatchModule.prototype.OnPause = function (event) {
        if (this.matchState == MatchState.GameOver)
            return;
        if (this.pause == event.pause)
            return;
        this.pause = event.pause;
        GameMain.GetInstance().SetPause(this.pause);
        var hudEvent = new HUDEvent();
        hudEvent.eventType = this.pause ? HUDEventType.ShowPauseMenu : HUDEventType.HidePauseMenu;
        GameMain.GetInstance().DispatchEvent(hudEvent);
        //play pause sound
        if (this.pause) {
            var playSoundEvent = new PlaySoundEvent("Pause_mp3", 1);
            GameMain.GetInstance().DispatchEvent(playSoundEvent);
            var bgmControlEvent = new BgmControlEvent();
            bgmControlEvent.bgmStage = this.feverControl.IsInFeverState() ? BgmStage.Fever : BgmStage.Global;
            bgmControlEvent.controlType = BgmControlType.Pause;
            GameMain.GetInstance().DispatchEvent(bgmControlEvent);
        }
        else {
            var bgmControlEvent = new BgmControlEvent();
            bgmControlEvent.bgmStage = this.feverControl.IsInFeverState() ? BgmStage.Fever : BgmStage.Global;
            bgmControlEvent.controlType = BgmControlType.Resume;
            GameMain.GetInstance().DispatchEvent(bgmControlEvent);
        }
    };
    MatchModule.prototype.AddTurn = function () {
        this.turn++;
        this.playerControl.AddTurn();
        var event = new HUDEvent();
        event.eventType = HUDEventType.ChangeStep;
        event.param = this.turn;
        GameMain.GetInstance().DispatchEvent(event);
    };
    return MatchModule;
}(GameViewModule));
__reflect(MatchModule.prototype, "MatchModule");
var MatchState;
(function (MatchState) {
    MatchState[MatchState["None"] = 0] = "None";
    MatchState[MatchState["Init"] = 1] = "Init";
    MatchState[MatchState["NpcControl"] = 2] = "NpcControl";
    MatchState[MatchState["PlayerControl"] = 3] = "PlayerControl";
    MatchState[MatchState["SpecialEliminate"] = 4] = "SpecialEliminate";
    MatchState[MatchState["Eliminate"] = 5] = "Eliminate";
    MatchState[MatchState["NpcSkill"] = 6] = "NpcSkill";
    MatchState[MatchState["GameOver"] = 7] = "GameOver"; //拜拜了
})(MatchState || (MatchState = {}));
var GameMode;
(function (GameMode) {
    GameMode[GameMode["Classic"] = 0] = "Classic";
    GameMode[GameMode["BossFight"] = 1] = "BossFight";
})(GameMode || (GameMode = {}));
//# sourceMappingURL=MatchModule.js.map