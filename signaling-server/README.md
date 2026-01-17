# Signaling Server

This server is used only for device discovery and WebRTC signaling.

## Responsibilities
- Accept WebSocket connections from devices
- Register device IDs
- Forward WebRTC signaling messages (offer, answer, ICE)

## Important Notes
- ❌ No clipboard data is stored
- ❌ No clipboard data is routed
- ✅ Clipboard and file data flows directly between devices via WebRTC
