//一些时间
var Time_AddNpcToSceneIntervalMax = 200; //ms
var Time_AddNpcToSceneIntervalMin = 70; //ms
var Time_AddNpcToSceneIntervalStep = 10; //ms
var Time_PlayEnemySinisterSmileTime = 500; //ms
var Time_FeverTime = 45000; //ms
//Boss技能
var skillBossMaxNum = 8;
//分辨率参数
var Screen_StanderScreenWidth = 640;
var Screen_StanderScreenHeight = 1136;
//消除相关
var EliminateRoundInMoveUp = 0; // 生成小怪时，上移的消除事件。Round的值
var EliminateRoundStartIndex = 1;
var Eliminate_NextCentainEliminateToolTurn = 10;
var Eliminate_Delay_One_Step = 70; // 每距离一个格子的消除延迟
var Eliminate_Delay_One_Step_CrossEliminater = 55; //  每距离一个格子的消除延迟(特殊消除)
var Eliminate_Delay_One_Step_Boom = 70; //  每距离一个格子的消除延迟(炸弹)
//分数相关
var Score_FeverTimeScale = 2; // FeverTime期间的分数倍率
var Score_EliminateRoundScale = [1, 2, 3, 4, 5]; // 连消的分数倍率
var Score_BaseScore = 60;
//游戏流程相关
var Procedure_ReviveEliminateLine = 5;
var Procedure_InitCreateEnemyLine = 3;
var TurnNum_BossSkillTurnNum = 3;
var TurnNum_CreateEnemyTurnNum = 25;
var TurnNum_CreateSkillBossTurnNum = 5;
var TurnNum_BossSkillTargetNum = 5;
//难度系数
var Difficulty_CreateEnemyTurnNum = [22, 10, 8, 22, 10, 10, 18, 15, 12, 15];
var Difficulty_CreateEnmeyLineNum = [3, 2, 1, 2, 3, 2, 2, 4, 2, 4];
var Difficulty_ShieldProperty = [0.1, 0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.35, 0.35, 0.4];
// const Difficulty_CreateEnemyTurnNum = [5, 10, 10];
// const Difficulty_CreateEnmeyLineNum = [1,  2,  3];
// const Difficulty_ShieldProperty =     [0.5,  0,  1];
var Difficulty_MaxDifficulty = 10;
var Difficulty_DropDownSpeedUpTurn1 = 40;
var Difficulty_DropDownSpeedUpTurn2 = 82;
var Difficulty_DropDownSpeedUpTurn3 = 127;
var Difficulty_DropDownSpeedUpTurn4 = 160;
var Difficulty_DropDownSpeedUpStep = 100; //ms
var Difficulty_DropDownMinInterval = 600; //ms
var Difficulty_DropDownMaxInterval = 1000; //ms 
// 动画相关
var Frame_Anim_SceneBoom = ["Boom1", "Boom2"];
var Frame_Anim_SceneBoom_Effect = ["BoomEffect1", "BoomEffect2", "BoomEffect3", "BoomEffect4", "BoomEffect5",
    "BoomEffect6", "BoomEffect7", "BoomEffect8", "BoomEffect9", "BoomEffect10"];
var Frame_Anim_CrossEliminater = ["Cross_huojian1", "Cross_huojian2"];
var Frame_Anim_CrossEliminater_Diretion = ["Cross_zhixiang1", "Cross_zhixiang2", "Cross_zhixiang3"];
var Frame_Anim_CrossEliminater_fashe = ["Cross_fashe1", "Cross_fashe2", "Cross_fashe3", "Cross_fashe4",
    "Cross_fashe5", "Cross_fashe6", "Cross_fashe7", "Cross_fashe8", "Cross_fashe9"];
var Frame_Anim_CrossEliminater_tuowei = ["tuowei1", "tuowei2", "tuowei3", "tuowei4", "tuowei5", "tuowei6",
    "tuowei7", "tuowei8", "tuowei9", "tuowei10", "tuowei11", "tuowei12"];
var Frame_Anim_Virus_Red_Idle = ["Virus_Red_Idle1", "Virus_Red_Idle1", "Virus_Red_Idle1", "Virus_Red_Idle4", "Virus_Red_Idle5", "Virus_Red_Idle6",
    "Virus_Red_Idle6", "Virus_Red_Idle6", "Virus_Red_Idle9", "Virus_Red_Idle10"];
var Frame_Anim_Virus_Blue_Idle = ["Virus_Blue_Idle1", "Virus_Blue_Idle1", "Virus_Blue_Idle1", "Virus_Blue_Idle4", "Virus_Blue_Idle5", "Virus_Blue_Idle6",
    "Virus_Blue_Idle6", "Virus_Blue_Idle6", "Virus_Blue_Idle9", "Virus_Blue_Idle10"];
var Frame_Anim_Virus_Yellow_Idle = ["Virus_Yellow_Idle1", "Virus_Yellow_Idle1", "Virus_Yellow_Idle1", "Virus_Yellow_Idle4", "Virus_Yellow_Idle5", "Virus_Yellow_Idle6",
    "Virus_Yellow_Idle6", "Virus_Yellow_Idle6", "Virus_Yellow_Idle9", "Virus_Yellow_Idle10"];
var Frame_Anim_Virus_Red_Fever = ["Virus_Red_Fever1", "Virus_Red_Fever2", "Virus_Red_Fever3", "Virus_Red_Fever4"];
var Frame_Anim_Virus_Blue_Fever = ["Virus_Blue_Fever1", "Virus_Blue_Fever2", "Virus_Blue_Fever3", "Virus_Blue_Fever4"];
var Frame_Anim_Virus_Yellow_Fever = ["Virus_Yellow_Fever1", "Virus_Yellow_Fever2", "Virus_Yellow_Fever3", "Virus_Yellow_Fever4"];
var Frame_Anim_Pill_Land_Effect = ["LuoDi_00000", "LuoDi_00001", "LuoDi_00002", "LuoDi_00003",
    "LuoDi_00004", "LuoDi_00005", "LuoDi_00006", "LuoDi_00007", "LuoDi_00008", "LuoDi_00009", "LuoDi_00010"];
var Frame_Anim_Pill_Boom_Effect = ["Pill_Boom_01", "Pill_Boom_02", "Pill_Boom_03", "Pill_Boom_04", "Pill_Boom_05", "Pill_Boom_06"];
// 弹球游戏相关
var Collision_Layer_Ball = Math.pow(2, 0);
var Collision_Layer_Box = Math.pow(2, 1);
var BallEmitCountPerSecondBase = 4; // 基础发射频率（个/秒）
var BallEmitCountPerLevelUp = 0.6; // 每升一级增加的发射频率（个/秒）
var BallEmitCountPerSecond_Skill_FireUp = 2; //加速道具的加速倍数
var BoxMoveSpeed = 10; // 方块移动速度
var BoxCreateCountPerSecond = 0.7; //方块生成速度（个/秒）
var BoxHealthIncreasePerSecond_TimeZone = [2 * 60000, 4 * 60000, 6 * 60000, 9 * 60000]; //Box每秒增加的血量，时间区间
var BoxHealthIncreasePerSecond_Speed = [0.25, 0.3, 0.4, 0.6, 1]; //Box每秒增加的血量，时间区间对应的血量增加速度
var BoxLineWidth = 4;
var BoxBackGroundAlpha = 0.2;
var BoxSquareAndTriangleRate = 0.7; // 四边形和三角形的生成比例
var BoxHitHideCDTime = 30;
var BoxHitSoundCDTime = 100;
var BallEmitSoundCDTime = 30;
var GameOverCenterSize = new egret.Point(50, 50); // 中心的死亡区域判定范围
var SpecialBoxRandomBirthPos_Stage_Range = 0.6;
var SpecialBoxRandomBirthPos_Center_Offset = 150;
var BoxColorPool = [0xff8526, 0xd6340a, 0xf1be22, 0x11fdff, 0x59d61b, 0x3562ec, 0x6726a5];
var ScorePerBox = 1;
var Box_Effect_Pause_Time_Default = 5000; // 定时道具的持续时间
var Box_Effect_MultipleDirections_Time_Default = 5000; // 变身道具的持续时间
var Box_Effect_FireUp_Time_Default = 5000; // 全力开火的持续时间
var Box_Effect_Gold_Coin_Default = 20; // 金币增加数量
var Lotty_Ball_Cost = 200; // 抽球的加个
var Lotty_Ball_Back = 160; // 抽球到已经有的球，返回的金币数量
var Share_Add_Coin_Count = 300; // 分享获得金币数量
var New_Player_Free_Ball_Id = 5; // 首次购买免费的球（美猴王）
//# sourceMappingURL=GameConfig.js.map