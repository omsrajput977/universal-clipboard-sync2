export class HistoryManager {
  constructor() {
    this.items = [];
  }

  add(item) {
    if (!this.items) {
      this.items = [];
    }
    this.items.push(item);
  }

  getAll() {
    if (!this.items) {
      this.items = [];
    }
    return this.items;
  }

  getLast() {
    if (!this.items || this.items.length === 0) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
}
