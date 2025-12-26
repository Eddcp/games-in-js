export class ScreenManager {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  drawInitialScreen() {
    this.ctx.fillStyle = "rgba(0,0,0,0.7)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "white";
    this.ctx.font = "30px 'Press Start 2P'";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Snake Game",
      this.canvas.width / 2,
      this.canvas.height / 2 - 50
    );

    this.ctx.font = "16px 'Press Start 2P'";
    this.ctx.fillText(
      "Press SPACE or ENTER to Start",
      this.canvas.width / 2,
      this.canvas.height / 2 + 20
    );

    this.ctx.fillText(
      "Use arrow keys to control",
      this.canvas.width / 2,
      this.canvas.height / 2 + 60
    );

    this.ctx.fillText(
      "the snake!",
      this.canvas.width / 2,
      this.canvas.height / 2 + 90
    );
  }

  drawGameOverScreen(score: number) {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "32px 'Press Start 2P'";
    this.ctx.fillText(
      "Game Over!",
      this.canvas.width / 2,
      this.canvas.height / 2 - 50
    );

    this.ctx.font = "16px 'Press Start 2P'";
    this.ctx.fillText(
      `Final Score: ${score}`,
      this.canvas.width / 2,
      this.canvas.height / 2 + 20
    );

    this.ctx.fillText(
      "Press SPACE or ENTER to restart",
      this.canvas.width / 2,
      this.canvas.height / 2 + 60
    );
  }
}
