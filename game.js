"use strict";

// declare the canvas and the context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// simulate a 16:9 ratio for the canvas
canvas.width = 500;
canvas.height = 280;

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
  // choose the ball fill color
  ctx.fillStyle = "#dd0022";
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
  requestAnimationFrame(animate);
}

// the initial animation call
animate();
