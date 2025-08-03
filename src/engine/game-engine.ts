import { IGameEntity, IGameEngineState } from '../types/game-types.js';
import { CanvasUtils } from '../utils/canvas-utils.js';
import { InputManager } from './input-manager.js';

export class GameEngine {
    private static instance: GameEngine;
    private state: IGameEngineState;
    private animationFrameId: number | null = null;
    private fpsUpdateInterval: number = 60; // Update FPS display every 60 frames
    
    private constructor() {
        this.state = {
            running: false,
            lastTime: 0,
            fps: 0,
            frameCount: 0,
            entities: []
        };
    }
    
    public static getInstance(): GameEngine {
        if (!GameEngine.instance) {
            GameEngine.instance = new GameEngine();
        }
        return GameEngine.instance;
    }
    
    public init(): CanvasRenderingContext2D {
        console.log('Initializing GameEngine...');
        
        // Initialize canvas and input
        const ctx = CanvasUtils.init('gameCanvas');
        InputManager.init();
        
        // Set up pause/resume on window focus
        this.setupWindowEvents();
        
        console.log('GameEngine initialized successfully');
        return ctx;
    }
    
    private setupWindowEvents(): void {
        window.addEventListener('blur', (): void => {
            this.pause();
        });
        
        window.addEventListener('focus', (): void => {
            this.resume();
        });
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', (): void => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }
    
    public addEntity(entity: IGameEntity): void {
        this.state.entities.push(entity);
        console.log(`Entity added. Total entities: ${this.state.entities.length}`);
    }
    
    public removeEntity(entity: IGameEntity): boolean {
        const index = this.state.entities.indexOf(entity);
        if (index > -1) {
            this.state.entities.splice(index, 1);
            console.log(`Entity removed. Total entities: ${this.state.entities.length}`);
            return true;
        }
        return false;
    }
    
    public getEntities(): ReadonlyArray<IGameEntity> {
        return this.state.entities;
    }
    
    public clearEntities(): void {
        this.state.entities = [];
        console.log('All entities cleared');
    }
    
    private update(deltaTime: number): void {
        // Update all entities
        this.state.entities.forEach((entity: IGameEntity): void => {
            if (entity.update) {
                entity.update(deltaTime);
            }
        });
        
        // Add more game logic here:
        // - Collision detection
        // - Game state changes
        // - Physics updates
        // - Audio updates
    }
    
    private render(ctx: CanvasRenderingContext2D): void {
        // Clear canvas
        CanvasUtils.clear();
        
        // Render all entities
        this.state.entities.forEach((entity: IGameEntity): void => {
            if (entity.render) {
                entity.render(ctx);
            }
        });
        
        // Add more rendering here:
        // - UI elements
        // - Effects
        // - Debug info
        // - Particle systems
    }
    
    private gameLoop = (currentTime: number): void => {
        // Calculate delta time
        const deltaTime = Math.min((currentTime - this.state.lastTime) / 1000, 0.016); // Cap at 60 FPS
        this.state.lastTime = currentTime;
        
        // Calculate and update FPS
        this.updateFPS(deltaTime);
        
        // Core game loop: Update -> Render
        this.update(deltaTime);
        this.render(CanvasUtils.getContext());
        
        // Continue the loop
        if (this.state.running) {
            this.animationFrameId = requestAnimationFrame(this.gameLoop);
        }
    };
    
    private updateFPS(deltaTime: number): void {
        this.state.frameCount++;
        
        if (this.state.frameCount % this.fpsUpdateInterval === 0) {
            this.state.fps = Math.round(1 / deltaTime);
            this.updateFPSDisplay();
        }
    }
    
    private updateFPSDisplay(): void {
        const fpsElement = document.getElementById('fps');
        if (fpsElement) {
            fpsElement.textContent = this.state.fps.toString();
        }
    }
    
    public start(): void {
        if (this.state.running) {
            console.warn('Game is already running');
            return;
        }
        
        console.log('Starting game engine...');
        this.state.running = true;
        this.state.lastTime = performance.now();
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
    
    public pause(): void {
        if (!this.state.running) {
            return;
        }
        
        console.log('Game paused');
        this.state.running = false;
        
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    
    public resume(): void {
        if (this.state.running) {
            return;
        }
        
        console.log('Game resumed');
        this.state.running = true;
        this.state.lastTime = performance.now();
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
    
    public stop(): void {
        console.log('Stopping game engine...');
        this.pause();
        this.clearEntities();
        this.state.frameCount = 0;
        this.state.fps = 0;
        this.updateFPSDisplay();
    }
    
    public isRunning(): boolean {
        return this.state.running;
    }
    
    public getFPS(): number {
        return this.state.fps;
    }
    
    public getEntityCount(): number {
        return this.state.entities.length;
    }
    
    // Static methods for easier access
    public static init(): CanvasRenderingContext2D {
        return GameEngine.getInstance().init();
    }
    
    public static addEntity(entity: IGameEntity): void {
        GameEngine.getInstance().addEntity(entity);
    }
    
    public static removeEntity(entity: IGameEntity): boolean {
        return GameEngine.getInstance().removeEntity(entity);
    }
    
    public static start(): void {
        GameEngine.getInstance().start();
    }
    
    public static pause(): void {
        GameEngine.getInstance().pause();
    }
    
    public static resume(): void {
        GameEngine.getInstance().resume();
    }
    
    public static stop(): void {
        GameEngine.getInstance().stop();
    }
}