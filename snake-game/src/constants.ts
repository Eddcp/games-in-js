export const CANVAS_SIZE = 600;
export const GRID_SIZE = 20;
export const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
} as const;
