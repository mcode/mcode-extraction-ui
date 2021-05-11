const { ipcRenderer, contextBridge } = require('electron');

// Update context bridge with any other API functions you need for renderer/main process communication
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
