class Background {
  constructor() {
    this.stars = []
    for(let i = 0; i < NB_OF_STARS; i++) {
      this.stars.push(new Star());
    };
  }
  draw(ctx) {
    ctx.save();
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].draw(ctx);
    }
    ctx.restore();
  }
  update() {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].update();
    }
  }
}
