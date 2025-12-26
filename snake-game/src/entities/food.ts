import { GRID_SIZE } from "../constants";
import type { Snake } from "./snake";

type Position = {
  x: number;
  y: number;
};

export class Food {
  position: Position;

  constructor(snake: Snake) {
    while (this.isOnSnake(snake)) {
      this.position = this.getRandomPosition();
    }
    this.position = this.getRandomPosition();
  }

  getRandomPosition() {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }

  respawn(snake: Snake) {
    while (this.isOnSnake(snake)) {
      this.position = this.getRandomPosition();
    }
    this.position = this.getRandomPosition();
  }

  isOnSnake(snake: Snake) {
    if (!snake || !snake.body) return false;

    return snake.body.some(
      (segment) =>
        segment.x === this.position?.x && segment.y === this.position?.y
    );
  }

  draw(ctx: CanvasRenderingContext2D, cellSize: number) {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(
      this.position.x * cellSize,
      this.position.y * cellSize,
      cellSize,
      cellSize
    );
  }
}
