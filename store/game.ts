import { defineStore } from 'pinia';

import { Cell } from '@/models/Cell';
import { Game } from '@/models/Game';

const saveGame = (game: Game) => {
  const { $storage } = useNuxtApp();

  const gameName = game.NAME;
  $storage.set(gameName, game);
};

const getSavedGame = (gameName: string) => {
  const { $storage } = useNuxtApp();

  return $storage.get(gameName);
};

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
    this.savedGames = [gameClone];

    saveGame(this.currentGame);
  },
  loadGameFromStorage (gameName: string) {
    return getSavedGame(gameName);
  },

  currentPlayerPlay (cell: Cell) {
    const gameClone = this.currentGame.clone();
    this.savedGames.push(gameClone);
    this.actions++;

    this.currentGame.currentPlayerPlay(cell);
    saveGame(this.currentGame);
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
      return this.cancelLastAction();
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
