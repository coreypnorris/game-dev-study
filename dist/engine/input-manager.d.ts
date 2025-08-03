import { MovementDirection } from '../types/game-types.js';
export declare class InputManager {
    private static instance;
    private keys;
    private initialized;
    private constructor();
    static getInstance(): InputManager;
    init(): void;
    isKeyPressed(key: string): boolean;
    isMoving(direction: MovementDirection): boolean;
    isMovingLeft(): boolean;
    isMovingRight(): boolean;
    isMovingUp(): boolean;
    isMovingDown(): boolean;
    getMovementVector(): {
        x: number;
        y: number;
    };
    static init(): void;
    static isKeyPressed(key: string): boolean;
    static isMovingLeft(): boolean;
    static isMovingRight(): boolean;
    static isMovingUp(): boolean;
    static isMovingDown(): boolean;
    static getMovementVector(): {
        x: number;
        y: number;
    };
}
//# sourceMappingURL=input-manager.d.ts.map