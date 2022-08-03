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

  public get players (): Player[] {
    return this._players;
  }

  public get playerNames (): string[] {
    return this._players.map((player: Player) => player.name);
  }

  public set players (players: Player[]) {
    this._players = players;
  }

  setNextPlayerToPlay (): void {
    this.currentPlayerIndex = ((this.currentPlayerIndex || 0) + 1) % this._players.length;
  }

  clone () {
    throw new Error('Not implemented');
  }

  get NAME (): string {
    return this.constructor.name;
  }
}

export { Game };
