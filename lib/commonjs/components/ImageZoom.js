"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _useGestures = require("../hooks/useGestures");
var _useImageLayout = require("../hooks/useImageLayout");
var _useImageZoomHandle = require("../hooks/useImageZoomHandle");
var _expoImage = require("expo-image");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatedImage = _reactNativeReanimated.default.createAnimatedComponent(_expoImage.Image);
const styles = _reactNative.StyleSheet.create({
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
  } = (0, _useImageLayout.useImageLayout)({
    onLayout
  });
  const {
    animatedStyle,
    gestures,
    reset
  } = (0, _useGestures.useGestures)({
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
  (0, _useImageZoomHandle.useImageZoomHandle)(ref, reset);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
    gesture: gestures
  }, /*#__PURE__*/_react.default.createElement(AnimatedImage, _extends({
    style: [styles.image, style, animatedStyle],
    source: {
      uri
    },
    contentFit: "contain",
    onLayout: onImageLayout
  }, props)));
};
var _default = /*#__PURE__*/(0, _react.forwardRef)(ImageZoom);
exports.default = _default;
//# sourceMappingURL=ImageZoom.js.map