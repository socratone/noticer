import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile('./dist/index.html');

  // win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});
