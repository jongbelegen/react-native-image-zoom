"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useImageLayout = void 0;
var _react = require("react");
const useImageLayout = _ref => {
  let {
    onLayout
  } = _ref;
  const [state, setState] = (0, _react.useState)({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    center: {
      x: 0,
      y: 0
    }
  });
  const onImageLayout = event => {
    const {
      layout
    } = event.nativeEvent;
    const {
      x,
      y,
      width,
      height
    } = layout;
    const center = {
      x: x + width / 2,
      y: y + height / 2
    };
    onLayout === null || onLayout === void 0 ? void 0 : onLayout(event);
    setState({
      ...layout,
      center
    });
  };
  return {
    ...state,
    onImageLayout
  };
};
exports.useImageLayout = useImageLayout;
//# sourceMappingURL=useImageLayout.js.map