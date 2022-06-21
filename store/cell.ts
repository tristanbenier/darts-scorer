import { defineStore } from 'pinia';

import { Cell } from '@/models/Cell';

type CellState = {
  cells: { [key: string]: Cell }
}

const initialState: CellState = {
  cells: {},
};

const actions: { [key: string]: Function } = {
  initCells (): void {
    const keys = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      'd-1', 'd-2', 'd-3', 'd-4', 'd-5', 'd-6', 'd-7', 'd-8', 'd-9', 'd-10', 'd-11', 'd-12', 'd-13', 'd-14', 'd-15', 'd-16', 'd-17', 'd-18', 'd-19', 'd-20',
      't-1', 't-2', 't-3', 't-4', 't-5', 't-6', 't-7', 't-8', 't-9', 't-10', 't-11', 't-12', 't-13', 't-14', 't-15', 't-16', 't-17', 't-18', 't-19', 't-20',
      'bull', 'd-bull', 'miss',
    ];

    keys.forEach((key: string) => {
      const cell = Cell.createFromKey(key);

      this.cells[cell.key] = cell;
    });
  },
};

const getters = {
  cell (state: CellState): Function {
    return (key: string) => (state.cells[key] || null);
  },
};

export const useCellsStore = defineStore('cells', {
  state: () => ({ ...initialState }),
  getters,
  actions,
});
