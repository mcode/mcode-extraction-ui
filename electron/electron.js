const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const squirrel = require('electron-squirrel-startup');
const fs = require('fs');
const path = require('path');
const { logger } = require('mcode-extraction-framework');
const configSchema = require('./helpers/configSchema.json');
const runExtraction = require('./extraction');
const Transport = require('./InMemoryTransport');

const loggedMessages = [];
logger.add(new Transport({ loggedMessages, logger }));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (squirrel) {
  app.quit();
}

// Helper function
function downloadBounceOnMac(savePath) {
  if (process.platform === 'darwin') {
    app.dock.downloadFinished(path.join(savePath));
  }
}

// declare mainWindow ahead of time so that it can be accessed in .handle('get-file')
let mainWindow;
// Path to Icon file
const iconPath = path.join(__dirname, 'static/icon.png');
// Set the icon in the Mac OS Dock
if (process.platform === 'darwin') app.dock.setIcon(iconPath);
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // Sets the icon in the Windows/Linux app bar
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    },
  });
  mainWindow.maximize();
  mainWindow.show();

  // load build assets if production, localhost URL otherwise
  const mainUrl = app.isPackaged
    ? `file://${path.join(__dirname, '../react-app/build/index.html')}`
    : 'http://localhost:3000';
  mainWindow.loadURL(mainUrl);

  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('get-config-schema', async () => configSchema);

ipcMain.handle('get-file', async (event, extensions) =>
  dialog.showOpenDialog(mainWindow, {
    filters: [{ name: 'extensions', extensions }],
    properties: ['openFile'],
  }),
);

ipcMain.handle('get-output-path', async () => {
  const options = {
    buttonLabel: 'Save to Folder',
    title: 'Select Output Folder',
    defaultPath: app.getPath('downloads'),
    properties: ['openDirectory', 'createDirectory'],
  };
  return dialog.showOpenDialog(null, options, (savePath) => savePath);
});

ipcMain.handle('read-file', async (event, filePath) => fs.readFileSync(filePath, 'utf8'));

ipcMain.handle('run-extraction', async (event, fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries) => {
  loggedMessages.length = 0;
  const extractedData = await runExtraction(fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries);
  return { extractedData, loggedMessages };
});

ipcMain.handle('save-config-as', async (event, configJSON) => {
  const options = {
    defaultPath: app.getPath('downloads'),
    filters: [{ name: 'JSON', extensions: ['json'] }],
    properties: ['createDirectory'],
  };
  return dialog
    .showSaveDialog(null, options)
    .then((savePath) => {
      if (!savePath.canceled) {
        return savePath.filePath;
      }
      // returning null indicates that the save process was cancelled
      return null;
    })
    .then((savePath) => {
      if (savePath !== null) {
        fs.writeFileSync(savePath, JSON.stringify(configJSON), 'utf8');
      }
      // returning a path indicates that the save process succeeded
      downloadBounceOnMac(savePath);
      return savePath;
    });
});

ipcMain.handle('save-output', async (event, savePath, outputBundles, saveLogs) => {
  if (saveLogs) {
    const logPath = path.join(savePath, 'logged-messages.log');
    let messages = '';
    loggedMessages.forEach((log) => {
      messages = messages.concat(`${log.timestamp} [${log.level}]:${log.message}\n`);
    });
    fs.writeFileSync(logPath, messages, 'utf8');
  }
  outputBundles.forEach((data) => {
    const outputFile = path.join(savePath, `mcode-extraction-patient-${data.index + 1}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(data.bundle, null, 2), 'utf8');
    downloadBounceOnMac(outputFile);
  });
  // returning true indicates that the save process succeeded
  return true;
});
