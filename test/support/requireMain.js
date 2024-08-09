const { ipcMain } = require('electron')

global.requiredMain = true
global.requiredMainBeforeReady = !require('electron').app.isReady()

ipcMain.handle('get-global', async (event, name) =>
  global[name]
)
