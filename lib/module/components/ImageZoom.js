function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useGestures } from '../hooks/useGestures';
import { useImageLayout } from '../hooks/useImageLayout';
import { useImageZoomHandle } from '../hooks/useImageZoomHandle';
import { Image } from 'expo-image';
const AnimatedImage = Animated.createAnimatedComponent(Image);
const styles = StyleSheet.create({
  image: {
    flex: 1
  }
});
const ImageZoom = (_ref, ref) => {
  let {
    uri = '',
    minScale,
    maxScale,
    doubleTapScale,
    minPanPointers,
    maxPanPointers,
    isPanEnabled,
    isPinchEnabled,
    isSingleTapEnabled,
    isDoubleTapEnabled,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
    onSingleTap,
    onDoubleTap,
    onResetAnimationEnd,
    onLayout,
    style = {},
    ...props
  } = _ref;
  const {
    width,
    height,
    center,
    onImageLayout
  } = useImageLayout({
    onLayout
  });
  const {
    animatedStyle,
    gestures,
    reset
  } = useGestures({
    width,
    height,
    center,
    minScale,
    maxScale,
    doubleTapScale,
    minPanPointers,
    maxPanPointers,
    isPanEnabled,
    isPinchEnabled,
    isSingleTapEnabled,
    isDoubleTapEnabled,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
    onSingleTap,
    onDoubleTap,
    onResetAnimationEnd
  });
  useImageZoomHandle(ref, reset);
  return /*#__PURE__*/React.createElement(GestureDetector, {
    gesture: gestures
  }, /*#__PURE__*/React.createElement(AnimatedImage, _extends({
    style: [styles.image, style, animatedStyle],
    source: {
      uri
    },
    contentFit: "contain",
    onLayout: onImageLayout
  }, props)));
};
export default /*#__PURE__*/forwardRef(ImageZoom);
//# sourceMappingURL=ImageZoom.js.map