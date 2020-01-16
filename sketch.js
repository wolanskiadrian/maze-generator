let cols;
let rows;
const size = 20;
const grid = [];
const stack = [];

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
  current.current = true;
}

function draw() {
  background(51);
  frameRate(100);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();

    if (grid[i].visited) {
      grid[i].highlight(100);
    }

    if(grid[i].current) {
      grid[i].highlightCurrent();
    }
  }

  // Check for available neighbors;
  const availableNeighbors = current.checkNeighbors();

  // Pick random neighbor;
  let next = random(availableNeighbors);

  current.current = false;

  //If neighbor is available pick him otherwise take next from stack;
  if (next) {
    // push next to stack;
    stack.push(next);
    next.visited = true;

    // remove walls between current and next;
    removeWalls(current, next);

    current = next;
  } else if (stack.length) {
    current = stack.pop();
  } else {
    console.log('Maze generated!');
    noLoop();
  }

  current.current = true;
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
  this.current = false;

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

  this.highlightCurrent = () => {
    this.highlight(63, 224, 101);
  };

  this.highlight = (...args) => {
    fill(...args);
    stroke(100);
    rect(x + 1, y + 1, size - 2, size - 2);
  };

  this.checkNeighbors = () => {
    let  neighbors = [];

    const top = grid[getIndex(this.i, this.j - 1)];
    const right = grid[getIndex(this.i + 1, this.j )];
    const bottom = grid[getIndex(this.i, this.j + 1)];
    const left = grid[getIndex(this.i - 1, this.j)];

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

function removeWalls (current, next) {
  const x = current.i - next.i;

  if (x === 1) {
    current.walls.left = false;
    next.walls.right = false;
  } else if ( x === -1) {
    current.walls.right = false;
    next.walls.left = false;
  }

  const y = current.j - next.j;

  if (y === 1) {
    current.walls.top = false;
    next.walls.bottom = false
  } else if (y === -1) {
    current.walls.bottom = false;
    next.walls.top = false
  }
}
