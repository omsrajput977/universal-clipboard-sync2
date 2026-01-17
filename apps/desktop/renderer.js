// apps/desktop/main.js
console.log("RTCPeerConnection:", window.RTCPeerConnection);

import { ClipboardEngine } from "./core/ClipboardEngine.js";
import { SignalingClient } from "./network/SignalingClient.js";
import { WebRTCManager } from "./network/WebRTCManager.js";
import { ClipboardItem } from "../../shared/clipboardModels.js";
import { ClipboardAdapter } from "./os-adapter/ClipboardAdapter.js";


const DEVICE_ID = window.location.hash.replace("#", "");
const clipboardAdapter = new ClipboardAdapter();


if (!DEVICE_ID) {
  console.error("❌ No DEVICE_ID provided");
}


const SIGNALING_URL = "ws://localhost:8080";

// 1️⃣ Create signaling client
const signalingClient = new SignalingClient(
  SIGNALING_URL,
  DEVICE_ID,
  (message) => rtcManager.handleSignal(message)
);

signalingClient.connect();

// 2️⃣ Create Clipboard Engine (brain)
let rtcManager;

const clipboardEngine = new ClipboardEngine(
  DEVICE_ID,
  (targetDeviceId, item) => {
    rtcManager.sendClipboard(targetDeviceId, item);
  }
);

// 3️⃣ Create WebRTC Manager
rtcManager = new WebRTCManager(
  signalingClient,
  DEVICE_ID,
  (data) => {
    if (data.type === "CLIPBOARD_UPDATE") {
      clipboardEngine.onRemoteClipboardUpdate(data.payload);
      clipboardEngine.applyToSystemClipboard(
        clipboardAdapter,
        data.payload
      );
      console.log("📋 Clipboard updated from peer:", data.payload.content);
    }
  }
);

// 4️⃣ Fake device presence
setTimeout(() => {
  const remoteId = DEVICE_ID === "deviceA" ? "deviceB" : "deviceA";
  clipboardEngine.setDeviceOnline(remoteId);
  rtcManager.startConnection(remoteId);
}, 2000);

// 5️⃣ Fake clipboard update after 5s
// setTimeout(() => {
//   const item = new ClipboardItem({
//     id: Date.now().toString(),
//     type: "text",
//     content: `Hello from ${DEVICE_ID}`,
//     sourceDeviceId: DEVICE_ID,
//     timestamp: Date.now()
//   });

//   clipboardEngine.onLocalClipboardUpdate(item);
// }, 5000);

let lastClipboardText = "";

setInterval(() => {
  const currentText = clipboardAdapter.readText();

  if (currentText && currentText !== lastClipboardText) {
    lastClipboardText = currentText;

    const item = new ClipboardItem({
      id: Date.now().toString(),
      type: "text",
      content: currentText,
      sourceDeviceId: DEVICE_ID,
      timestamp: Date.now()
    });

    console.log("✂️ Local clipboard changed:", currentText);
    clipboardEngine.onLocalClipboardUpdate(item);
  }
}, 500);
