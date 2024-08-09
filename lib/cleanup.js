const fs = require('node:fs')
// Wait some amount of time to try to ensure Electron has fully quit.
setTimeout(removeTmpdir, 1000)

function removeTmpdir () {
  const tmpdir = process.argv[2]
  fs.rm(tmpdir, { recursive: true, maxRetries: 3 })
  // Electron builds with disabled ELECTRON_RUN_AS_NODE needs to explicitly exit.
  process.exit(0)
}
