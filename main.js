/**
 * TODO:
 * Get input
 * Update stuff
 * Actually use this TODO correctly (everyone uses it so i think i should too)
 */

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let speed = 25;
let loop = null;
let generatoin = 1;

const game = {
  width: canvas.width,
  height: canvas.height,
  cellXAmount: 90,
  cellYAmount: 60,
  cellGap: 1,
  map: [],
  draw: () => {
    for (let x = 0; x < game.cellXAmount; x++) {
      for (let y = 0; y < game.cellYAmount; y++) {
        if (game.map[x][y].alive) ctx.fillStyle = game.map[x][y].color.alive;
        else ctx.fillStyle = game.map[x][y].color.dead;
        ctx.fillRect(
          x * game.map[x][y].size + game.cellGap * (x + 1),
          y * game.map[x][y].size + game.cellGap * (y + 1),
          game.map[x][y].size,
          game.map[x][y].size
        );
      }
    }
  },
};

// if less than 2 neigbors, death
// if 2 or 3 neigbors, live
// if more than 3 neigborsm, death
// if dead and 3 alive neigbors, revive

canvas.addEventListener("mousedown", (event) => {
  let mouseXPos = event.offsetX;
  let mouseYPos = event.offsetY;
  mouseXPos = Math.floor(mouseXPos / (new Cell().size + game.cellGap));
  mouseYPos = Math.floor(mouseYPos / (new Cell().size + game.cellGap));
  if (
    !(
      mouseXPos >= 0 &&
      mouseXPos < game.cellXAmount &&
      mouseYPos >= 0 &&
      mouseYPos < game.cellYAmount
    )
  ) {
    return null;
  }
  if (!game.map[mouseXPos][mouseYPos].alive) {
    game.map[mouseXPos][mouseYPos].alive = true;
  } else {
    game.map[mouseXPos][mouseYPos].alive = false;
  }
  game.draw();
});

class Cell {
  constructor() {
    this.alive = false;
    this.size = 10;
    this.color = {
      alive: "yellow",
      dead: "#A0A0A0",
    };
  }
}

window.addEventListener("keydown", (event) => {
  if (event.code !== "Space") {
    return null;
  }
  if (loop) {
    clearInterval(loop);
    loop = null;
    return null;
  }
  // Loop start
  loop = setInterval(update, speed);
});

function checkCells(generatoin) {
  const deadCells = []; //HOLY CRAP DEAD CELLS REAL!!!?!?!?!? (i dont play it nor know it that much but i know it has parrying. and as an ultrakill fan, that is cool)
  const aliveCells = [];
  game.map.forEach((row, x) => {
    row.forEach((eachCell, y) => {
      // Count neighbors
      let aliveNeighbors = 0;
      if (x > 0 && y > 0 && game.map[x - 1][y - 1].alive == true)
        aliveNeighbors++;
      if (y > 0 && game.map[x][y - 1].alive == true) aliveNeighbors++;
      if (
        x < game.cellXAmount - 1 &&
        y > 0 &&
        game.map[x + 1][y - 1].alive == true
      )
        aliveNeighbors++;
      if (x > 0 && game.map[x - 1][y].alive == true) aliveNeighbors++;
      if (x < game.cellXAmount - 1 && game.map[x + 1][y].alive == true)
        aliveNeighbors++;
      if (
        x > 0 &&
        y < game.cellYAmount - 1 &&
        game.map[x - 1][y + 1].alive == true
      )
        aliveNeighbors++;
      if (y < game.cellYAmount - 1 && game.map[x][y + 1].alive == true)
        aliveNeighbors++;
      if (
        x < game.cellXAmount - 1 &&
        y < game.cellYAmount - 1 &&
        game.map[x + 1][y + 1].alive == true
      )
        aliveNeighbors++;

      // Add to next generatoin
      if (aliveNeighbors < 2 || aliveNeighbors > 3) {
        deadCells.push(eachCell);
      }
      if (
        ((aliveNeighbors === 2 || aliveNeighbors === 3) && eachCell.alive === true) ||
        (aliveNeighbors === 3 && eachCell.alive === false)
      ) {
        aliveCells.push(eachCell);
      }
    });
  });
  deadCells.forEach((elem) => (elem.alive = false));
  aliveCells.forEach((elem) => (elem.alive = true));
  console.log(`----==== GENERATION ${generatoin} ====----`);
  console.log("New generation members: ", aliveCells);
  console.log("Pouplation: ", aliveCells.length);
}

function init() {
  // init map
  for (let x = 0; x < game.cellXAmount; x++) {
    game.map.push([]);
    for (let y = 0; y < game.cellYAmount; y++) {
      game.map[x].push(new Cell());
    }
  }

  // Drawing
  ctx.clearRect(0, 0, game.width, game.height);
  ctx.fillStyle = "#C0C0C0";
  ctx.fillRect(0, 0, game.width, game.height);
  game.draw();
}

function update() {
  ctx.clearRect(0, 0, game.width, game.height);
  ctx.fillStyle = "#C0C0C0";
  ctx.fillRect(0, 0, game.width, game.height);
  checkCells(generatoin);
  game.draw();
  generatoin++;
}

window.onload = init();
