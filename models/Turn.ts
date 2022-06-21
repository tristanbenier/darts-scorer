import { Cell } from './Cell';

class Turn {
  private _maxCells: number = 3;
  private _cells: Cell[] = [];

  addCell (cell: Cell) {
    if (this._cells.length < this._maxCells) {
      this._cells.push(cell);
    }
  }

  get maxCells (): number {
    return this._maxCells;
  }

  set maxCells (maxCells: number) {
    this._maxCells = maxCells;
  }

  get cells (): Cell[] {
    return this._cells;
  }

  set cells (cells: Cell[]) {
    this._cells = cells;
  }

  get isComplete (): boolean {
    return this._cells.length === this._maxCells;
  }

  clone (): Turn {
    throw new Error('Not implemented');
  }
}

export { Turn };
