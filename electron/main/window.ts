import { BrowserWindow, ipcMain } from 'electron'

export async function windowAction(mainWin: Electron.BrowserWindow) {
  ipcMain.on('win-min', () => {
    const win = BrowserWindow.getFocusedWindow()
    win.minimize()
  })

  ipcMain.on('win-recover', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win.isMaximized())
      win.unmaximize()
    else
      win.maximize()
  })

  ipcMain.on('win-close', () => {
    const win = BrowserWindow.getFocusedWindow()
    win.close()
  })

  mainWin.on('maximize', () => {
    mainWin.webContents.send('maximize-change', {
      isMax: true,
    })
  })

  mainWin.on('unmaximize', () => {
    mainWin.webContents.send('maximize-change', {
      isMax: false,
    })
  })
}
