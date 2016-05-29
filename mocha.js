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

  // --no-colors
  mocha.useColors(args.colors)

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

  args.require.forEach(function (mod) {
    require(mod)
  })

  files = files.map(function (f) {
    return path.resolve(f)
  })

  if (args.sort) {
    files.sort()
  }

  mocha.files = files

  return mocha
}

function run (args, callback) {
  var mocha = createFromArgs(args)
  /* var runner = */ mocha.run(callback)
  // process.on('SIGINT', function () { runner.abort() })
}

module.exports = {
  createFromArgs: createFromArgs,
  run: run
}
