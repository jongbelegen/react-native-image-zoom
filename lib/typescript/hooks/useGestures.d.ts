import { type ImageZoomUseGesturesProps } from '../types';
export declare const useGestures: ({ width, height, center, minScale, maxScale, doubleTapScale, minPanPointers, maxPanPointers, isPanEnabled, isPinchEnabled, isSingleTapEnabled, isDoubleTapEnabled, onInteractionStart, onInteractionEnd, onPinchStart, onPinchEnd, onPanStart, onPanEnd, onSingleTap, onDoubleTap, onResetAnimationEnd, }: ImageZoomUseGesturesProps) => {
    gestures: import("react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition").ComposedGesture;
    animatedStyle: {
        transform: ({
            translateX: number;
            translateY?: undefined;
            scale?: undefined;
        } | {
            translateY: number;
            translateX?: undefined;
            scale?: undefined;
        } | {
            scale: number;
            translateX?: undefined;
            translateY?: undefined;
        })[];
    };
    reset: () => void;
};
//# sourceMappingURL=useGestures.d.ts.map