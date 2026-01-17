// shared/messageTypes.js

/**
 * Types of messages exchanged between devices
 */

export const MESSAGE_TYPES = {
  CLIPBOARD_UPDATE: "CLIPBOARD_UPDATE",
  FILE_METADATA: "FILE_METADATA",
  FILE_CHUNK: "FILE_CHUNK",
  FILE_END: "FILE_END",
  DEVICE_JOIN: "DEVICE_JOIN",
  DEVICE_LEAVE: "DEVICE_LEAVE",
  PING: "PING"
};
