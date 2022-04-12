class Player {
  private _id: number = 0;
  private _name: string = '';

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
}

export { Player };
