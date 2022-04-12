class Cell {
  private _key: string = '';
  private _name: string = '';
  private _points: number = 0;

  constructor (key: string, name: string, points: number) {
    this._key = key;
    this._name = name;
    this._points = points;
  }

  get points (): number {
    return this._points;
  }

  set points (points: number) {
    this._points = points;
  }

  get name (): string {
    return this._name;
  }

  set name (name: string) {
    this._name = name;
  }

  get key (): string {
    return this._key;
  }

  get simpleCellPoints (): number {
    if (this.isDouble) {
      return this._points / 2;
    }

    if (this.isTriple) {
      return this._points / 3;
    }

    return this._points;
  }

  get isDouble (): boolean {
    return this._key.includes('d-');
  }

  get isTriple (): boolean {
    return this._key.includes('t-');
  }

  static createFromKey (key: string): Cell {
    let points;
    let name;
    if (key === 'miss') {
      points = 0;
      name = '-';
    } else if (key === 'bull') {
      points = 25;
      name = 'Bull';
    } else if (key === 'd-bull') {
      points = 50;
      name = 'D-Bull';
    } else {
      points = parseInt(key.replace('d-', '').replace('t-', ''), 10);
      if (key.startsWith('d-')) {
        points *= 2;
      } else if (key.startsWith('t-')) {
        points *= 3;
      }
      name = key.replace('d-', 'D').replace('t-', 'T');
    }

    return new Cell(key, name, points);
  }
}

export { Cell };
