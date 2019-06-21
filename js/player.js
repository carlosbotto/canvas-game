class Player {
  constructor() {
    this.radius = 28;
    this.x = 200;
    this.y = 700;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.life = 5;

    this.img = new Image();
    this.img.src = "img/losangoBranco.png";

    document.onkeydown = event => {
      event.preventDefault();

      if (event.keyCode == "38") {
        this.vy = -7;
        // up arrow
      } else if (event.keyCode == "40") {
        this.vy = 7;
        // down arrow
      } else if (event.keyCode == "37") {
        this.vx = -PLAYER_VELOCITY;
        // left arrow
      } else if (event.keyCode == "39") {
        this.vx = PLAYER_VELOCITY;
        // right arrow
      }
    };

    document.onkeyup = event => {
      event.preventDefault();

      if (event.keyCode == "38") {
        this.vy = 0;
        // up arrow
      } else if (event.keyCode == "40") {
        this.vy = 0;
        // down arrow
      } else if (event.keyCode == "37") {
        this.vx = 0;
        // left arrow
      } else if (event.keyCode == "39") {
        this.vx = 0;
        // right arrow
      }
    };
  }
  draw(ctx) {
    ctx.save(); // Save the current context state

    ctx.fillStyle = "bisque";

    if (DEBUG) {
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 33, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }

    // Draw the picture
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle)
    let size = 2.7 * this.radius;
    ctx.drawImage(this.img, -size / 2, -size / 2, size, size);


    


    ctx.restore(); // Restore the context state from the begining
  }
  update() {
    this.angle += 0.05
    // When there is a vx and a vy, there are reduced a little bit to keep the same speed and make the movement more natural
    let vx = this.vx;
    let vy = this.vy;
    if (vx !== 0 && vy !== 0) {
      vx = vx / Math.SQRT2;
      vy = vy / Math.SQRT2;
    }
    this.x += vx;
    this.y += vy;

    if (this.x - this.radius < 0) this.x = this.radius;
    if (this.x + this.radius > CANVAS_WIDTH)
      this.x = CANVAS_WIDTH - this.radius;
    if (this.y - this.radius < 80) this.y = 80 + this.radius;
    if (this.y + this.radius > CANVAS_HEIGHT)
      this.y = CANVAS_HEIGHT - this.radius;
  }
}
