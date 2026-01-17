// apps/desktop/core/QueueManager.js

export class QueueManager {
  constructor() {
    this.queue = {};
  }

  enqueue(deviceId, clipboardItem) {
    if (!this.queue[deviceId]) {
      this.queue[deviceId] = [];
    }
    this.queue[deviceId].push(clipboardItem);
  }

  dequeue(deviceId) {
    const items = this.queue[deviceId] || [];
    this.queue[deviceId] = [];
    return items;
  }
}
