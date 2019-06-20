class Bar {
  constructor() {
    this.size = 200 + Math.random() * 300 ;
    this.x = 300 + CANVAS_WIDTH + 200;
    this.y = Math.floor(CANVAS_HEIGHT * Math.random()) + 100
    this.vx = -5; // Velocity y

    let randomNumber = 1 + Math.floor(130 * Math.random());
    // this.img = new Image();
    // this.img.src = "img/fireball.png";
  }

  draw(ctx) {
    ctx.save(); // Save the current context state

    // ctx.fillStyle = "red";

    // Draw the bars
    // if (DEBUG) {
    //   ctx.beginPath();
    //   ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    //   ctx.stroke();
    //   ctx.fill();
    // }

    // Draw the picture
    // ctx.translate(this.x, this.y);
    // let size = 4 * this.radius;
    // ctx.drawImage(this.img, -size / 2, -size / 2, size, size);

    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "bisque";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x +this.size, this.y)
    ctx.stroke();

    ctx.restore(); // Restore the context state from the begining
  }
  update() {
    this.x += speedFactor * this.vx;
  }
  // Return true when there is a collision between the bar and player
  checkCollision(player) {
    return pDistance(player.x, player.y, this.x, this.y, this.x+this.size, this.y) < 50
  }
}
