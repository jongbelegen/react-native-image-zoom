import { useCallback } from 'react';
import { runOnJS, useSharedValue } from 'react-native-reanimated';
import { ANIMATION_VALUE } from '../types';
const ANIMATION_VALUES = [ANIMATION_VALUE.SCALE, ANIMATION_VALUE.FOCAL_X, ANIMATION_VALUE.FOCAL_Y, ANIMATION_VALUE.TRANSLATE_X, ANIMATION_VALUE.TRANSLATE_Y];
const isAnimationComplete = endValues => {
  'worklet';

  return ANIMATION_VALUES.every(item => !!endValues[item]);
};
export const useAnimationEnd = onResetAnimationEnd => {
  const endValues = useSharedValue({});
  const onAnimationEnd = useCallback((interactionId, value, finished, current) => {
    'worklet';

    if (onResetAnimationEnd) {
      const currentEndValues = endValues.value[interactionId] || {};
      currentEndValues[value] = {
        finished,
        current
      };
      if (isAnimationComplete(currentEndValues)) {
        const completed = !Object.values(currentEndValues).some(item => !item.finished);
        runOnJS(onResetAnimationEnd)(completed, currentEndValues);
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
//# sourceMappingURL=useAnimationEnd.js.map