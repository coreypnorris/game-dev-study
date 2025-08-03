import { InputManager } from '../engine/input-manager.js';
import { CanvasUtils } from '../utils/canvas-utils.js';
export class Player {
    constructor(x, y, width = 30, height = 30) {
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
    update(deltaTime) {
        this.handleInput(deltaTime);
        this.updatePosition(deltaTime);
        this.constrainToBounds();
    }
    handleInput(deltaTime) {
        const movement = InputManager.getMovementVector();
        // Apply acceleration based on input
        if (movement.x !== 0) {
            this.velocity.x += movement.x * this.acceleration * deltaTime;
        }
        else {
            this.velocity.x *= this.friction;
        }
        if (movement.y !== 0) {
            this.velocity.y += movement.y * this.acceleration * deltaTime;
        }
        else {
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
        if (Math.abs(this.velocity.x) < 1)
            this.velocity.x = 0;
        if (Math.abs(this.velocity.y) < 1)
            this.velocity.y = 0;
    }
    updatePosition(deltaTime) {
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
    }
    constrainToBounds() {
        const canvasWidth = CanvasUtils.getWidth();
        const canvasHeight = CanvasUtils.getHeight();
        // Constrain horizontal movement
        if (this.x < 0) {
            this.x = 0;
            this.velocity.x = 0;
        }
        else if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
            this.velocity.x = 0;
        }
        // Constrain vertical movement
        if (this.y < 0) {
            this.y = 0;
            this.velocity.y = 0;
        }
        else if (this.y + this.height > canvasHeight) {
            this.y = canvasHeight - this.height;
            this.velocity.y = 0;
        }
    }
    move(deltaX, deltaY) {
        this.x += deltaX;
        this.y += deltaY;
        this.constrainToBounds();
    }
    render(ctx) {
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
            ctx.arc(centerX + normalizedVelX * 8, centerY + normalizedVelY * 8, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    // Utility methods
    getPosition() {
        return { x: this.x, y: this.y };
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.constrainToBounds();
    }
    getCenter() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }
    getBounds() {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }
}
//# sourceMappingURL=player.js.map