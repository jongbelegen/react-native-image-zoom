import React from 'react';
import type { ImageZoomRef } from '../types';
declare const _default: React.ForwardRefExoticComponent<Omit<import("expo-image").ImageProps, "source"> & {
    uri?: string | undefined;
    minScale?: number | undefined;
    maxScale?: number | undefined;
    doubleTapScale?: number | undefined;
    minPanPointers?: number | undefined;
    maxPanPointers?: number | undefined;
    isPanEnabled?: boolean | undefined;
    isPinchEnabled?: boolean | undefined;
    isSingleTapEnabled?: boolean | undefined;
    isDoubleTapEnabled?: boolean | undefined;
    onInteractionStart?: (() => void) | undefined;
    onInteractionEnd?: (() => void) | undefined;
    onPinchStart?: import("../types").OnPinchStartCallback | undefined;
    onPinchEnd?: import("../types").OnPinchEndCallback | undefined;
    onPanStart?: import("../types").OnPanStartCallback | undefined;
    onPanEnd?: import("../types").OnPanEndCallback | undefined;
    onSingleTap?: import("../types").OnSingleTapCallback | undefined;
    onDoubleTap?: import("../types").OnDoubleTapCallback | undefined;
    onResetAnimationEnd?: import("../types").OnResetAnimationEndCallback | undefined;
    source?: import("react-native").ImageSourcePropType | undefined;
} & React.RefAttributes<ImageZoomRef>>;
export default _default;
//# sourceMappingURL=ImageZoom.d.ts.map