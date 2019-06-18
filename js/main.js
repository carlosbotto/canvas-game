// use id "example" to get <canvas></canvas> tag
const canvas = document.getElementById("canvas");

// capture 2d context where everything happens in canvas
// context has all the methods for drawing things
const ctx = canvas.getContext("2d");

// Constants
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const DEBUG = false;
const PLAYER_VELOCITY = 10;
const NB_OF_STARS = 200;

// Global variables
let frame = 0; // The frame counter
let bg = new Background();
let player = new Player();
let bars = [new Bar()];
const framesBetweenBars = 50;
let speedFactor = 2; // Example: When the speed factor is 2, the background and the bars are twice faster

function animation() {
  updateEverything();
  drawEverything(ctx);
  window.requestAnimationFrame(animation);
}
animation();

function drawEverything(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  bg.draw(ctx);
  player.draw(ctx);
  for (let i = 0; i < bars.length; i++) {
    bars[i].draw(ctx);
  }
  drawScore()
}

function updateEverything() {
  frame++;
  // Change the speedFactor
  speedFactor *= 1.001;

  if (frame % framesBetweenBars === 0) {
    bars.push(new Bar());
  }

  bg.update();
  player.update();
  for (let i = 0; i < bars.length; i++) {
    bars[i].update();
  }

  // Check collisions
  for (let i = bars.length - 1; i >= 0; i--) {
    if (bars[i].checkCollision(player)) {
      console.log("COLLISION!!");
      bars.splice(i, 1); // Remove the element at position i
      // TODO: remove 1 life to your player
    }
  }
}

function drawScore() {
  // TODO
}

// ----- Util functions -----
// Distance between a dot (x,y) and a segment from (x1,y1) to (x2,y2)
function pDistance(x, y, x1, y1, x2, y2) {
  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0)
    //in case of 0 length line
    param = dot / len_sq;

  var xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}
