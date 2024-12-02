const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Yılanın ve yemin boyutu
const canvasSize = 600; // Canvas boyutu

let snake = [{x: 9 * box, y: 9 * box}]; // Başlangıç yılan pozisyonu
let food = {x: Math.floor(Math.random() * 30) * box, y: Math.floor(Math.random() * 30) * box}; // Başlangıç yemi
let direction = ""; // Başlangıç yönü
let score = 0;
let colorChange = 0;

// Canvas boyutları ayarları
canvas.width = canvasSize;
canvas.height = canvasSize;

// Yılanın hareketini kontrol et
document.addEventListener("keydown", directionControl);

function directionControl(event) {
  if (event.keyCode == 37 && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.keyCode == 38 && direction !== "DOWN") {
    direction = "UP";
  } else if (event.keyCode == 39 && direction !== "LEFT") {
    direction = "RIGHT";
  } else if (event.keyCode == 40 && direction !== "UP") {
    direction = "DOWN";
  }
}

// Yılanın hareketini güncelle
function update() {
  let snakeHead = {x: snake[0].x, y: snake[0].y};

  if (direction == "LEFT") snakeHead.x -= box;
  if (direction == "UP") snakeHead.y -= box;
  if (direction == "RIGHT") snakeHead.x += box;
  if (direction == "DOWN") snakeHead.y += box;

  // Yılan kendine çarparsa
  if (snakeHead.x < 0 || snakeHead.y < 0 || snakeHead.x >= canvasSize || snakeHead.y >= canvasSize || collision(snakeHead, snake)) {
    clearInterval(game);
    alert("Game Over! Score: " + score);
    return;
  }

  snake.unshift(snakeHead);

  // Yem yediğinde
  if (snakeHead.x == food.x && snakeHead.y == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 30) * box,
      y: Math.floor(Math.random() * 30) * box
    };
  } else {
    snake.pop();
  }

  // Ekranı temizle ve yeniden çiz
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  drawScore();
  changeColor();
}

// Yılanın kendini çiz
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = `rgb(${colorChange}, ${255 - colorChange}, 100)`;
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Yemi çiz
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

// Puanı çiz
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Puan: " + score, 20, 30);
}

// Yılanın çarpışıp çarpmadığını kontrol et
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// Renk değişimini ayarla
function changeColor() {
  if (colorChange >= 255) {
    colorChange = 0;
  } else {
    colorChange += 1;
  }
}

// Oyunu başlat
let game = setInterval(update, 100);
