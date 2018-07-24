var InputKey;
(function (InputKey) {
    InputKey[InputKey["Left"] = 0] = "Left";
    InputKey[InputKey["Right"] = 1] = "Right";
    InputKey[InputKey["Up"] = 2] = "Up";
    InputKey[InputKey["Down"] = 3] = "Down";
    InputKey[InputKey["Rotate"] = 4] = "Rotate";
    InputKey[InputKey["Max"] = 5] = "Max";
})(InputKey || (InputKey = {}));
var INPUT_MOVE_EVENT_DIS_RATE_HOR = 0.08; //手指左右移动没有上下移动范围大
var INPUT_MOVE_EVENT_DIS_RATE_VER = 0.1;
//# sourceMappingURL=IInputModule.js.map