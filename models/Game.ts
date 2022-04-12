class Game {
  private _id: number = 0;
  private _currentPlayerIndex: number|null = null;

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
}

export { Game };
