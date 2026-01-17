// apps/desktop/network/PeerConnection.js

export class PeerConnection {
  constructor(onMessage) {
    this.pc = new RTCPeerConnection();
    this.channel = null;
    this.onMessage = onMessage;

    this.pc.ondatachannel = (event) => {
      this.channel = event.channel;
      this.setupChannel();
    };
  }

  createDataChannel() {
    this.channel = this.pc.createDataChannel("data");
    this.setupChannel();
  }

  setupChannel() {
    this.channel.onopen = () => {
      console.log("🟢 Data channel open");
    };

    this.channel.onmessage = (event) => {
      this.onMessage(event.data);
    };
  }

  async createOffer() {
    this.createDataChannel();
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
    return offer;
  }

  async handleOffer(offer) {
    await this.pc.setRemoteDescription(offer);
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);
    return answer;
  }

  async handleAnswer(answer) {
    await this.pc.setRemoteDescription(answer);
  }

  addIceCandidate(candidate) {
    if (candidate) {
      this.pc.addIceCandidate(candidate);
    }
  }
}
