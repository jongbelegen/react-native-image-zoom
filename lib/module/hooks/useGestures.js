import { useCallback, useRef } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withDecay, withTiming } from 'react-native-reanimated';
import { clamp } from '../utils/clamp';
import { limits } from '../utils/limits';
import { sum } from '../utils/sum';
import { ANIMATION_VALUE, ZOOM_TYPE } from '../types';
import { useInteractionId } from './useInteractionId';
import { useAnimationEnd } from './useAnimationEnd';
import { usePanGestureCount } from './usePanGestureCount';
export const useGestures = _ref => {
  let {
    width,
    height,
    center,
    minScale = 1,
    maxScale = 5,
    doubleTapScale = 3,
    minPanPointers = 2,
    maxPanPointers = 2,
    isPanEnabled = true,
    isPinchEnabled = true,
    isSingleTapEnabled = false,
    isDoubleTapEnabled = false,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
    onSingleTap = () => {},
    onDoubleTap = () => {},
    onResetAnimationEnd
  } = _ref;
  const isInteracting = useRef(false);
  const isPinching = useRef(false);
  const {
    isPanning,
    startPan,
    endPan
  } = usePanGestureCount();
  const savedScale = useSharedValue(1);
  const scale = useSharedValue(1);
  const initialFocal = {
    x: useSharedValue(0),
    y: useSharedValue(0)
  };
  const savedFocal = {
    x: useSharedValue(0),
    y: useSharedValue(0)
  };
  const focal = {
    x: useSharedValue(0),
    y: useSharedValue(0)
  };
  const savedTranslate = {
    x: useSharedValue(0),
    y: useSharedValue(0)
  };
  const translate = {
    x: useSharedValue(0),
    y: useSharedValue(0)
  };
  const {
    getInteractionId,
    updateInteractionId
  } = useInteractionId();
  const {
    onAnimationEnd
  } = useAnimationEnd(onResetAnimationEnd);
  const moveIntoView = () => {
    'worklet';

    if (scale.value > 1) {
      const rightLimit = limits.right(width, scale);
      const leftLimit = -rightLimit;
      const bottomLimit = limits.bottom(height, scale);
      const topLimit = -bottomLimit;
      const totalTranslateX = sum(translate.x, focal.x);
      const totalTranslateY = sum(translate.y, focal.y);
      if (totalTranslateX > rightLimit) {
        translate.x.value = withTiming(rightLimit);
        focal.x.value = withTiming(0);
      } else if (totalTranslateX < leftLimit) {
        translate.x.value = withTiming(leftLimit);
        focal.x.value = withTiming(0);
      }
      if (totalTranslateY > bottomLimit) {
        translate.y.value = withTiming(bottomLimit);
        focal.y.value = withTiming(0);
      } else if (totalTranslateY < topLimit) {
        translate.y.value = withTiming(topLimit);
        focal.y.value = withTiming(0);
      }
    } else {
      reset();
    }
  };
  const reset = useCallback(() => {
    'worklet';

    const interactionId = getInteractionId();
    savedScale.value = 1;
    scale.value = withTiming(1, undefined, function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return onAnimationEnd(interactionId, ANIMATION_VALUE.SCALE, ...args);
    });
    initialFocal.x.value = 0;
    initialFocal.y.value = 0;
    savedFocal.x.value = 0;
    savedFocal.y.value = 0;
    focal.x.value = withTiming(0, undefined, function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return onAnimationEnd(interactionId, ANIMATION_VALUE.FOCAL_X, ...args);
    });
    focal.y.value = withTiming(0, undefined, function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return onAnimationEnd(interactionId, ANIMATION_VALUE.FOCAL_Y, ...args);
    });
    savedTranslate.x.value = 0;
    savedTranslate.y.value = 0;
    translate.x.value = withTiming(0, undefined, function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return onAnimationEnd(interactionId, ANIMATION_VALUE.TRANSLATE_X, ...args);
    });
    translate.y.value = withTiming(0, undefined, function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return onAnimationEnd(interactionId, ANIMATION_VALUE.TRANSLATE_Y, ...args);
    });
  }, [savedScale, scale, initialFocal.x, initialFocal.y, savedFocal.x, savedFocal.y, focal.x, focal.y, savedTranslate.x, savedTranslate.y, translate.x, translate.y, getInteractionId, onAnimationEnd]);
  const onInteractionStarted = () => {
    if (!isInteracting.current) {
      isInteracting.current = true;
      onInteractionStart === null || onInteractionStart === void 0 ? void 0 : onInteractionStart();
      updateInteractionId();
    }
  };
  const onInteractionEnded = () => {
    if (isInteracting.current && !isPinching.current && !isPanning()) {
      if (isDoubleTapEnabled) {
        moveIntoView();
      } else {
        reset();
      }
      isInteracting.current = false;
      onInteractionEnd === null || onInteractionEnd === void 0 ? void 0 : onInteractionEnd();
    }
  };
  const onPinchStarted = event => {
    onInteractionStarted();
    isPinching.current = true;
    onPinchStart === null || onPinchStart === void 0 ? void 0 : onPinchStart(event);
  };
  const onPinchEnded = function () {
    isPinching.current = false;
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    onPinchEnd === null || onPinchEnd === void 0 ? void 0 : onPinchEnd(...args);
    onInteractionEnded();
  };
  const onPanStarted = event => {
    onInteractionStarted();
    startPan();
    onPanStart === null || onPanStart === void 0 ? void 0 : onPanStart(event);
  };
  const onPanEnded = function () {
    endPan();
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }
    onPanEnd === null || onPanEnd === void 0 ? void 0 : onPanEnd(...args);
    onInteractionEnded();
  };
  const panGesture = Gesture.Pan().enabled(isPanEnabled).minPointers(minPanPointers).maxPointers(maxPanPointers).onStart(event => {
    runOnJS(onPanStarted)(event);
    savedTranslate.x.value = translate.x.value;
    savedTranslate.y.value = translate.y.value;
  }).onUpdate(event => {
    translate.x.value = savedTranslate.x.value + event.translationX;
    translate.y.value = savedTranslate.y.value + event.translationY;
  }).onEnd((event, success) => {
    const rightLimit = limits.right(width, scale);
    const leftLimit = -rightLimit;
    const bottomLimit = limits.bottom(height, scale);
    const topLimit = -bottomLimit;
    if (scale.value > 1) {
      translate.x.value = withDecay({
        velocity: event.velocityX * 0.6,
        rubberBandEffect: true,
        rubberBandFactor: 0.9,
        clamp: [leftLimit - focal.x.value, rightLimit - focal.x.value]
      }, () => {
        if (event.velocityX >= event.velocityY) {
          runOnJS(onPanEnded)(event, success);
        }
      });
      translate.y.value = withDecay({
        velocity: event.velocityY * 0.6,
        rubberBandEffect: true,
        rubberBandFactor: 0.9,
        clamp: [topLimit - focal.y.value, bottomLimit - focal.y.value]
      }, () => {
        if (event.velocityY > event.velocityX) {
          runOnJS(onPanEnded)(event, success);
        }
      });
    } else {
      runOnJS(onPanEnded)(event, success);
    }
  });
  const pinchGesture = Gesture.Pinch().enabled(isPinchEnabled).onStart(event => {
    runOnJS(onPinchStarted)(event);
    savedScale.value = scale.value;
    savedFocal.x.value = focal.x.value;
    savedFocal.y.value = focal.y.value;
    initialFocal.x.value = event.focalX;
    initialFocal.y.value = event.focalY;
  }).onUpdate(event => {
    scale.value = clamp(savedScale.value * event.scale, minScale, maxScale);
    focal.x.value = savedFocal.x.value + (center.x - initialFocal.x.value) * (scale.value - savedScale.value);
    focal.y.value = savedFocal.y.value + (center.y - initialFocal.y.value) * (scale.value - savedScale.value);
  }).onEnd(function () {
    runOnJS(onPinchEnded)(...arguments);
  });
  const doubleTapGesture = Gesture.Tap().enabled(isDoubleTapEnabled).numberOfTaps(2).maxDuration(250).onStart(event => {
    if (scale.value === 1) {
      runOnJS(onDoubleTap)(ZOOM_TYPE.ZOOM_IN);
      scale.value = withTiming(doubleTapScale);
      focal.x.value = withTiming((center.x - event.x) * (doubleTapScale - 1));
      focal.y.value = withTiming((center.y - event.y) * (doubleTapScale - 1));
    } else {
      runOnJS(onDoubleTap)(ZOOM_TYPE.ZOOM_OUT);
      reset();
    }
  });
  const singleTapGesture = Gesture.Tap().enabled(isSingleTapEnabled).numberOfTaps(1).onStart(event => {
    runOnJS(onSingleTap)(event);
  });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: translate.x.value
    }, {
      translateY: translate.y.value
    }, {
      translateX: focal.x.value
    }, {
      translateY: focal.y.value
    }, {
      scale: scale.value
    }]
  }));
  const pinchPanGestures = Gesture.Simultaneous(pinchGesture, panGesture);
  const tapGestures = Gesture.Exclusive(doubleTapGesture, singleTapGesture);
  const gestures = isDoubleTapEnabled || isSingleTapEnabled ? Gesture.Race(tapGestures, pinchPanGestures) : pinchPanGestures;
  return {
    gestures,
    animatedStyle,
    reset
  };
};
//# sourceMappingURL=useGestures.js.map