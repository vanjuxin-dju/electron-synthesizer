const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('synthAPI', {
  dir: (fileName) => ipcRenderer.invoke('getDir', fileName),
  files: () => ipcRenderer.invoke('getFiles'),
  presets: (fileName) => ipcRenderer.invoke('getPresets', fileName)
})