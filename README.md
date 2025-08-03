# TypeScript Canvas Game

A modern, modular HTML5 Canvas game built with TypeScript, featuring proper type safety, ES6 modules, and a clean architecture.

## 🚀 Features

- **Full TypeScript Support** - Complete type safety and IntelliSense
- **Modern ES6 Modules** - Clean import/export syntax
- **Modular Architecture** - Separated concerns with dedicated classes
- **Enhanced Player Movement** - Smooth acceleration and physics
- **Auto-pause System** - Game pauses when tab loses focus
- **FPS Monitoring** - Real-time performance tracking
- **Responsive Design** - Styled UI with modern CSS

## 📁 Project Structure

```
typescript-canvas-game/
├── src/
│   ├── types/
│   │   └── GameTypes.ts          # Type definitions and interfaces
│   ├── utils/
│   │   └── CanvasUtils.ts        # Canvas utility functions
│   ├── engine/
│   │   ├── GameEngine.ts         # Main game loop and engine
│   │   └── InputManager.ts       # Input handling system
│   ├── entities/
│   │   └── Player.ts             # Player entity class
│   └── main.ts                   # Game initialization
├── css/
│   └── style.css                 # Styling
├── dist/                         # Compiled JavaScript output
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # NPM dependencies and scripts
├── .eslintrc.json               # ESLint configuration
└── index.html                   # Main HTML file
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- NPM or Yarn

### Installation

1. **Clone or download the project files**

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the TypeScript code:**

   ```bash
   npm run build
   ```

4. **Serve the game:**

   ```bash
   npm run serve
   ```

5. **For development with auto-rebuild:**
   ```bash
   npm run dev
   ```

## 🎮 Controls

- **Movement**: WASD keys or Arrow keys
- **Auto-pause**: Game automatically pauses when tab loses focus
- **Debug**: Press F12 to see console logs

## 🔧 Development

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run build:watch` - Watch for changes and recompile automatically
- `npm run dev` - Start development server with auto-rebuild
- `npm run serve` - Serve the built game on localhost:8080
- `npm run clean` - Remove compiled files
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run typecheck` - Check types without compiling

### Adding New Features

1. **Create new entity types:**

   ```typescript
   // src/entities/Enemy.ts
   import { IGameEntity } from '../types/GameTypes';

   export class Enemy implements IGameEntity {
     // Your implementation
   }
   ```

2. **Add new interfaces:**

   ```typescript
   // src/types/GameTypes.ts
   export interface IEnemy extends IGameEntity {
     health: number;
     damage: number;
   }
   ```

3. **Register entities in main.ts:**

   ```typescript
   // src/main.ts
   import { Enemy } from './entities/Enemy';

   const enemy = new Enemy(100, 100);
   GameEngine.addEntity(enemy);
   ```

## 📱 Mobile Testing

The game works on mobile devices:

1. Build and serve the project: `npm run serve`
2. The console will show your local network IP
3. Access the game from your mobile device using that IP

## 🎯 Key TypeScript Improvements

### Type Safety

- All variables, functions, and classes are properly typed
- Interfaces define clear contracts for game entities
- Compile-time error checking prevents runtime issues

### Modern Architecture

- Singleton patterns for managers (GameEngine, InputManager, CanvasUtils)
- Clean separation of concerns
- ES6 import/export modules
- Proper encapsulation with private methods

### Enhanced Features

- Smooth player movement with acceleration and friction
- Velocity-based physics
- Boundary collision with velocity stopping
- Visual direction indicator on the player
- Better error handling and logging

### Developer Experience

- IntelliSense support in modern IDEs
- ESLint integration for code quality
- Source maps for debugging
- Hot reloading during development

## 🔍 Debugging

The TypeScript version includes enhanced debugging features:

- Console logging for initialization steps
- FPS monitoring and display
- Entity count tracking
- Performance profiling hooks
- Error boundaries and proper error handling

## 🚀 Next Steps

This TypeScript conversion provides a solid foundation for:

- Adding collision detection systems
- Implementing game states (menu, gameplay, pause)
- Creating enemy AI and behavior trees
- Adding particle effects and animations
- Implementing sound systems
- Building level/scene management
- Adding networking for multiplayer

## 🎨 Customization

The modular architecture makes it easy to:

- Replace the rendering system
- Add different input methods (touch, gamepad)
- Implement different entity behaviors
- Create custom game modes
- Add visual effects and shaders

---

**Enjoy building your TypeScript game! 🎮**
