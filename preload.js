const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('synthAPI', {
  dir: () => ipcRenderer.invoke('getDir'),
  files: () => ipcRenderer.invoke('getFiles'),
  presets: (fileName) => ipcRenderer.invoke('getPresets', fileName)
})