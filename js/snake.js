import Config from "./config.js";
export default class Snake {
  constructor() {
    this.config = new Config();
    this.x = 100;
    this.y = 100;
    this.dx = this.config.sizeCell;
    this.dy = 0;
    this.tails = [];
    this.maxTails = 3;

    this.control();
  }
  update(berry, score, canvas) {
    this.x += this.dx;
    this.y += this.dy;
    this.tails.unshift({ x: this.x, y: this.y });

    if (this.tails.length > this.maxTails) {
      this.tails.pop();
    }
    if (this.x < 0) {
      this.x = canvas.element.width - this.config.sizeCell;
    } else if (this.x >= canvas.element.width) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = canvas.element.height - this.config.sizeCell;
    } else if (this.y >= canvas.element.height) {
      this.y = 0;
    }

    this.tails.forEach((el, index) => {
      if (el.x == berry.x && el.y == berry.y) {
        this.maxTails++;
        score.incScore();
        berry.randomPosition();
      }
      for (let i = index + 1; i < this.tails.length; i++) {
        if (el.x == this.tails[i].x && el.y == this.tails[i].y) {
          this.death();
          score.recordScore();
          score.setToZero();
        }
      }
    });
  }
  death() {
    this.x = 100;
    this.y = 100;
    this.dx = this.config.sizeCell;
    this.dy = 0;
    this.tails = [];
    this.maxTails = 3;
  }
  draw(context) {
    this.tails.forEach((el, index) => {
      if (index == 0) {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "green";
      }
      context.fillRect(el.x, el.y, this.config.sizeCell, this.config.sizeCell);
    });
  }

  control() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyW") {
        this.dx = 0;
        this.dy = -this.config.sizeCell;
      } else if (e.code === "KeyS") {
        this.dx = 0;
        this.dy = this.config.sizeCell;
      } else if (e.code === "KeyA") {
        this.dx = -this.config.sizeCell;
        this.dy = 0;
      } else if (e.code === "KeyD") {
        this.dx = this.config.sizeCell;
        this.dy = 0;
      }
    });
  }
}