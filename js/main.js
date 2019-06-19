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
let framesBetweenBars = 7;
let framesBetweenBonus = 50;
//let levelNumber = "";
let speedFactor = 1; // Example: When the speed factor is 2, the background and the bars are twice faster
let audio = new Audio()
audio.src = "img/Tangerine Dream   Love On A Real Train New Version HD.mp3";
audio.play();


function animation() {
  //drawReset (ctx)
  if(player.life >= 1) { 
  updateEverything();
  drawEverything(ctx)
  }
  else if (player.life < 1) {
    drawEnd (ctx);
  }
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
  speedFactor *= 1.00022;  // SPEEDDDDDD  
 
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
      let audio = new Audio()
      audio.src = "img/bar.mp3";
      audio.play();
      console.log("COLLISION!!");
      bars.splice(i, 1);
      player.life -- // Remove the element at position i  
    }
  }

  for (let i = bonus.length - 1; i >= 0; i--) {
    if (bonus[i].checkLife(player)) {
      let audio = new Audio()
      audio.src = "img/bonus.mp3";
      audio.play();
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


function drawEnd (ctx) {

  
  
  ctx.save();
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.font = "60px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(`𝕐𝕆𝕌'𝕍𝔼 ℝ𝔼𝔸ℂℍ𝔼𝔻   ⊿ 𝕃𝔼𝕍𝔼𝕃  ${ levelNumber}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
  ctx.fillText("𝕋ℝ𝕐 𝔸𝔾𝔸𝕀ℕ", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 150);
  ctx.fillText("↩", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 250);
  ctx.font = "40px Arial";
  ctx.fillText("𝕋ℍ𝔼 𝔾𝕆𝔸𝕃 𝕀𝕊 𝕋𝕆 ℝ𝔼𝔸ℂℍ 𝕃𝔼𝕍𝔼𝕃 𝟚𝟘", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 450);
  ctx.restore();
  
  
  
  img = new Image();
  img.src = "img/losangoBranco1.png";
  
  ctx.drawImage(img, 1100, 300);



  document.onkeydown = event => {
    event.preventDefault();
    
    if (event.keyCode == "13") {
      
      drawReset ()  
    } 
  }
}


function drawReset (){
  audio.load();
  audio.play();
  frame = 0; 
  score = 0;
  bg = new Background();
  player = new Player();
  bars = [];
  bonus = [new Bonus()]
  framesBetweenBars = 7;
  framesBetweenBonus = 60;
  speedFactor = 1;
}




function drawLevel (ctx){
  if (score < 999){
    levelNumber= "𝟙"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 2000){
    levelNumber= "𝟚"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 3000){
    levelNumber= "𝟛"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 4000){
    levelNumber= "𝟜"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 5000){
    levelNumber= "𝟝"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 6000){
    levelNumber= "𝟞"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 7000){
    levelNumber= "𝟟"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 8000){
    levelNumber= "𝟠"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 9000){
    levelNumber= "𝟡"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 10000){
    levelNumber= "𝟙𝟘"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 11000){
    levelNumber= "𝟙𝟙"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 12000){
    levelNumber= "𝟙𝟚"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 13000){
    levelNumber= "𝟙𝟛"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 14000){
    levelNumber= "𝟙𝟜"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 15000){
    levelNumber= "𝟙𝟝"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 16000){
    levelNumber= "𝟙𝟞"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 17000){
    levelNumber= "𝟙𝟟"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 18000){
    levelNumber= "𝟙𝟠"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 19000){
    levelNumber= "𝟙𝟡"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  else if (score < 20000){
    levelNumber= "𝟚𝟘"
    ctx.save();
    ctx.fillStyle =  "rgb(149, 152, 156)";
    ctx.font = "50px Arial";
    ctx.fillText(`⊿  𝕃𝔼𝕍𝔼𝕃 ${levelNumber}`, CANVAS_WIDTH - 2100, 55);
    ctx.restore();
  }
  score++
  
}

function removeUselessBars() {
  bars = bars.filter(barRemove => {
    return barRemove.x + barRemove.size + 20 > 0;
  });
}



//-------------------------------------------------------------------------------



//-------------------------------------------------------------------------------


//-------------------------------------------------------------------------------





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
