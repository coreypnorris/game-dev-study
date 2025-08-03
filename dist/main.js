import { GameEngine } from './engine/game-engine.js';
import { Player } from './entities/player.js';
import { CanvasUtils } from './utils/canvas-utils.js';
// Main game initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing TypeScript game...');
    try {
        // Initialize the game engine first (after DOM is ready)
        GameEngine.init();
        // Create game entities
        const player = new Player(CanvasUtils.getWidth() / 2, CanvasUtils.getHeight() / 2);
        // Add entities to the game
        GameEngine.addEntity(player);
        // Start the game loop
        GameEngine.start();
        console.log('Game initialized successfully!');
    }
    catch (error) {
        console.error('Failed to initialize game:', error);
    }
});
//# sourceMappingURL=main.js.map