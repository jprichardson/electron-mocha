var Mocha = require('mocha')
var path = require('path')
require('coffee-script/register')

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
  var extensions = ['js', 'coffee']
  if (!args.files.length) args.files.push('test')
  args.files.forEach(function (arg) {
    files = files.concat(utils.lookupFiles(arg, extensions, args.recursive))
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
