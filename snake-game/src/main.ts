import { CANVAS_SIZE, CELL_SIZE, DIRECTIONS, GRID_SIZE } from "./constants";
import { Food } from "./entities/food";
import { Snake } from "./entities/snake";
import { ScreenManager } from "./managers/screen-manager";
import "./style.css";

class Game {
  canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  ctx = this.canvas.getContext("2d")! as CanvasRenderingContext2D;
  screenManager = new ScreenManager(this.ctx, this.canvas);
  snake = new Snake();
  food = new Food(this.snake);
  isPlaying = false;
  isGameOver = false;
  score = 0;

  constructor() {
    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;

    this.setupControls();
    this.startGameLoop();
  }

  reset() {
    this.snake = new Snake();
    this.food = new Food(this.snake);
    this.isPlaying = true;
    this.isGameOver = false;
    this.score = 0;
  }

  setupControls() {
    document.addEventListener("keydown", (event) => {
      if (
        !this.isPlaying &&
        !this.isGameOver &&
        (event.code === "Enter" || event.code === "Space")
      ) {
        this.isPlaying = true;
        return;
      }

      if (
        this.isGameOver &&
        (event.code === "Enter" || event.code === "Space")
      ) {
        this.reset();
      }

      if (this.isPlaying) {
        const newDirection = {
          ArrowUp: DIRECTIONS.UP,
          ArrowDown: DIRECTIONS.DOWN,
          ArrowLeft: DIRECTIONS.LEFT,
          ArrowRight: DIRECTIONS.RIGHT,
        }[event.code];

        if (newDirection) {
          this.snake.changeDirection(newDirection);
        }
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

    this.drawScore();

    if (!this.isPlaying && !this.isGameOver) {
      this.screenManager.drawInitialScreen();
    }

    if (this.isGameOver) {
      this.screenManager.drawGameOverScreen(this.score);
    }
  }

  drawScore() {
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 3;
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "left";
    this.ctx.font = "20px 'Press Start 2P'";
    this.ctx.fillText(`Score: ${this.score}`, 20, 40);
  }

  updateScore() {
    this.score++;
  }

  updateEntities() {
    this.snake.move();

    const head = this.snake.getHead();
    if (head.x === this.food.position.x && head.y === this.food.position.y) {
      this.updateScore();
      this.food.respawn(this.snake);
    } else {
      this.snake.removeTail();
    }
  }

  update() {
    this.draw();

    if (!this.isPlaying) {
      return;
    }

    if (this.snake.checkCollisions()) {
      this.isPlaying = false;
      this.isGameOver = true;
      return;
    }
    this.updateEntities();
  }

  startGameLoop() {
    setInterval(() => this.update(), 100);
  }
}

window.onload = () => new Game();
