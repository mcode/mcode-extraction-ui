const { ipcRenderer, contextBridge } = require('electron');

// Update context bridge with any other API functions you need for renderer/main process communication
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

contextBridge.exposeInMainWorld('api', {
  extract: async (fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries) => {
    //  call function in preload.js
    const results = await ipcRenderer.invoke(
      'run-extraction',
      fromDate,
      toDate,
      configFilepath,
      runLogFilepath,
      debug,
      allEntries,
    );
    return results;
  },
  getFile: async () => ipcRenderer.invoke('get-file'),
});
