import { Player } from './Player';

class Game {
  protected _id: number = 0;
  protected _currentPlayerIndex: number|null = null;
  protected _players: Player[] = [];

  constructor (id: number) {
    this._id = id;
  }

  get id (): number {
    return this._id;
  }

  get currentPlayerIndex (): number|null {
    return this._currentPlayerIndex;
  }

  set currentPlayerIndex (currentPlayerIndex: number|null) {
    this._currentPlayerIndex = currentPlayerIndex;
  }

  get players (): Player[] {
    return this._players;
  }

  set players (players: Player[]) {
    this._players = players;
  }

  setNextPlayerToPlay (): void {
    this.currentPlayerIndex = ((this.currentPlayerIndex || 0) + 1) % this._players.length;
  }

  clone () {
    throw new Error('Not implemented');
  }
}

export { Game };
