import { IGameEntity, IMoveable, IPosition } from '../types/game-types.js';
import { InputManager } from '../engine/input-manager.js';
import { CanvasUtils } from '../utils/canvas-utils.js';

export class Player implements IGameEntity, IMoveable {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number;
    public color: string;
    
    // Additional properties for enhanced functionality
    private maxSpeed: number;
    private acceleration: number;
    private friction: number;
    private velocity: IPosition;
    
    constructor(x: number, y: number, width: number = 30, height: number = 30) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 200; // pixels per second
        this.maxSpeed = 250;
        this.acceleration = 800;
        this.friction = 0.8;
        this.color = '#4A90E2';
        
        this.velocity = { x: 0, y: 0 };
    }
    
    public update(deltaTime: number): void {
        this.handleInput(deltaTime);
        this.updatePosition(deltaTime);
        this.constrainToBounds();
    }
    
    private handleInput(deltaTime: number): void {
        const movement = InputManager.getMovementVector();
        
        // Apply acceleration based on input
        if (movement.x !== 0) {
            this.velocity.x += movement.x * this.acceleration * deltaTime;
        } else {
            this.velocity.x *= this.friction;
        }
        
        if (movement.y !== 0) {
            this.velocity.y += movement.y * this.acceleration * deltaTime;
        } else {
            this.velocity.y *= this.friction;
        }
        
        // Clamp velocity to max speed
        const currentSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        if (currentSpeed > this.maxSpeed) {
            const ratio = this.maxSpeed / currentSpeed;
            this.velocity.x *= ratio;
            this.velocity.y *= ratio;
        }
        
        // Stop very small movements to prevent jitter
        if (Math.abs(this.velocity.x) < 1) this.velocity.x = 0;
        if (Math.abs(this.velocity.y) < 1) this.velocity.y = 0;
    }
    
    private updatePosition(deltaTime: number): void {
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
    }
    
    private constrainToBounds(): void {
        const canvasWidth = CanvasUtils.getWidth();
        const canvasHeight = CanvasUtils.getHeight();
        
        // Constrain horizontal movement
        if (this.x < 0) {
            this.x = 0;
            this.velocity.x = 0;
        } else if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
            this.velocity.x = 0;
        }
        
        // Constrain vertical movement
        if (this.y < 0) {
            this.y = 0;
            this.velocity.y = 0;
        } else if (this.y + this.height > canvasHeight) {
            this.y = canvasHeight - this.height;
            this.velocity.y = 0;
        }
    }
    
    public move(deltaX: number, deltaY: number): void {
        this.x += deltaX;
        this.y += deltaY;
        this.constrainToBounds();
    }
    
    public render(ctx: CanvasRenderingContext2D): void {
        // Draw main body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        // Draw direction indicator (small dot in movement direction)
        if (this.velocity.x !== 0 || this.velocity.y !== 0) {
            const centerX = this.x + this.width / 2;
            const centerY = this.y + this.height / 2;
            const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
            const normalizedVelX = this.velocity.x / speed;
            const normalizedVelY = this.velocity.y / speed;
            
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(
                centerX + normalizedVelX * 8,
                centerY + normalizedVelY * 8,
                3,
                0,
                2 * Math.PI
            );
            ctx.fill();
        }
    }
    
    // Utility methods
    public getPosition(): IPosition {
        return { x: this.x, y: this.y };
    }
    
    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
        this.constrainToBounds();
    }
    
    public getCenter(): IPosition {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }
    
    public getBounds(): { left: number; right: number; top: number; bottom: number } {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }
}