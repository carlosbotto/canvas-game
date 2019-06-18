// use id "example" to get <canvas></canvas> tag
const canvas = document.getElementById("canvas");

// capture 2d context where everything happens in canvas
// context has all the methods for drawing things
const ctx = canvas.getContext("2d");

// Constants
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const DEBUG = true;
const PLAYER_VELOCITY = 10;
const NB_OF_STARS = 300;


// Global variables
let frame = 0; // The frame counter
let score = 0;
let bg = new Background();
let player = new Player();
let bars = [new Bar()];
let bonus = [new Bonus()]
const framesBetweenBars = 7;
const framesBetweenBonus = 60;

let speedFactor = 1; // Example: When the speed factor is 2, the background and the bars are twice faster

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
  for (let i = 0; i < bonus.length; i++) {
    bonus[i].draw(ctx);
  }
  drawLife(ctx)
  //drawScore(ctx)
  drawLevel(ctx)
}

function updateEverything() {
  frame++;
  // Change the speedFactor
  speedFactor *= 1.00025;  // SPEEDDDDDD  

  if (frame % framesBetweenBars === 0) {
    bars.push(new Bar());
  }

  bg.update();
  player.update();
  for (let i = 0; i < bars.length; i++) {
    bars[i].update();
  }

  //--------------------------------
  
  if (frame % framesBetweenBonus === 0) {
    bonus.push(new Bonus());
  }

  bg.update();
  player.update();
  for (let i = 0; i < bonus.length; i++) {
    bonus[i].update();
  }
  


  // Check collisions
  for (let i = bars.length - 1; i >= 0; i--) {
    if (bars[i].checkCollision(player)) {
      console.log("COLLISION!!");
      bars.splice(i, 1);
      player.life -- // Remove the element at position i  
    }
  }

  for (let i = bonus.length - 1; i >= 0; i--) {
    if (bonus[i].checkLife(player)) {
      console.log("LIFE!!!");
      bonus.splice(i, 1);
      player.life ++ // Remove the element at position i  
    }
  }

  removeUselessBars();
  
}

function drawLife(ctx) {
  ctx.save();
  ctx.fillStyle =  "rgb(149, 152, 156)";
  ctx.font = "50px Arial";
  ctx.fillText("⊿  𝕃𝕀𝔽𝔼: " + "♢ ".repeat(player.life), CANVAS_WIDTH - 1540, 55);
  ctx.restore();
}

function drawScore(ctx) {
  ctx.save();
  ctx.fillStyle =  "rgb(149, 152, 156)";
  ctx.font = "50px Arial";
  ctx.fillText("𝕊ℂ𝕆ℝ𝔼: " + score++, CANVAS_WIDTH - 2050, 55);
  ctx.restore();
}





function drawLevel (ctx){
  if (score < 999){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 2000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟚", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 3000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟛", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 4000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟜", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 5000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟝", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 6000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟞", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 7000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟟", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 8000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟠", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 9000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟡", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 10000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙𝟘", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 11000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙𝟙", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 12000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙𝟚", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 13000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙𝟛", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 14000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙𝟜", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 15000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙𝟝", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 16000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙𝟞", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 17000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙𝟟", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 18000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙𝟠", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 19000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟙𝟡", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 20000){
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText("⊿  𝕃𝔼𝕍𝔼𝕃 𝟚𝟘", CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  score++
  console.log(score)
}

function removeUselessBars() {
  bars = bars.filter(barRemove => {
    return barRemove.x + barRemove.size + 20 > 0;
  });
}





requestAnimationFrame(mainLoop);  // start when code below done.
// set up keyboard IO
const keys = {
    KeyP : false,
    Enter : false,
    listener(e){
       if(keys[e.code] !== undefined){
           keys[e.code] = e.type === "keydown";
           e.preventDefault();
        }
    }
}
addEventListener("keydown",keys.listener);
addEventListener("keyup",keys.listener);

// the current game state
var currentState = startGame;

function startGame (){
    // code to do a single frame of start game
   // display press enter to start
   if(keys.Enter){
      keys.Enter = false;
      currentState = game;  // start the game
   }
}
function pause(){
    // code to do a single frame of pause
   // display pause
    if(keys.KeyP){
       keys.KeyP = false; // turn off key
       currentState = game;   // resume game
    }

}
function game(){
    // code to do a single frame of game
    if(keys.KeyP){
       keys.KeyP = false; // turn off key
       currentState = pause;  // pause game
    }
}
function mainLoop(time){
    currentState(); // call the current game state
    requestAnimationFrame(mainLoop);
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
