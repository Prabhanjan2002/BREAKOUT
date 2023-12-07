const grid = document.querySelector(".grid");
const scoredisplay = document.querySelector("#score");
const blockwidth = 100;
const blockheight = 20;
const boardwidth = 560;
const boardheight = 300;
let score = 0;

const balldiameter = 20;
let xdirection = 2;
let ydirection = 2;
let timerID;

const userstart = [230, 10];
let currentposition = userstart;

const ballstart = [270, 40];
let ballcurrentposition = ballstart;

class Block {
  constructor(xaxis, yaxis) {
    this.bottomleft = [xaxis, yaxis];
    this.buttomright = [xaxis + blockwidth, yaxis];
    this.topleft = [xaxis, yaxis + blockheight];
    this.topright = [xaxis + blockwidth, yaxis + blockheight];
  }
}
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

function addblocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomleft[0] + "px";
    block.style.bottom = blocks[i].bottomleft[1] + "px";
    grid.appendChild(block);
  }
}
addblocks();

//add user
const user = document.createElement("div");
user.classList.add("user");
drawuser();
grid.appendChild(user);

function drawuser() {
  user.style.left = currentposition[0] + "px";
  user.style.bottom = currentposition[1] + "px";
}

function moveuser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentposition[0] > 0) {
        currentposition[0] -= 10;
        drawuser();
      }
      break;
    case "ArrowRight":
      if (currentposition[0] < boardwidth - blockwidth) {
        currentposition[0] += 10;
        drawuser();
      }
      break;
  }
}

document.addEventListener("keydown", moveuser);

//add a ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawball();
grid.appendChild(ball);
function drawball() {
  ball.style.left = ballcurrentposition[0] + "px";
  ball.style.bottom = ballcurrentposition[1] + "px";
}

// move the ball
function moveball() {
  ballcurrentposition[0] += xdirection;
  ballcurrentposition[1] += ydirection;
  drawball();
  checkforcollision();
}
timerID = setInterval(moveball, 30);

//check for collision
function checkforcollision() {
  //check for block collision
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballcurrentposition[0] > blocks[i].bottomleft[0] &&
      ballcurrentposition[0] < blocks[i].buttomright[0] &&
      ballcurrentposition[1] + balldiameter > blocks[i].bottomleft[1] &&
      ballcurrentposition[1] < blocks[i].topleft[1]
    ) {
      const allblocks = Array.from(document.querySelectorAll(".block"));
      allblocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changedirection();
      score++;
      scoredisplay.innerHTML = score;
      if (blocks.length === 0) {
        scoredisplay.innerHTML = "you win";
        clearInterval(timerID);
        document.removeEventListener("keydown", moveuser);
      }
    }
  }

  //check for wall collision
  if (
    ballcurrentposition[0] >= boardwidth - balldiameter ||
    ballcurrentposition[1] >= boardheight - balldiameter ||
    ballcurrentposition[0] <= 0
  ) {
    changedirection();
  }
  //check for user collision
  if (
    ballcurrentposition[0] > currentposition[0] &&
    ballcurrentposition[0] < currentposition[0] + blockwidth &&
    ballcurrentposition[1] > currentposition[1] &&
    ballcurrentposition[1] < currentposition[1] + blockheight
  ) {
    changedirection();
  }

  //checkfor game over
  if (ballcurrentposition[1] <= 0) {
    clearInterval(timerID);
    scoredisplay.textContent = "you lose";
    document.removeEventListener("keydown", moveuser);
  }
}
function changedirection() {
  if (xdirection === 2 && ydirection === 2) {
    ydirection = -2;
    return;
  }
  if (xdirection === 2 && ydirection === -2) {
    xdirection = -2;
    return;
  }
  if (xdirection === -2 && ydirection === -2) {
    ydirection = 2;
    return;
  }
  if (xdirection === -2 && ydirection === 2) {
    xdirection = 2;
    return;
  }
}
