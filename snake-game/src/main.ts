import { CANVAS_SIZE, CELL_SIZE, DIRECTIONS, GRID_SIZE } from "./constants";
import { Food } from "./entities/food";
import { Snake } from "./entities/snake";
import "./style.css";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  snake = new Snake();
  food = new Food();
  isPlaying = false;

  constructor() {
    this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")! as CanvasRenderingContext2D;
    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;

    this.setupControls();
    this.startGameLoop();
  }
  setupControls() {
    document.addEventListener("keydown", (event) => {
      if (!this.isPlaying && event.code === "Enter") {
        this.isPlaying = true;
        return;
      }

      const newDirection = {
        ArrowUp: DIRECTIONS.UP,
        ArrowDown: DIRECTIONS.DOWN,
        ArrowLeft: DIRECTIONS.LEFT,
        ArrowRight: DIRECTIONS.RIGHT,
      }[event.code];

      if (newDirection) {
        this.snake.changeDirection(newDirection);
      }
    });
  }

  drawGrid() {
    this.ctx.fillStyle = "#2c3e50";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = "#ffffff33";
    this.ctx.lineWidth = 1;

    for (let i = 0; i <= GRID_SIZE; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * CELL_SIZE, 0);
      this.ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      this.ctx.stroke();
    }

    for (let i = 0; i <= GRID_SIZE; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * CELL_SIZE);
      this.ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      this.ctx.stroke();
    }
  }

  draw() {
    this.drawGrid();
    this.snake.draw(this.ctx, CELL_SIZE);

    this.food.draw(this.ctx, CELL_SIZE);
  }

  update() {
    this.draw();

    if (!this.isPlaying) {
      return;
    }

    if (this.snake.checkCollisions()) {
      this.isPlaying = false;
      return;
    }
    this.snake.move();
  }

  startGameLoop() {
    setInterval(() => this.update(), 100);
  }
}

window.onload = () => new Game();
