import { HistoryManager } from "./HistoryManager.js";

export class ClipboardEngine {
  constructor(deviceId, sendFn) {
    this.deviceId = deviceId;
    this.sendFn = sendFn;

    this.historyManager = new HistoryManager(); // 🔴 MUST BE HERE
    this.onlineDevices = new Set();
  }

  setDeviceOnline(deviceId) {
    this.onlineDevices.add(deviceId);
  }

  onLocalClipboardUpdate(item) {
    const last = this.historyManager.getLast();
    if (last && last.content === item.content) return;

    this.historyManager.add(item);

    for (const deviceId of this.onlineDevices) {
      this.sendFn(deviceId, item);
    }
  }

  onRemoteClipboardUpdate(item) {
    const last = this.historyManager.getLast();
    if (last && last.content === item.content) return;

    this.historyManager.add(item);
  }

  applyToSystemClipboard(adapter, item) {
    if (item.type === "text") {
      adapter.writeText(item.content);
    }
  }
}
