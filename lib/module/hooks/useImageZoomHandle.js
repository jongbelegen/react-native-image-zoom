import { useImperativeHandle } from 'react';
export const useImageZoomHandle = (ref, reset) => {
  useImperativeHandle(ref, () => ({
    reset() {
      reset();
    }
  }), [reset]);
};
//# sourceMappingURL=useImageZoomHandle.js.map