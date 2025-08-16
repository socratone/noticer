import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 360,
    height: 640,
  });

  win.loadFile('./dist/index.html');

  // win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});
