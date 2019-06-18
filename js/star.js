class Star {
  constructor() {
    this.x = Math.random() * CANVAS_WIDTH;
    this.y = Math.random() * CANVAS_HEIGHT;

    this.radius = Math.random() * 1.5 + 1;
  }
  draw(ctx) {
    ctx.save();

    //building the stars
    ctx.beginPath(ctx);
    ctx.fillStyle = "lightgray";
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  }
  update() {
    this.x -= speedFactor * this.vx();

    //keeping the stars on the canvas
    if (this.x < -this.radius) {
      this.x = CANVAS_WIDTH + this.radius;
    }
  }
  vx() {
    return this.radius / 2;
  }
}
