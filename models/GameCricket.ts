import { Cell } from './Cell';
import { Game } from './Game';
import { Player } from './Player';
import { Turn } from './Turn';

const CRICKET_CELL_KEYS = [
  '15', '16', '17', '18', '19', '20', 'bull',
  'd-15', 'd-16', 'd-17', 'd-18', 'd-19', 'd-20', 'd-bull',
  't-15', 't-16', 't-17', 't-18', 't-19', 't-20',
];

const CRICKET_SCORE_CELL_KEYS = [
  '15', '16', '17', '18', '19', '20', 'bull',
];

class CricketTurn extends Turn {
  clone (): CricketTurn {
    const clone = new CricketTurn();

    clone.cells = this.cells;
    clone.maxCells = this.maxCells;

    return clone;
  }

  static createFromStoredValue (storedValue: any): CricketTurn {
    const turn = new CricketTurn();

    turn.maxCells = storedValue._maxCells;
    turn.cells = (storedValue._cells || []).map(turnValue => Cell.createFromStoredValue(turnValue));

    return turn;
  }
}

class CricketPlayer extends Player {
  declare protected _turns: CricketTurn[];
  private _scores: { [cellKey: string]: number } = {};
  private _points: number = 0;
  private _currentTurn: CricketTurn|null = null;

  /**
   * @param cell The cell played
   */
  play (cell: Cell) {
    let isTurnComplete = false;
    let pointsToAdd = 0;

    if (this._currentTurn === null) {
      this._currentTurn = new CricketTurn();
    }

    const cellScoreKey = cell.key.replace('d-', '').replace('t-', '');

    let nbTouchesToAdd: number = 1;
    if (cell.isDouble) {
      nbTouchesToAdd = 2;
    } else if (cell.isTriple) {
      nbTouchesToAdd = 3;
    }

    const cellScore = (this._scores[cellScoreKey] || 0) + nbTouchesToAdd;
    if (CRICKET_CELL_KEYS.includes(cellScoreKey)) {
      this._scores[cellScoreKey] = Math.min(cellScore, 3);

      // Compute the points to potentially add to other players
      if (cellScore > 3) {
        pointsToAdd = (cellScore - 3) * cell.simpleCellPoints;
      }
    }

    this._currentTurn.addCell(cell);

    if (this._currentTurn.isComplete || this.hasCompletedAllCells) {
      this._turns.push(this._currentTurn);
      this._currentTurn = null;

      isTurnComplete = true;
    }

    return { isTurnComplete, pointsToAdd };
  }

  addPointsForCell (cell: Cell, points: number): void {
    const cellScoreKey = cell.key.replace('d-', '').replace('t-', '');

    if (this.hasCompletedCell(cellScoreKey)) {
      return;
    }

    this._points += points;
  }

  getCellScore (cellKey: string): number {
    return this._scores[cellKey] || 0;
  }

  hasCompletedCell (cellKey: string): boolean {
    return this._scores[cellKey] === 3;
  }

  get points (): number {
    return this._points;
  }

  set points (points: number) {
    this._points = points;
  }

  get hasCompletedAllCells (): boolean {
    return CRICKET_SCORE_CELL_KEYS
      .every(cellKey => this.hasCompletedCell(cellKey))
    ;
  }

  get scores (): { [key: string]: number } {
    return this._scores;
  }

  set scores (scores: { [key: string]: number }) {
    this._scores = scores;
  }

  clone (): CricketPlayer {
    const clone = new CricketPlayer(this.name);

    clone.name = this.name;
    clone._scores = { ...this._scores };
    clone._points = this._points;
    clone._currentTurn = this._currentTurn?.clone() || null;
    clone._turns = this._turns.map((turn: CricketTurn) => turn.clone());

    return clone;
  }

  static createFromStoredValue (storedValue: any): CricketPlayer {
    const player = new CricketPlayer(storedValue._name);

    const turns = (storedValue._turns || []).map(storedTurn => CricketTurn.createFromStoredValue(storedTurn));
    player.turns = turns;

    player.scores = { ...storedValue._scores };

    player.points = storedValue._points;

    return player;
  }
}

class GameCricket extends Game {
  declare protected _players: CricketPlayer[];

  constructor (id: number, playerNames: string[]) {
    super(id);

    this._players = playerNames.map((playerName: string) => new CricketPlayer(playerName));
  }

  /**
   * @param cell The cell played
   * @returns True if current player turn is complete, false otherwise
   */
  currentPlayerPlay (cell: Cell): boolean {
    if (this.currentPlayerIndex === null) {
      throw new Error('No current player');
    }

    const {
      isTurnComplete: isPlayerTurnComplete,
      pointsToAdd,
    } = this._players[this.currentPlayerIndex].play(cell);

    if (pointsToAdd) {
      this.updateOtherPlayerScores(cell, pointsToAdd);
    }

    if (isPlayerTurnComplete) {
      this.setNextPlayerToPlay();
    }

    return isPlayerTurnComplete;
  }

  updateOtherPlayerScores (cell: Cell, pointsToAdd: number): void {
    this._players.forEach((player: CricketPlayer, index: number) => {
      if (index === this.currentPlayerIndex) {
        return;
      }

      player.addPointsForCell(cell, pointsToAdd);
    });
  }

  clone (): GameCricket {
    const clone = new GameCricket(this.id, []);

    clone.players = this.players.map((player: CricketPlayer) => player.clone());
    clone.currentPlayerIndex = this.currentPlayerIndex;

    return clone;
  }

  static createFromStoredValue (storedValue: any): GameCricket {

    const game = new GameCricket(storedValue._id, []);

    const players = (storedValue._players || []).map((storedPlayer: any) => CricketPlayer.createFromStoredValue(storedPlayer));
    game.players = players;

    game.currentPlayerIndex = storedValue._currentPlayerIndex;

    return game;
  }
}

export { GameCricket, CRICKET_CELL_KEYS, CRICKET_SCORE_CELL_KEYS };
