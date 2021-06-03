const { ipcRenderer, contextBridge } = require('electron');

// Update context bridge with any other API functions you need for renderer/main process communication
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);

contextBridge.exposeInMainWorld('api', {
    hello: () => {
        // do things!
        // a function here will be used to call the function in electron.js, which will call the extraction framework
        console.log('Hello from preload.js!');
        return true;
    },
    extract: (fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries) => {
        //  call function in preload.js
        ipcRenderer.invoke('run-extraction', fromDate, toDate, configFilepath, runLogFilepath, debug, allEntries).then((result) => {
            // do something with result
            console.log("extract invoke complete");
        })
    }
});