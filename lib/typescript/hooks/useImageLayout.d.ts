import type { LayoutChangeEvent } from 'react-native';
import type { ImageZoomUseLayoutProps } from '../types';
export declare const useImageLayout: ({ onLayout }: ImageZoomUseLayoutProps) => {
    onImageLayout: (event: LayoutChangeEvent) => void;
    x: number;
    y: number;
    width: number;
    height: number;
    center: {
        x: number;
        y: number;
    };
};
//# sourceMappingURL=useImageLayout.d.ts.map