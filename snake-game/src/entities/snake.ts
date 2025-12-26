import { GRID_SIZE } from "../constants";

type Position = {
  x: number;
  y: number;
};

export class Snake {
  body: Array<Position>;
  direction: Position;
  nextDirection: Position;

  constructor() {
    this.body = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
  }

  move() {
    this.direction = this.nextDirection;
    const newHead = {
      x: this.body[0].x + this.direction.x,
      y: this.body[0].y + this.direction.y,
    };

    this.body.unshift(newHead);
    this.body.pop();
  }

  changeDirection(newDirection: Position) {
    const isOpposite =
      (newDirection.x !== 0 && newDirection.x === -this.direction.x) ||
      (newDirection.y !== 0 && newDirection.y === -this.direction.y);

    if (isOpposite) {
      return;
    }

    this.nextDirection = newDirection;
  }

  checkCollisions() {
    const nextHead = {
      x: this.body[0].x + this.nextDirection.x,
      y: this.body[0].y + this.nextDirection.y,
    };

    const hitWall =
      nextHead.x < 0 ||
      nextHead.x >= GRID_SIZE ||
      nextHead.y < 0 ||
      nextHead.y >= GRID_SIZE;

    return hitWall;
  }

  draw(ctx: CanvasRenderingContext2D, cellSize: number) {
    this.body.forEach((segment) => {
      ctx.fillStyle = "#4CAF50";
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );
    });
  }
}
