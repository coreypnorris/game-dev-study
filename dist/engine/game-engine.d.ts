import { IGameEntity } from '../types/game-types.js';
export declare class GameEngine {
    private static instance;
    private state;
    private animationFrameId;
    private fpsUpdateInterval;
    private constructor();
    static getInstance(): GameEngine;
    init(): CanvasRenderingContext2D;
    private setupWindowEvents;
    addEntity(entity: IGameEntity): void;
    removeEntity(entity: IGameEntity): boolean;
    getEntities(): ReadonlyArray<IGameEntity>;
    clearEntities(): void;
    private update;
    private render;
    private gameLoop;
    private updateFPS;
    private updateFPSDisplay;
    start(): void;
    pause(): void;
    resume(): void;
    stop(): void;
    isRunning(): boolean;
    getFPS(): number;
    getEntityCount(): number;
    static init(): CanvasRenderingContext2D;
    static addEntity(entity: IGameEntity): void;
    static removeEntity(entity: IGameEntity): boolean;
    static start(): void;
    static pause(): void;
    static resume(): void;
    static stop(): void;
}
//# sourceMappingURL=game-engine.d.ts.map