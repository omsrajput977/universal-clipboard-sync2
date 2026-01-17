// apps/desktop/network/WebRTCManager.js

import { PeerConnection } from "./PeerConnection.js";

export class WebRTCManager {
    constructor(signalingClient, deviceId, onClipboardMessage) {
        this.deviceId = deviceId;
        this.signalingClient = signalingClient;

        this.peer = new PeerConnection((msg) => {
            const data = JSON.parse(msg);
            onClipboardMessage(data);
        });

        this.peer.pc.onicecandidate = (event) => {
            if (event.candidate) {
                this.signalingClient.sendSignal(
                    this.remoteDeviceId,
                    { candidate: event.candidate }
                );
            }
        };
    }

    async startConnection(remoteDeviceId) {
        this.remoteDeviceId = remoteDeviceId;

        const offer = await this.peer.createOffer();
        this.signalingClient.sendSignal(remoteDeviceId, { offer });
    }

    async handleSignal(message) {
        const data = message.data;

        if (data.offer) {
            this.remoteDeviceId = message.from;
            const answer = await this.peer.handleOffer(data.offer);
            this.signalingClient.sendSignal(message.from, { answer });
        }

        if (data.answer) {
            await this.peer.handleAnswer(data.answer);
        }

        if (data.candidate) {
            this.peer.addIceCandidate(data.candidate);
        }
    }

    sendPing() {
        this.peer.channel.send(
            JSON.stringify({ type: "PING", message: "hello from peer" })
        );
    }

    sendClipboard(remoteDeviceId, clipboardItem) {
        this.peer.channel.send(
            JSON.stringify({
                type: "CLIPBOARD_UPDATE",
                payload: clipboardItem
            })
        );
    }

}
