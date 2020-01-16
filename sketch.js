let cols;
let rows;
const size = 80;
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

  current = grid[23];
  current.visited = true;
}

function draw() {
  background(51);
  frameRate(1);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();

    if (grid[i].visited) {
      grid[i].highlight(100);
    }
  }

  const availableNeighbors = current.checkNeighbors();
  const next = random(availableNeighbors);
  console.log(next);

  next.visited = true;
  current = next;
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

  this.highlight = (...args) => {
    fill(...args);
    rect(x, y, size, size);
  };

  this.checkNeighbors = () => {
    let  neighbors = [];

    console.log(this.i + ' ' + this.j);

    console.log('top: ', getIndex(this.i, this.j - 1));
    console.log('right: ', getIndex(this.i + 1, this.j ));
    console.log('bottom: ', getIndex(this.i, this.j + 1));
    console.log('left: ', getIndex(this.i - 1, this.j));

    const top = grid[getIndex(this.i, this.j - 1)];
    const right = grid[getIndex(this.i + 1, this.j )];
    const bottom = grid[getIndex(this.i, this.j + 1)];
    const left = grid[getIndex(this.i - 1, this.j)];

    // top.highlight(66, 135, 245); // blue
    // right.highlight(63, 224, 101); // green
    // bottom.highlight(209, 54, 103); // red
    // left.highlight(204, 139, 47); // orange

    if (top && !top.visited) {
      neighbors.push(top);
    }

    if (right && !right.visited) {
      neighbors.push(right);
    }

    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }

    if (left && !left.visited) {
      neighbors.push(left);
    }

    return neighbors;
  };
}

function getIndex(i, j) {
  if (i < 0 || j < 0 || i > rows - 1 || j > cols -1 ) {
    return -1;
  }

  return j + i * cols;
}


