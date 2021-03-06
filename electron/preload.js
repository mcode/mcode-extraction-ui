const { ipcRenderer, contextBridge } = require('electron');

// Update context bridge with any other API functions you need for renderer/main process communication
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

contextBridge.exposeInMainWorld('api', {
  extract: async (fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries) =>
    ipcRenderer.invoke('run-extraction', fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries),
  getConfigSchema: async () => ipcRenderer.invoke('get-config-schema'),
  getFile: async (extensions = []) => ipcRenderer.invoke('get-file', extensions),
  getOutputPath: async () => ipcRenderer.invoke('get-output-path'),
  readFile: async (filePath) => ipcRenderer.invoke('read-file', filePath),
  saveOutput: async (savePath, outputBundles, saveLogs) =>
    ipcRenderer.invoke('save-output', savePath, outputBundles, saveLogs),
  saveConfigAs: async (configJSON) => ipcRenderer.invoke('save-config-as', configJSON),
});
