export interface IPosition {
    x: number;
    y: number;
}
export interface IDimensions {
    width: number;
    height: number;
}
export interface IGameEntity {
    x: number;
    y: number;
    width: number;
    height: number;
    update?(deltaTime: number): void;
    render(ctx: CanvasRenderingContext2D): void;
}
export interface IMoveable {
    speed: number;
    move(deltaX: number, deltaY: number): void;
}
export interface IInputState {
    [key: string]: boolean;
}
export interface IGameEngineState {
    running: boolean;
    lastTime: number;
    fps: number;
    frameCount: number;
    entities: IGameEntity[];
}
export type MovementDirection = 'left' | 'right' | 'up' | 'down';
export interface ICanvasUtils {
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    init(canvasId: string): CanvasRenderingContext2D;
    clear(): void;
    getWidth(): number;
    getHeight(): number;
}
//# sourceMappingURL=game-types.d.ts.map