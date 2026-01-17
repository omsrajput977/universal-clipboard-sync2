import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // TEMP: pass device id via URL hash
  win.loadFile("index.html", {
    hash: process.env.DEVICE_ID || "deviceA"
  });
}

app.whenReady().then(createWindow);
