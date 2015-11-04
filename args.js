var fs = require('fs')
var path = require('path')
var program = require('commander')

function parse (argv) {
  var globals = []

  program._name = 'electron-mocha'
  program
    .version(require('./package').version)
    .usage('[options] [files]')
    .option('-R, --reporter <name>', 'specify the reporter to use', 'spec')
    .option('-S, --sort', 'sort test files')
    .option('-b, --bail', 'bail after first test failure')
    .option('-g, --grep <pattern>', 'only run tests matching <pattern>')
    .option('-f, --fgrep <string>', 'only run tests containing <string>')
    .option('-i, --invert', 'inverts --grep and --fgrep matches')
    .option('-r, --require <name>', 'require the given module')
    .option('-s, --slow <ms>', '"slow" test threshold in milliseconds [75]')
    .option('-t, --timeout <ms>', 'set test-case timeout in milliseconds [2000]')
    .option('-u, --ui <name>', 'specify user-interface (bdd|tdd|exports)', 'bdd')
    .option('--check-leaks', 'check for global variable leaks')
    .option('--compilers <ext>:<module>,...', 'use the given module(s) to compile files', list, [])
    .option('--globals <names>', 'allow the given comma-delimited global [names]', list, [])
    .option('--inline-diffs', 'display actual/expected differences inline within each string')
    .option('--interfaces', 'display available interfaces')
    .option('--no-timeouts', 'disables timeouts')
    .option('--opts <path>', 'specify opts path', 'test/mocha.opts')
    .option('--recursive', 'include sub directories')
    .option('--renderer', 'run tests in renderer process')

  program.on('globals', function (val) {
    globals = globals.concat(list(val))
  })

  module.paths.push(process.cwd(), path.join(process.cwd(), 'node_modules'))
  program.on('require', function (mod) {
    var abs = fs.existsSync(mod) || fs.existsSync(mod + '.js')
    if (abs) mod = path.resolve(mod)
    require(mod)
  })

  program.parse(process.argv)
  var argData = JSON.parse(JSON.stringify(program))
  argData.files = argData.args

  // delete unused
  ;['commands', 'options', '_execs', '_args', '_name', '_events',
    '_usage', '_version', '_eventsCount', 'args'].forEach(function (key) {
    delete argData[key]
  })

  return argData
}

function list (str) {
  return str.split(/ *, */)
}

module.exports = {
  parse: parse
}
