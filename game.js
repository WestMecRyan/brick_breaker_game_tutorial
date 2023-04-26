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

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);

  // make a switch case for changing the color of the ball
  switch (true) {
    // case ball is going up and right
    // case ball is going down and right
    // case ball is going left and up
    // case ball is going left and down
    // add a default fill color of black
    default:
      ctx.fillStyle = "#00000";
  }
  // fill in the color
  ctx.fill();
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

// the animation function continually clears the screen and redraws everything based on new values
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  updateBall();
  // a callback for the animation function
  // if the game is playing call back the animate function
  if (!isPaused) {
    requestAnimationFrame(animate);
  }
}

// the initial animation call
animate();
