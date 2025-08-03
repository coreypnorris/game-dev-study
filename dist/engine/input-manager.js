export class InputManager {
    constructor() {
        this.keys = {};
        this.initialized = false;
    }
    static getInstance() {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager();
        }
        return InputManager.instance;
    }
    init() {
        if (this.initialized) {
            return;
        }
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        // Prevent default behavior for game keys
        window.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }
        });
        this.initialized = true;
        console.log('InputManager initialized');
    }
    isKeyPressed(key) {
        return !!this.keys[key];
    }
    isMoving(direction) {
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
    isMovingLeft() {
        return this.isMoving('left');
    }
    isMovingRight() {
        return this.isMoving('right');
    }
    isMovingUp() {
        return this.isMoving('up');
    }
    isMovingDown() {
        return this.isMoving('down');
    }
    getMovementVector() {
        let x = 0;
        let y = 0;
        if (this.isMovingLeft())
            x -= 1;
        if (this.isMovingRight())
            x += 1;
        if (this.isMovingUp())
            y -= 1;
        if (this.isMovingDown())
            y += 1;
        return { x, y };
    }
    // Static methods for easier access
    static init() {
        InputManager.getInstance().init();
    }
    static isKeyPressed(key) {
        return InputManager.getInstance().isKeyPressed(key);
    }
    static isMovingLeft() {
        return InputManager.getInstance().isMovingLeft();
    }
    static isMovingRight() {
        return InputManager.getInstance().isMovingRight();
    }
    static isMovingUp() {
        return InputManager.getInstance().isMovingUp();
    }
    static isMovingDown() {
        return InputManager.getInstance().isMovingDown();
    }
    static getMovementVector() {
        return InputManager.getInstance().getMovementVector();
    }
}
//# sourceMappingURL=input-manager.js.map