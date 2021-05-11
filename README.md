# electron-cra-template

A GitHub template for using [Electron](https://www.electronjs.org/) with [Create React App](https://create-react-app.dev/) (CRA). This template uses a monorepo-esque approach, with one `package.json` for the electron app at the root, and another for the CRA code in the `react-app` directory.

## Getting Started

1. Install dependencies:

```
npm install
```
2. Install React dependencies:
```
cd react-app
npm install
```
3. Start Electron and React app, from the root:
```
npm start
```
This command will concurrently start the React app and Electron app

## Preload Script

`./electron/preload.js` exposes the `ipcRenderer` API to the React app via [Electron's contextBridge API](https://www.electronjs.org/docs/api/context-bridge). This allows any React component to securely use `ipcRenderer` by calling `window.ipcRenderer`

To include a more verbose API between the React app and the main process, modify `./electron/preload.js` to expose more information to the `window` object. E.g.

``` JavaScript
// ./electron/preload.js
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  myApiFunction: () => {
    ipcRenderer.send('do-my-api-function');
  });
});

// ./react-app/some/react/component.js
window.api.myApiFunction();
```

## Building for Production

This template comes pre-loaded with a script `npm run build` that will package both the React app into static assets, and the Electron app into a platform-distributable binary
