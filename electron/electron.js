const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const squirrel = require('electron-squirrel-startup');
const fs = require('fs');
const path = require('path');
const { logger } = require('mcode-extraction-framework');
const runExtraction = require('./extraction');
const Transport = require('./InMemoryTransport');

const loggedMessages = [];
logger.add(new Transport({ loggedMessages, logger }));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (squirrel) {
  app.quit();
}

// declare mainWindow ahead of time so that it can be accessed in .handle('get-file')
let mainWindow;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    },
  });

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

ipcMain.handle('run-extraction', async (event, fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries) => {
  loggedMessages.length = 0;
  const extractedData = await runExtraction(fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries);
  return { extractedData, loggedMessages };
});
ipcMain.handle('get-file', async () =>
  dialog.showOpenDialog(mainWindow, {
    filters: [{ name: 'JSON', extensions: ['json'] }],
    properties: ['openFile'],
  }),
);

ipcMain.handle('read-file', async (event, filePath) => fs.readFileSync(filePath, 'utf8'));

ipcMain.handle('get-output-path', async () => {
  const options = {
    buttonLabel: 'Save',
    title: 'Select Output Folder',
    defaultPath: app.getPath('downloads'),
    properties: ['openDirectory', 'createDirectory'],
  };
  return dialog.showOpenDialog(null, options, (savePath) => savePath);
});

ipcMain.handle('save-output', async (event, savePath, extractedData) => {
  try {
    extractedData.forEach((bundle, i) => {
      const outputFile = path.join(savePath, `mcode-extraction-patient-${i + 1}.json`);
      fs.writeFileSync(outputFile, JSON.stringify(bundle), 'utf8');
    });
    // returning true indicates that the save process succeeded
    return true;
  } catch (error) {
    // return the error message
    return error.message;
  }
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
      return null;
    })
    .then((savePath) => {
      if (savePath !== null) {
        fs.writeFileSync(savePath, JSON.stringify(configJSON), 'utf8');
      }
      // returning a path indicates that the save process succeeded
      // returning null indicates that the save process was cancelled
      return savePath;
    });
});
