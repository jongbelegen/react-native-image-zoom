"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnimationEnd = void 0;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
var _types = require("../types");
const ANIMATION_VALUES = [_types.ANIMATION_VALUE.SCALE, _types.ANIMATION_VALUE.FOCAL_X, _types.ANIMATION_VALUE.FOCAL_Y, _types.ANIMATION_VALUE.TRANSLATE_X, _types.ANIMATION_VALUE.TRANSLATE_Y];
const isAnimationComplete = endValues => {
  'worklet';

  return ANIMATION_VALUES.every(item => !!endValues[item]);
};
const useAnimationEnd = onResetAnimationEnd => {
  const endValues = (0, _reactNativeReanimated.useSharedValue)({});
  const onAnimationEnd = (0, _react.useCallback)((interactionId, value, finished, current) => {
    'worklet';

    if (onResetAnimationEnd) {
      const currentEndValues = endValues.value[interactionId] || {};
      currentEndValues[value] = {
        finished,
        current
      };
      if (isAnimationComplete(currentEndValues)) {
        const completed = !Object.values(currentEndValues).some(item => !item.finished);
        (0, _reactNativeReanimated.runOnJS)(onResetAnimationEnd)(completed, currentEndValues);
        delete endValues.value[interactionId];
      } else {
        endValues.value[interactionId] = currentEndValues;
      }
    }
  }, [onResetAnimationEnd, endValues.value]);
  return {
    onAnimationEnd
  };
};
exports.useAnimationEnd = useAnimationEnd;
//# sourceMappingURL=useAnimationEnd.js.map