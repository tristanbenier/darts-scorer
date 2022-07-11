const STORAGE_KEY = 'darts';

class Storage {
  private storageKey: string;
  private storedValue: { [key: string]: any };

  constructor (storageKey: string) {
    this.storageKey = storageKey;
    this.getStoredValue();
  }

  set (key: string, value: any) {
    const newValue = { ...this.storedValue };
    newValue[key] = value;

    return this.setStoredValue(newValue);
  }

  get (key: string): any {
    return this.storedValue[key];
  }

  remove (key: string) {
    const newValue = { ...this.storedValue };
    delete newValue[key];

    return this.setStoredValue(newValue);
  }

  getStoredValue () {
    const storedValue = localStorage.getItem(this.storageKey);
    if (!storedValue) {
      return this.setStoredValue({});
    }

    this.storedValue = JSON.parse(storedValue);

    return this.storedValue;
  }

  setStoredValue (value: any) {
    this.storedValue = value;
    localStorage.setItem(this.storageKey, JSON.stringify(value));

    return this.storedValue;
  }
}

export default defineNuxtPlugin(() => {
  const storage = new Storage(STORAGE_KEY);

  return {
    provide: {
      storage,
    },
  };
});
