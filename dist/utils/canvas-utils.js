export class CanvasUtils {
    constructor() {
        this.canvas = null;
        this.ctx = null;
    }
    static getInstance() {
        if (!CanvasUtils.instance) {
            CanvasUtils.instance = new CanvasUtils();
        }
        return CanvasUtils.instance;
    }
    init(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            throw new Error(`Canvas element with id '${canvasId}' not found`);
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Failed to get 2D rendering context');
        }
        this.canvas = canvas;
        this.ctx = ctx;
        return ctx;
    }
    clear() {
        if (!this.ctx || !this.canvas) {
            throw new Error('Canvas not initialized');
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    getWidth() {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        return this.canvas.width;
    }
    getHeight() {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        return this.canvas.height;
    }
    // Static methods for easier access
    static init(canvasId) {
        return CanvasUtils.getInstance().init(canvasId);
    }
    static clear() {
        CanvasUtils.getInstance().clear();
    }
    static getWidth() {
        return CanvasUtils.getInstance().getWidth();
    }
    static getHeight() {
        return CanvasUtils.getInstance().getHeight();
    }
    static getContext() {
        const instance = CanvasUtils.getInstance();
        if (!instance.ctx) {
            throw new Error('Canvas context not initialized');
        }
        return instance.ctx;
    }
}
//# sourceMappingURL=canvas-utils.js.map