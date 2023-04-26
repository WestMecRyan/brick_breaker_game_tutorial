"use strict";

// declare the canvas and the context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//add an array with the color constants we want
const colorArr = ["#ee0000", "#00ee00", "#0000ee", "#0055dd"];
// simulate a 16:9 ratio for the canvas
canvas.width = 500;
canvas.height = 280;

// declare the variables for our html elements
const pauseButton = document.getElementById("pause-button");
let isPaused = false;
let bounces = 0;
const speedSlider = document.getElementById("speed-slider");
speedSlider.addEventListener("input", function () {
  ball.speed = parseInt(speedSlider.value);
  ball.dx = ball.speed;
  ball.dy = ball.speed;
});
pauseButton.addEventListener("click", function () {
  isPaused = !isPaused;

  if (!isPaused) {
    pauseButton.innerHTML = "Pause";
    console.log("game is playing");
    animate();
  } else {
    pauseButton.innerHTML = "Play";
    console.log("game is paused");
  }
});
// declare the ball object
const ball = {
  x: 50,
  y: 50,
  dx: 5,
  dy: 5,
  speed: 5,
  size: 20,
};
// declare the paddle object
const paddle = {
  width: 80,
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  height: 10,
  speed: 7,
};
// write a function to draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);

  // make a switch case for changing the color of the ball
  switch (true) {
    // case ball is going up and right
    case ball.dx >= 0 && ball.dy >= 0:
      ctx.fillStyle = colorArr[0];
      break;
    // case ball is going down and right
    case ball.dx >= 0 && ball.dy < 0:
      ctx.fillStyle = colorArr[1];
      break;
    // case ball is going left and up
    case ball.dx < 0 && ball.dy >= 0:
      ctx.fillStyle = colorArr[2];
      break;
    // case ball is going left and down
    case ball.dx < 0 && ball.dy < 0:
      ctx.fillStyle = colorArr[3];
      break;
    // add a default fill color of black
    default:
      ctx.fillStyle = "#00000";
  }
  // fill in the color
  ctx.fill();
}
// write a function to draw the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}
// update the ball's direction based on touching the walls calculated by x and y position with account to ball diameter (size)
function updateBall() {
  if (ball.x + ball.size)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
      ball.dx *= -1;
    }

  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
}
// logic for the paddle move
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function movePaddle() {
  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.x += paddle.speed;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= paddle.speed;
  }
}

function detectCollision() {
  if (
    ball.y + ball.size >= paddle.y &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.width
  ) {
    ball.dy = -ball.dy; // Reverse the dy direction
    // bounces += 1;
  }
}
function updatePosition() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

// the animation function continually clears the screen and redraws everything based on new values
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //draw the ball
  drawBall();
  // draw the paddle
  drawPaddle();
  // detect collision
  detectCollision();
  updatePosition();
  // update the balls attributes i.e. position, color, size
  updateBall();
  // update the movement for the paddle
  movePaddle();
  // a callback for the animation function
  // if the game is playing call back the animate function
  if (!isPaused) {
    requestAnimationFrame(animate);
  }
}

// the initial animation call
animate();
