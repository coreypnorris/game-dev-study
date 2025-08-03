import { ICanvasUtils } from '../types/game-types.js';

export class CanvasUtils implements ICanvasUtils {
    private static instance: CanvasUtils;
    public canvas: HTMLCanvasElement | null = null;
    public ctx: CanvasRenderingContext2D | null = null;
    
    private constructor() {}
    
    public static getInstance(): CanvasUtils {
        if (!CanvasUtils.instance) {
            CanvasUtils.instance = new CanvasUtils();
        }
        return CanvasUtils.instance;
    }
    
    public init(canvasId: string): CanvasRenderingContext2D {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        
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
    
    public clear(): void {
        if (!this.ctx || !this.canvas) {
            throw new Error('Canvas not initialized');
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    public getWidth(): number {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        return this.canvas.width;
    }
    
    public getHeight(): number {
        if (!this.canvas) {
            throw new Error('Canvas not initialized');
        }
        return this.canvas.height;
    }
    
    // Static methods for easier access
    public static init(canvasId: string): CanvasRenderingContext2D {
        return CanvasUtils.getInstance().init(canvasId);
    }
    
    public static clear(): void {
        CanvasUtils.getInstance().clear();
    }
    
    public static getWidth(): number {
        return CanvasUtils.getInstance().getWidth();
    }
    
    public static getHeight(): number {
        return CanvasUtils.getInstance().getHeight();
    }
    
    public static getContext(): CanvasRenderingContext2D {
        const instance = CanvasUtils.getInstance();
        if (!instance.ctx) {
            throw new Error('Canvas context not initialized');
        }
        return instance.ctx;
    }
}