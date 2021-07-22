const { ipcRenderer, contextBridge } = require('electron');

// Update context bridge with any other API functions you need for renderer/main process communication
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

contextBridge.exposeInMainWorld('api', {
  extract: async (fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries) =>
    ipcRenderer.invoke('run-extraction', fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries),
  getFile: async () => ipcRenderer.invoke('get-file'),
  getOutputPath: async () => ipcRenderer.invoke('get-output-path'),
  saveOutput: async (savePath, outputBundles, loggedMessages, saveLogs) =>
    ipcRenderer.invoke('save-output', savePath, outputBundles, loggedMessages, saveLogs),
  saveConfigAs: async (configJSON) => ipcRenderer.invoke('save-config-as', configJSON),
});
