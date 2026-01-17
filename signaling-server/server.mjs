// signaling-server/server.js

import { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

const devices = new Map(); // deviceId -> ws

console.log(`🟢 Signaling server running on port ${PORT}`);

wss.on("connection", (ws) => {
  let deviceId = null;

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());

    // Device registers itself
    if (message.type === "REGISTER") {
      deviceId = message.deviceId;
      devices.set(deviceId, ws);
      console.log(`📱 Device connected: ${deviceId}`);
      return;
    }

    // Relay signaling messages (offer/answer/ice)
    if (message.type === "SIGNAL") {
      const targetWs = devices.get(message.targetDeviceId);
      if (targetWs) {
        targetWs.send(JSON.stringify({
          ...message,
          from: deviceId
        }));
      }
    }
  });

  ws.on("close", () => {
    if (deviceId) {
      devices.delete(deviceId);
      console.log(`🔴 Device disconnected: ${deviceId}`);
    }
  });
});
