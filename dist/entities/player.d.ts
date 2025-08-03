import { IGameEntity, IMoveable, IPosition } from '../types/game-types.js';
export declare class Player implements IGameEntity, IMoveable {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    color: string;
    private maxSpeed;
    private acceleration;
    private friction;
    private velocity;
    constructor(x: number, y: number, width?: number, height?: number);
    update(deltaTime: number): void;
    private handleInput;
    private updatePosition;
    private constrainToBounds;
    move(deltaX: number, deltaY: number): void;
    render(ctx: CanvasRenderingContext2D): void;
    getPosition(): IPosition;
    setPosition(x: number, y: number): void;
    getCenter(): IPosition;
    getBounds(): {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}
//# sourceMappingURL=player.d.ts.map