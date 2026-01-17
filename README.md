# Universal Clipboard Sync

A cross-platform, peer-to-peer clipboard synchronization system that works across devices and networks without storing clipboard data on any server.

## Architecture Overview
- Each device runs a local clipboard agent
- Clipboard data is synced directly between devices using WebRTC
- A signaling server is used only for connection setup
- No clipboard or file data is stored or routed through the server

## Supported Platforms
- Desktop (Windows / Linux)
- Android

## Tech Stack
- WebRTC (peer-to-peer data transfer)
- WebSocket (signaling only)
- JavaScript / Electron (desktop)
- React Native (Android)

## Security
- End-to-end encrypted peer-to-peer connections
- Manual device pairing
- Local-only clipboard history storage
