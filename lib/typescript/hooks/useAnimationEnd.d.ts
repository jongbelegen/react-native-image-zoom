import { AnimatableValue, AnimationCallback } from 'react-native-reanimated';
import { ANIMATION_VALUE, OnResetAnimationEndCallback } from '../types';
export type OnAnimationEndCallback = AnimationCallback extends (...a: infer I) => infer O ? (interactionId: string, value: ANIMATION_VALUE, ...a: I) => O : never;
export declare const useAnimationEnd: (onResetAnimationEnd?: OnResetAnimationEndCallback) => {
    onAnimationEnd: (interactionId: string, value: ANIMATION_VALUE, finished?: boolean | undefined, current?: AnimatableValue | undefined) => void;
};
//# sourceMappingURL=useAnimationEnd.d.ts.map