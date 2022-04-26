import { Cell } from './Cell';
import { Game } from './Game';
import { Player } from './Player';
import { Turn } from './Turn';

class X01Turn extends Turn {
  get points (): number {
    return this.cells.reduce((acc, cell) => acc + cell.points, 0);
  }
}

class X01Player extends Player {
  private _score: number; // The validated score
  private _tmpScore: number|null = null; // The temp score (reached current turn)
  private _currentTurn: X01Turn|null = null;
  private _turns: X01Turn[] = [];

  constructor (playerName: string, initialScore: number) {
    super(playerName);
    this._score = initialScore;
  }

  /**
   * @param cell The cell played
   * @return True if player turn is complete, false otherwise
   */
  play (cell: Cell): boolean {
    if (this._currentTurn === null) {
      this._currentTurn = new X01Turn();
    }

    this._currentTurn.addCell(cell);

    this._tmpScore = this._tmpScore !== null
      ? this._tmpScore - cell.points
      : (this._score || 0) - cell.points
    ;

    if ((this._tmpScore || 0) < 0) {
      this._tmpScore = null;
      this._turns.push(new X01Turn());
      this._currentTurn = null;

      return true;
    }

    if (this._tmpScore === 0 || this._currentTurn.isComplete) {
      this._score = this._tmpScore !== null ? this._tmpScore : this._score;
      this._turns.push(this._currentTurn);
      this._currentTurn = null;

      return true;
    }

    return false;
  }

  get score (): number|null {
    return this._tmpScore !== null
      ? this._tmpScore
      : this._score
    ;
  }

  get currentTurn (): X01Turn|null {
    return this._currentTurn;
  }

  get turns (): X01Turn[] {
    return [...this._turns].reverse();
  }

  get averageTurnPoints () {
    if (this._turns.length === 0) {
      return 0;
    }
    return Math.round(this._turns.reduce((acc, turn) => acc + turn.points, 0) / this._turns.length);
  }

  get checkoutCells (): Cell[] {
    // TODO: https://dartsdojo.com/dart-out-charts/
    return [];
  }
}

class GameX01 extends Game {
  private _startScore: number = 501;
  protected _players: X01Player[] = [];

  constructor (id: number, playerNames: string[], startScore: number) {
    super(id);

    this._startScore = startScore;
    this._players = playerNames.map((playerName: string) => new X01Player(playerName, startScore));
  }

  addPlayer (playerName: string) {
    this._players.push(new X01Player(playerName, this._startScore));
  }

  /**
   * @param cell The cell played
   * @returns True if current player turn is complete, false otherwise
   */
  currentPlayerPlay (cell: Cell): boolean {
    if (this.currentPlayerIndex === null) {
      throw new Error('No current player');
    }

    if (this._players[this.currentPlayerIndex].play(cell)) {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this._players.length;

      return true;
    }

    return false;
  }

  set startScore (startScore: number) {
    this._startScore = startScore;
  }

  get startScore (): number {
    return this._startScore;
  }

  get players (): X01Player[] {
    return this._players;
  }
}

export { GameX01 };
