"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useImageZoomHandle = void 0;
var _react = require("react");
const useImageZoomHandle = (ref, reset) => {
  (0, _react.useImperativeHandle)(ref, () => ({
    reset() {
      reset();
    }
  }), [reset]);
};
exports.useImageZoomHandle = useImageZoomHandle;
//# sourceMappingURL=useImageZoomHandle.js.map