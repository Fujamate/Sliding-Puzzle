export const TILE_COUNT = 16; // change the TILE_COUNT for different sizes
export const GRID_SIZE = Math.sqrt(TILE_COUNT);
export const BOARD_SIZE = 320;

// Check if solvable
export function isSolvable(tiles) {
  let product = 1;
  for (let i = 1, l = TILE_COUNT - 1; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
    }
  }
  return Math.round(product) === 1;
}

// check for win condition
export function isSolved(tiles) {
  for (let i = 0, l = tiles.length; i < l; i++) {
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
}

// Get the linear index from a row/col pair.
export function getIndex(row, col) {
  return parseInt(row, 10) * GRID_SIZE + parseInt(col, 10);
}

// Get the row/col pair from a linear index.
export function getFakePosition(index) {
  return {
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  };
}

export function getVisualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  };
}

export function shuffle(tiles) {
  const shuffledTiles = [
    ...tiles
      .filter((t) => t !== tiles.length - 1)
      .sort(() => Math.random() - 0.5),
    tiles.length - 1,
  ];
  return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
    ? shuffledTiles
    : shuffle(shuffledTiles);
}

// check if moveable
export function canSwap(srcIndex, destIndex) {
  const { row: srcRow, col: srcCol } = getFakePosition(srcIndex);
  const { row: destRow, col: destCol } = getFakePosition(destIndex);
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

// swap function
export function swap(tiles, src, dest) {
  const tilesResult = [...tiles];
  [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
  return tilesResult;
}
