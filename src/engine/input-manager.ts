import { IInputState, MovementDirection } from '../types/game-types.js';

export class InputManager {
    private static instance: InputManager;
    private keys: IInputState = {};
    private initialized: boolean = false;
    
    private constructor() {}
    
    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager();
        }
        return InputManager.instance;
    }
    
    public init(): void {
        if (this.initialized) {
            return;
        }
        
        window.addEventListener('keydown', (e: KeyboardEvent): void => {
            this.keys[e.key] = true;
        });
        
        window.addEventListener('keyup', (e: KeyboardEvent): void => {
            this.keys[e.key] = false;
        });
        
        // Prevent default behavior for game keys
        window.addEventListener('keydown', (e: KeyboardEvent): void => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
        });
        
        this.initialized = true;
        console.log('InputManager initialized');
    }
    
    public isKeyPressed(key: string): boolean {
        return !!this.keys[key];
    }
    
    public isMoving(direction: MovementDirection): boolean {
        switch (direction) {
            case 'left':
                return this.isKeyPressed('ArrowLeft') || this.isKeyPressed('a') || this.isKeyPressed('A');
            case 'right':
                return this.isKeyPressed('ArrowRight') || this.isKeyPressed('d') || this.isKeyPressed('D');
            case 'up':
                return this.isKeyPressed('ArrowUp') || this.isKeyPressed('w') || this.isKeyPressed('W');
            case 'down':
                return this.isKeyPressed('ArrowDown') || this.isKeyPressed('s') || this.isKeyPressed('S');
            default:
                return false;
        }
    }
    
    public isMovingLeft(): boolean {
        return this.isMoving('left');
    }
    
    public isMovingRight(): boolean {
        return this.isMoving('right');
    }
    
    public isMovingUp(): boolean {
        return this.isMoving('up');
    }
    
    public isMovingDown(): boolean {
        return this.isMoving('down');
    }
    
    public getMovementVector(): { x: number; y: number } {
        let x = 0;
        let y = 0;
        
        if (this.isMovingLeft()) x -= 1;
        if (this.isMovingRight()) x += 1;
        if (this.isMovingUp()) y -= 1;
        if (this.isMovingDown()) y += 1;
        
        return { x, y };
    }
    
    // Static methods for easier access
    public static init(): void {
        InputManager.getInstance().init();
    }
    
    public static isKeyPressed(key: string): boolean {
        return InputManager.getInstance().isKeyPressed(key);
    }
    
    public static isMovingLeft(): boolean {
        return InputManager.getInstance().isMovingLeft();
    }
    
    public static isMovingRight(): boolean {
        return InputManager.getInstance().isMovingRight();
    }
    
    public static isMovingUp(): boolean {
        return InputManager.getInstance().isMovingUp();
    }
    
    public static isMovingDown(): boolean {
        return InputManager.getInstance().isMovingDown();
    }
    
    public static getMovementVector(): { x: number; y: number } {
        return InputManager.getInstance().getMovementVector();
    }
}