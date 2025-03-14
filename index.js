const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require("node:fs/promises")
const { SoundFont2 } = require('soundfont2')

const filesStub = {
  "FluidSynth.sf2": [ "Piano", "Electric Piano", "Nylon Guitar", "Violin", "Double Bass" ], 
  "FluidSynth_v2.sf2": [ "Piano", "Electric Piano", "Rhodes", "Nylon Guitar", "Violin", "Double Bass" ], 
  "Bandura.sf2": [ "Bandura" ], 
  "reptile.sf2": [ "Reptile" ], 
  "cool strings.sf2": [ "Strings 1", "Strings 2", "Strings 3" ]
}

const SAMPLERS_PATH = path.join(process.env.HOME, "samplers");

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
  ipcMain.handle('getDir', async (fileName) => {
    if (!fileName) {
      return SAMPLERS_PATH;
    }
    return path.join(SAMPLERS_PATH, fileName);
  });
  ipcMain.handle('getFiles', async () => {
    return await fs.readdir(SAMPLERS_PATH);
  });
  ipcMain.handle('getPresets', async (e, fileName) => {
    const file = await fs.readFile(path.join(SAMPLERS_PATH, fileName))
    const soundFont = new SoundFont2(file);
    return soundFont.instruments.map((instrument) => `${instrument.header.bagIndex} ${instrument.header.name}`);
  });
  createWindow()
})