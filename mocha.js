var Mocha = require('mocha')
var path = require('path')

function createFromArgs (args) {
  var utils = Mocha.utils
  var mocha = new Mocha()

  // infinite stack traces (this was pulled from Mocha source, may not be necessary)
  Error.stackTraceLimit = Infinity

  mocha.reporter(args.reporter)
  mocha.ui(args.ui)

  if (args.inlineDiffs) mocha.useInlineDiffs(true)
  if (args.slow) mocha.suite.slow(args.slow)
  if (!args.timeouts) mocha.enableTimeouts(false)
  if (args.timeout) mocha.suite.timeout(args.timeout)
  // mocha.suite.bail(args.bail)
  if (args.grep) mocha.grep(new RegExp(args.grep))
  if (args.fgrep) mocha.grep(args.fgrep)
  if (args.invert) mocha.invert()
  if (args.checkLeaks) mocha.checkLeaks()
  mocha.globals(args.globals)

  mocha.useColors(true)

  // default files to test/*.js
  var files = []
  var extensions = ['js']
  if (!args.files.length) args.files.push('test')
  args.files.forEach(function (arg) {
    files = files.concat(utils.lookupFiles(arg, extensions, args.recursive))
  })

  args.compilers.forEach(function (c) {
    var compiler = c.split(':')
    var ext = compiler[0]
    var mod = compiler[1]

    if (mod[0] === '.') mod = path.join(process.cwd(), mod)
    require(mod)
    extensions.push(ext)
  })

  if (args.watch) {
    args.watchExtensions = args.watchExtensions ?
      args.watchExtensions.split(',') : []
    args.watchExtensions = args.watchExtensions.concat(extensions)
  }

  files = files.map(function (f) {
    return path.resolve(f)
  })

  if (args.sort) {
    files.sort()
  }

  mocha.files = files

  return mocha
}

function watch (mocha, args, callback) {
  var utils = Mocha.utils
  var runner
  process.on('SIGINT', function(){
    callback(0)
  })

  var watchFiles = utils.files(process.cwd(), [ 'js' ].concat(args.watchExtensions))
  var runAgain = false

  function loadAndRun () {
    try {
      runAgain = false
      runner = mocha.run(function () {
        runner = null
        if (runAgain) {
          rerun()
        }
      })
    } catch(e) {
      console.log(e.stack)
    }
  }

  function purge () {
    watchFiles.forEach(function (file) {
      delete require.cache[file]
    })
  }

  loadAndRun()

  function rerun () {
    purge()
    if (!args.grep) mocha.grep(null)
    mocha.suite = mocha.suite.clone()
    mocha.suite.ctx = new Mocha.Context
    mocha.ui(args.ui)
    loadAndRun()
  }

  utils.watch(watchFiles, function () {
    runAgain = true
    if (runner) {
      runner.abort()
    } else {
      rerun()
    }
  })
}

function run (args, callback) {
  var mocha = createFromArgs(args, callback)
  if (args.watch) {
    watch(mocha, args, callback)
  } else {
    /* var runner = */ mocha.run(callback)
    // process.on('SIGINT', function () { runner.abort() })
  }
}

module.exports = {
  createFromArgs: createFromArgs,
  run: run
}
