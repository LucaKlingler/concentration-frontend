import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

let controller;
const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1080, //  width: 750,
    height: 720, // height: 910,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.resolve(__static, 'preload.js'),
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  /*setInterval(async () => {
    // TODO: implement new keylogger
    const concentrationString = await fs.readFileSync(path.join(app.getAppPath(), '..', 'keylogger', 'tmp.log'), 'utf-8');
    console.log('old data:', concentrationString);
    win.webContents.send('keylogger', {'data': concentrationString, ts: Date.now()});
  }, 1000);*/

  setTimeout(() => {
    // const controller = exec(`python3 ${__dirname}/assets/keylogger.py`, (error) => {
    controller = exec(`${path.join(app.getAppPath(), '..', 'src', 'runMessurement.sh')}`, (error) => {
      console.log('python script startet');
      win.webContents.send('keylogger', {'data': 'started keylogger', ts: Date.now()});
      if (error) {
        // eslint-disable-next-line no-console
        console.error(`error: ${error}`);
        win.webContents.send('keylogger', {'data': 'error keylogger', ts: Date.now()});
      }
    });
  
    if (controller.stdout !== null) controller.stdout.on('data', (msg) => {
      // eslint-disable-next-line no-console
      win.webContents.send('keylogger', {'data': msg, ts: Date.now()});
      console.log(msg);
    });

    controller.on('close', () => {
      // eslint-disable-next-line no-console
      console.log('python ended');
    });
  }, 3000);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  controller.kill();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}