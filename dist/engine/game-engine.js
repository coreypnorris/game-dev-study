import { CanvasUtils } from '../utils/canvas-utils.js';
import { InputManager } from './input-manager.js';
export class GameEngine {
    constructor() {
        this.animationFrameId = null;
        this.fpsUpdateInterval = 60; // Update FPS display every 60 frames
        this.gameLoop = (currentTime) => {
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
        this.state = {
            running: false,
            lastTime: 0,
            fps: 0,
            frameCount: 0,
            entities: []
        };
    }
    static getInstance() {
        if (!GameEngine.instance) {
            GameEngine.instance = new GameEngine();
        }
        return GameEngine.instance;
    }
    init() {
        console.log('Initializing GameEngine...');
        // Initialize canvas and input
        const ctx = CanvasUtils.init('gameCanvas');
        InputManager.init();
        // Set up pause/resume on window focus
        this.setupWindowEvents();
        console.log('GameEngine initialized successfully');
        return ctx;
    }
    setupWindowEvents() {
        window.addEventListener('blur', () => {
            this.pause();
        });
        window.addEventListener('focus', () => {
            this.resume();
        });
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            }
            else {
                this.resume();
            }
        });
    }
    addEntity(entity) {
        this.state.entities.push(entity);
        console.log(`Entity added. Total entities: ${this.state.entities.length}`);
    }
    removeEntity(entity) {
        const index = this.state.entities.indexOf(entity);
        if (index > -1) {
            this.state.entities.splice(index, 1);
            console.log(`Entity removed. Total entities: ${this.state.entities.length}`);
            return true;
        }
        return false;
    }
    getEntities() {
        return this.state.entities;
    }
    clearEntities() {
        this.state.entities = [];
        console.log('All entities cleared');
    }
    update(deltaTime) {
        // Update all entities
        this.state.entities.forEach((entity) => {
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
    render(ctx) {
        // Clear canvas
        CanvasUtils.clear();
        // Render all entities
        this.state.entities.forEach((entity) => {
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
    updateFPS(deltaTime) {
        this.state.frameCount++;
        if (this.state.frameCount % this.fpsUpdateInterval === 0) {
            this.state.fps = Math.round(1 / deltaTime);
            this.updateFPSDisplay();
        }
    }
    updateFPSDisplay() {
        const fpsElement = document.getElementById('fps');
        if (fpsElement) {
            fpsElement.textContent = this.state.fps.toString();
        }
    }
    start() {
        if (this.state.running) {
            console.warn('Game is already running');
            return;
        }
        console.log('Starting game engine...');
        this.state.running = true;
        this.state.lastTime = performance.now();
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
    pause() {
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
    resume() {
        if (this.state.running) {
            return;
        }
        console.log('Game resumed');
        this.state.running = true;
        this.state.lastTime = performance.now();
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
    stop() {
        console.log('Stopping game engine...');
        this.pause();
        this.clearEntities();
        this.state.frameCount = 0;
        this.state.fps = 0;
        this.updateFPSDisplay();
    }
    isRunning() {
        return this.state.running;
    }
    getFPS() {
        return this.state.fps;
    }
    getEntityCount() {
        return this.state.entities.length;
    }
    // Static methods for easier access
    static init() {
        return GameEngine.getInstance().init();
    }
    static addEntity(entity) {
        GameEngine.getInstance().addEntity(entity);
    }
    static removeEntity(entity) {
        return GameEngine.getInstance().removeEntity(entity);
    }
    static start() {
        GameEngine.getInstance().start();
    }
    static pause() {
        GameEngine.getInstance().pause();
    }
    static resume() {
        GameEngine.getInstance().resume();
    }
    static stop() {
        GameEngine.getInstance().stop();
    }
}
//# sourceMappingURL=game-engine.js.map