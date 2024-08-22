/**
 * TODO:
 * Get input
 * Update stuff
 * Actually use this TODO correctly (everyone uses it so i think i should too)
 */

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

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
        console.log('hi')
        if(game.map[x][y].alive) ctx.fillStyle = game.map[x][y].color.alive;
        else ctx.fillStyle = game.map[x][y].color.dead;
        ctx.fillRect(x * game.map[x][y].size + game.cellGap * (x + 1), y * game.map[x][y].size + game.cellGap * (y + 1), game.map[x][y].size, game.map[x][y].size)
      }
    }
  },
};

// if less than 2 neigbors, death
// if 2 or 3 neigbors, live
// if more than 3 neigborsm, death
// if dead and 3 alive neigbors, revive

class Cell {
  constructor() {
    this.alive = false;
    this.size = 10;
    this.color = {
      alive: "yellow",
      dead: "#A0A0A0"
    }
  }
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    // Loop start
    loop = setInterval(update, 1000 / 60);
  }
});

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
}

window.onload = init();
