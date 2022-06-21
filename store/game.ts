import { defineStore } from 'pinia';

import { Cell } from '@/models/Cell';
import { Game } from '@/models/Game';

type CellState = {
  currentGame: Game;
  savedGames: Game[];
  actions: number;
}

const initialState: CellState = {
  currentGame: null,
  savedGames: [],
  actions: 0,
};

const actions: { [key: string]: Function } = {
  init (game: Game) {
    this.currentGame = game;
    this.currentGame.currentPlayerIndex = 0;
    const gameClone = this.currentGame.clone();
    this.savedGames.push(gameClone);
  },
  currentPlayerPlay (cell: Cell) {
    const gameClone = this.currentGame.clone();
    this.savedGames.push(gameClone);
    this.actions++;

    this.currentGame.currentPlayerPlay(cell);
  },
  cancelLastAction () {
    if (!this.savedGames.length) {
      return;
    }

    this.actions--;
    this.currentGame = this.savedGames.pop();

    // Cancel entire current player turn
    const currentPlayerIndex = this.currentGame.currentPlayerIndex;
    const lastSavedGamePlayerIndex = this.savedGames[this.savedGames.length - 1]?.currentPlayerIndex;
    if (currentPlayerIndex === lastSavedGamePlayerIndex) {
      this.cancelLastAction();
    }

  },
};

const getters = {
};

export const useGameStore = defineStore('games', {
  state: () => ({ ...initialState }),
  getters,
  actions,
});
