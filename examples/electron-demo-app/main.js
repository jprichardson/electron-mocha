'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main_window;
// Quit when all windows are closed
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  main_window = new BrowserWindow({width: 800, height: 600});

  main_window.loadURL('file://' + __dirname + '/www/welcome.html');
  main_window.show();

  //main_window.maximize();

  main_window.openDevTools();

  // Emitted when the window is closed.
  main_window.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    main_window = null;
  });
});
