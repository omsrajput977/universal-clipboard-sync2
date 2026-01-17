// apps/desktop/core/ClipboardEngine.js

import { HistoryManager } from "./HistoryManager.js";
import { QueueManager } from "./QueueManager.js";
import { ConflictResolver } from "./ConflictResolver.js";

export class ClipboardEngine {
  constructor(deviceId, sendFunction) {
    this.deviceId = deviceId;
    this.sendFunction = sendFunction;
    this.historyManager = new HistoryManager();
    this.queueManager = new QueueManager();
    this.conflictResolver = new ConflictResolver();
    this.connectedDevices = {};
    this.latestItem = null;
  }

  setDeviceOnline(deviceId) {
    this.connectedDevices[deviceId] = true;
  }

  setDeviceOffline(deviceId) {
    this.connectedDevices[deviceId] = false;
  }

  onLocalClipboardUpdate(item) {
    const resolved = this.conflictResolver.resolve(
      this.latestItem,
      item
    );

    this.latestItem = resolved;
    this.historyManager.add(resolved);

    Object.keys(this.connectedDevices).forEach((deviceId) => {
      if (this.connectedDevices[deviceId]) {
        this.sendToDevice(deviceId, resolved);
      } else {
        this.queueManager.enqueue(deviceId, resolved);
      }
    });
  }

  onRemoteClipboardUpdate(item) {
    const resolved = this.conflictResolver.resolve(
      this.latestItem,
      item
    );

    this.latestItem = resolved;
    this.historyManager.add(resolved);
  }

  sendToDevice(deviceId, item) {
    // WebRTC will be plugged in later
    this.sendFunction(deviceId, item);
  }

  flushQueue(deviceId) {
    const items = this.queueManager.dequeue(deviceId);
    items.forEach((item) => {
      this.sendToDevice(deviceId, item);
    });
  }
}
