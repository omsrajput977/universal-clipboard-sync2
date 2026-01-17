// apps/desktop/core/HistoryManager.js

export class HistoryManager {
  constructor() {
    this.history = [];
  }

  add(item) {
    this.history.push(item);
  }

  getAll() {
    return this.history;
  }

  clear() {
    this.history = [];
  }
}
