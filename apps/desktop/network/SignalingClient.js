// apps/desktop/network/SignalingClient.js

export class SignalingClient {
  constructor(serverUrl, deviceId, onSignal) {
    this.serverUrl = serverUrl;
    this.deviceId = deviceId;
    this.onSignal = onSignal;
    this.ws = null;
  }

  connect() {
    this.ws = new WebSocket(this.serverUrl);

    this.ws.onopen = () => {
      console.log("🟢 Connected to signaling server");

      this.ws.send(JSON.stringify({
        type: "REGISTER",
        deviceId: this.deviceId
      }));
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.onSignal(message);
    };
  }

  sendSignal(targetDeviceId, data) {
    this.ws.send(JSON.stringify({
      type: "SIGNAL",
      targetDeviceId,
      data
    }));
  }
}
