import { app, protocol, BrowserWindow, ipcMain, shell } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { ChildProcess, spawn, exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const isDevelopment = process.env.NODE_ENV !== 'production';

spawn('python3', [path.join(__static, '..', 'keylogger', 'requirements.py')]);

// eslint-disable-next-line no-underscore-dangle
declare const __static: string;

// let controller: ChildProcess;

// const controller = exec(`python3 ${__dirname}/assets/keylogger.py`, (error) => {
/*
const keyloggerEnabled = true;
if (keyloggerEnabled) {
  controller = exec(`cd ${path.join(app.getAppPath(), '..', 'src')}
    && pwd && sudo python3 keylogger.py >> log.log`);
  if (controller.stdout !== null) controller.stdout.on('data', (msg) => console.log(msg));
  controller.on('close', () => console.log('python ended'));
}
*/
// let keyloggerPid = 0;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1080, //  width: 750,
    height: 720, // height: 910,
    frame: false,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
      // preload: path.resolve(__static, 'preload.js'),
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL as string}#/`);
    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html#/');
  }

  ipcMain.on('window', (e, d) => {
    switch (d) {
      case 'min':
        win.minimize();
        break;
      case 'max':
        win.maximize();
        break;
      case 'close':
        win.close();
        break;
      default:
        break;
    }
  });
  ipcMain.on('openWindow', (e, d) => {
    console.log('window');
    const winCaptcha = new BrowserWindow({
      width: 600, //  width: 750,
      height: 910, // height: 910,
      frame: false,
      transparent: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: false,
        preload: path.resolve(__static, 'preload.js'),
      },
    });
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      winCaptcha.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL as string}#/captcha?ts=${Date.now()}`);
      // if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
      createProtocol('app');
      // Load the index.html when not in development
      winCaptcha.loadURL(`app://./index.html#/captcha?ts=${Date.now()}`);
    }
    // const params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    // width=600,height=910,left=0,top=0';
    // window.open(`/captcha?ts=${Date.now()}`, 'test', params);
  });
  ipcMain.on('startkeylogger', (e, d) => {
    const controller = spawn('python3', [path.join(__static, '..', 'keylogger', 'keylogger.py')]);
    controller.stdout.on('data', (msg) => {
      console.log(msg.toString());
      win.webContents.send('keylogger', { data: parseInt(msg, 10), ts: Date.now() });
    });
    controller.on('close', (er) => {
      console.log('python ended', er)
      win.webContents.send('keyloggerEnded', Date.now());
    });
  });
  ipcMain.on('stopkeylogger', (e, d) => {
    // if (controller) controller.kill();
    exec('sudo pkill -f keylogger.py');
    // console.log(controller);
  });
  ipcMain.on('openMeeting', (e, d) => {
    shell.openExternal('https://www.hfg.design/')
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // controller.kill();
  // controller.kill();
  app.quit();
  /*
  if (process.platform !== 'darwin') {
    app.quit();
  }
  */
});

console.log(__static);

app.on('before-quit', () => {
  // controller.kill();
  // controller.kill();
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
