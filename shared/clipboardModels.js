// shared/clipboardModels.js

/**
 * Represents a single clipboard item
 * This format is OS-independent and universal
 */

export class ClipboardItem {
  constructor({
    id,
    type, // "text" | "image" | "file"
    content,
    sourceDeviceId,
    timestamp
  }) {
    this.id = id;
    this.type = type;
    this.content = content;
    this.sourceDeviceId = sourceDeviceId;
    this.timestamp = timestamp;
  }
}

/**
 * Represents a paired device
 */
export class Device {
  constructor({
    deviceId,
    deviceName,
    platform, // "windows" | "linux" | "android" | "mac" | "ios"
    online
  }) {
    this.deviceId = deviceId;
    this.deviceName = deviceName;
    this.platform = platform;
    this.online = online;
  }
}
