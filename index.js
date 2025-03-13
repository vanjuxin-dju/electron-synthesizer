const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const filesStub = {
  "FluidSynth.sf2": [ "Piano", "Electric Piano", "Nylon Guitar", "Violin", "Double Bass" ], 
  "FluidSynth_v2.sf2": [ "Piano", "Electric Piano", "Rhodes", "Nylon Guitar", "Violin", "Double Bass" ], 
  "Bandura.sf2": [ "Bandura" ], 
  "reptile.sf2": [ "Reptile" ], 
  "cool strings.sf2": [ "Strings 1", "Strings 2", "Strings 3" ]
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 320,
    height: 240,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('public/index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('getDir', async () => {
    return path.join(process.env.HOME, "samplers");
  });
  ipcMain.handle('getFiles', async () => {
    return Object.keys(filesStub);
  });
  ipcMain.handle('getPresets', async (e, fileName) => {
    return filesStub[fileName];
  });
  createWindow()
})