import { ICanvasUtils } from '../types/game-types.js';
export declare class CanvasUtils implements ICanvasUtils {
    private static instance;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    private constructor();
    static getInstance(): CanvasUtils;
    init(canvasId: string): CanvasRenderingContext2D;
    clear(): void;
    getWidth(): number;
    getHeight(): number;
    static init(canvasId: string): CanvasRenderingContext2D;
    static clear(): void;
    static getWidth(): number;
    static getHeight(): number;
    static getContext(): CanvasRenderingContext2D;
}
//# sourceMappingURL=canvas-utils.d.ts.map