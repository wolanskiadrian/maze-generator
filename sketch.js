let cols;
let rows;
const size = 40;
const grid = [];

let current;

function setup() {
  createCanvas(400, 400);
  cols = floor(width / size);
  rows = floor(height / size);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
  current.visited = true;

  console.log(grid);
}

function draw() {
  background(51);

  for(let i = 0; i < grid.length; i++) {
    grid[i].show();

    if(grid[i].visited) {
      grid[i].highlight();
    }
  }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = {
    top: true,
    right: true,
    bottom: true,
    left: true
  };
  this.visited = false;

  const x = this.i * size;
  const y = this.j * size;

  this.show = () => {
    stroke(255);
    if (this.walls.top) {
      line(x, y, x + size, y);
    }

    if (this.walls.right) {
      line(x + size, y, x + size, y + size);
    }

    if (this.walls.bottom) {
      line(x + size, y + size, x, y + size);
    }

    if (this.walls.left) {
      line(x, y + size, x, y);
    }
  };

  this.highlight = () => {
    fill(100);
    rect(x, y, size, size);
  };
}


