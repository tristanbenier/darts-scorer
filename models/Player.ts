import { Turn } from './Turn';

class Player {
  protected _id: number = 0;
  protected _name: string = '';
  protected _turns: Turn[] = [];

  constructor (name: string) {
    this._name = name;
  }

  get id (): number {
    return this._id;
  }

  set id (id: number) {
    this._id = id;
  }

  get name (): string {
    return this._name;
  }

  set name (name: string) {
    this._name = name;
  }

  set turns (turns: Turn[]) {
    this._turns = turns;
  }

  clone (): Player {
    throw new Error('Not implemented');
  }
}

export { Player };
