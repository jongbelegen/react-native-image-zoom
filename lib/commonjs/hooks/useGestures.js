"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGestures = void 0;
var _react = require("react");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = require("react-native-reanimated");
var _clamp = require("../utils/clamp");
var _limits = require("../utils/limits");
var _sum = require("../utils/sum");
var _types = require("../types");
var _useInteractionId = require("./useInteractionId");
var _useAnimationEnd = require("./useAnimationEnd");
var _usePanGestureCount = require("./usePanGestureCount");
const useGestures = _ref => {
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
  const isInteracting = (0, _react.useRef)(false);
  const isPinching = (0, _react.useRef)(false);
  const {
    isPanning,
    startPan,
    endPan
  } = (0, _usePanGestureCount.usePanGestureCount)();
  const savedScale = (0, _reactNativeReanimated.useSharedValue)(1);
  const scale = (0, _reactNativeReanimated.useSharedValue)(1);
  const initialFocal = {
    x: (0, _reactNativeReanimated.useSharedValue)(0),
    y: (0, _reactNativeReanimated.useSharedValue)(0)
  };
  const savedFocal = {
    x: (0, _reactNativeReanimated.useSharedValue)(0),
    y: (0, _reactNativeReanimated.useSharedValue)(0)
  };
  const focal = {
    x: (0, _reactNativeReanimated.useSharedValue)(0),
    y: (0, _reactNativeReanimated.useSharedValue)(0)
  };
  const savedTranslate = {
    x: (0, _reactNativeReanimated.useSharedValue)(0),
    y: (0, _reactNativeReanimated.useSharedValue)(0)
  };
  const translate = {
    x: (0, _reactNativeReanimated.useSharedValue)(0),
    y: (0, _reactNativeReanimated.useSharedValue)(0)
  };
  const {
    getInteractionId,
    updateInteractionId
  } = (0, _useInteractionId.useInteractionId)();
  const {
    onAnimationEnd
  } = (0, _useAnimationEnd.useAnimationEnd)(onResetAnimationEnd);
  const moveIntoView = () => {
    'worklet';

    if (scale.value > 1) {
      const rightLimit = _limits.limits.right(width, scale);
      const leftLimit = -rightLimit;
      const bottomLimit = _limits.limits.bottom(height, scale);
      const topLimit = -bottomLimit;
      const totalTranslateX = (0, _sum.sum)(translate.x, focal.x);
      const totalTranslateY = (0, _sum.sum)(translate.y, focal.y);
      if (totalTranslateX > rightLimit) {
        translate.x.value = (0, _reactNativeReanimated.withTiming)(rightLimit);
        focal.x.value = (0, _reactNativeReanimated.withTiming)(0);
      } else if (totalTranslateX < leftLimit) {
        translate.x.value = (0, _reactNativeReanimated.withTiming)(leftLimit);
        focal.x.value = (0, _reactNativeReanimated.withTiming)(0);
      }
      if (totalTranslateY > bottomLimit) {
        translate.y.value = (0, _reactNativeReanimated.withTiming)(bottomLimit);
        focal.y.value = (0, _reactNativeReanimated.withTiming)(0);
      } else if (totalTranslateY < topLimit) {
        translate.y.value = (0, _reactNativeReanimated.withTiming)(topLimit);
        focal.y.value = (0, _reactNativeReanimated.withTiming)(0);
      }
    } else {
      reset();
    }
  };
  const reset = (0, _react.useCallback)(() => {
    'worklet';

    const interactionId = getInteractionId();
    savedScale.value = 1;
    scale.value = (0, _reactNativeReanimated.withTiming)(1, undefined, function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return onAnimationEnd(interactionId, _types.ANIMATION_VALUE.SCALE, ...args);
    });
    initialFocal.x.value = 0;
    initialFocal.y.value = 0;
    savedFocal.x.value = 0;
    savedFocal.y.value = 0;
    focal.x.value = (0, _reactNativeReanimated.withTiming)(0, undefined, function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return onAnimationEnd(interactionId, _types.ANIMATION_VALUE.FOCAL_X, ...args);
    });
    focal.y.value = (0, _reactNativeReanimated.withTiming)(0, undefined, function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return onAnimationEnd(interactionId, _types.ANIMATION_VALUE.FOCAL_Y, ...args);
    });
    savedTranslate.x.value = 0;
    savedTranslate.y.value = 0;
    translate.x.value = (0, _reactNativeReanimated.withTiming)(0, undefined, function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return onAnimationEnd(interactionId, _types.ANIMATION_VALUE.TRANSLATE_X, ...args);
    });
    translate.y.value = (0, _reactNativeReanimated.withTiming)(0, undefined, function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return onAnimationEnd(interactionId, _types.ANIMATION_VALUE.TRANSLATE_Y, ...args);
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
  const panGesture = _reactNativeGestureHandler.Gesture.Pan().enabled(isPanEnabled).minPointers(minPanPointers).maxPointers(maxPanPointers).onStart(event => {
    (0, _reactNativeReanimated.runOnJS)(onPanStarted)(event);
    savedTranslate.x.value = translate.x.value;
    savedTranslate.y.value = translate.y.value;
  }).onUpdate(event => {
    translate.x.value = savedTranslate.x.value + event.translationX;
    translate.y.value = savedTranslate.y.value + event.translationY;
  }).onEnd((event, success) => {
    const rightLimit = _limits.limits.right(width, scale);
    const leftLimit = -rightLimit;
    const bottomLimit = _limits.limits.bottom(height, scale);
    const topLimit = -bottomLimit;
    if (scale.value > 1) {
      translate.x.value = (0, _reactNativeReanimated.withDecay)({
        velocity: event.velocityX * 0.6,
        rubberBandEffect: true,
        rubberBandFactor: 0.9,
        clamp: [leftLimit - focal.x.value, rightLimit - focal.x.value]
      }, () => {
        if (event.velocityX >= event.velocityY) {
          (0, _reactNativeReanimated.runOnJS)(onPanEnded)(event, success);
        }
      });
      translate.y.value = (0, _reactNativeReanimated.withDecay)({
        velocity: event.velocityY * 0.6,
        rubberBandEffect: true,
        rubberBandFactor: 0.9,
        clamp: [topLimit - focal.y.value, bottomLimit - focal.y.value]
      }, () => {
        if (event.velocityY > event.velocityX) {
          (0, _reactNativeReanimated.runOnJS)(onPanEnded)(event, success);
        }
      });
    } else {
      (0, _reactNativeReanimated.runOnJS)(onPanEnded)(event, success);
    }
  });
  const pinchGesture = _reactNativeGestureHandler.Gesture.Pinch().enabled(isPinchEnabled).onStart(event => {
    (0, _reactNativeReanimated.runOnJS)(onPinchStarted)(event);
    savedScale.value = scale.value;
    savedFocal.x.value = focal.x.value;
    savedFocal.y.value = focal.y.value;
    initialFocal.x.value = event.focalX;
    initialFocal.y.value = event.focalY;
  }).onUpdate(event => {
    scale.value = (0, _clamp.clamp)(savedScale.value * event.scale, minScale, maxScale);
    focal.x.value = savedFocal.x.value + (center.x - initialFocal.x.value) * (scale.value - savedScale.value);
    focal.y.value = savedFocal.y.value + (center.y - initialFocal.y.value) * (scale.value - savedScale.value);
  }).onEnd(function () {
    (0, _reactNativeReanimated.runOnJS)(onPinchEnded)(...arguments);
  });
  const doubleTapGesture = _reactNativeGestureHandler.Gesture.Tap().enabled(isDoubleTapEnabled).numberOfTaps(2).maxDuration(250).onStart(event => {
    if (scale.value === 1) {
      (0, _reactNativeReanimated.runOnJS)(onDoubleTap)(_types.ZOOM_TYPE.ZOOM_IN);
      scale.value = (0, _reactNativeReanimated.withTiming)(doubleTapScale);
      focal.x.value = (0, _reactNativeReanimated.withTiming)((center.x - event.x) * (doubleTapScale - 1));
      focal.y.value = (0, _reactNativeReanimated.withTiming)((center.y - event.y) * (doubleTapScale - 1));
    } else {
      (0, _reactNativeReanimated.runOnJS)(onDoubleTap)(_types.ZOOM_TYPE.ZOOM_OUT);
      reset();
    }
  });
  const singleTapGesture = _reactNativeGestureHandler.Gesture.Tap().enabled(isSingleTapEnabled).numberOfTaps(1).onStart(event => {
    (0, _reactNativeReanimated.runOnJS)(onSingleTap)(event);
  });
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
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
  const pinchPanGestures = _reactNativeGestureHandler.Gesture.Simultaneous(pinchGesture, panGesture);
  const tapGestures = _reactNativeGestureHandler.Gesture.Exclusive(doubleTapGesture, singleTapGesture);
  const gestures = isDoubleTapEnabled || isSingleTapEnabled ? _reactNativeGestureHandler.Gesture.Race(tapGestures, pinchPanGestures) : pinchPanGestures;
  return {
    gestures,
    animatedStyle,
    reset
  };
};
exports.useGestures = useGestures;
//# sourceMappingURL=useGestures.js.map