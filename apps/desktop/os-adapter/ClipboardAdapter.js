// apps/desktop/os-adapter/ClipboardAdapter.js

const { clipboard } = window.require("electron");

export class ClipboardAdapter {
  readText() {
    return clipboard.readText();
  }

  writeText(text) {
    clipboard.writeText(text);
  }
}
