import { useState } from 'react';
export const useImageLayout = _ref => {
  let {
    onLayout
  } = _ref;
  const [state, setState] = useState({
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
//# sourceMappingURL=useImageLayout.js.map