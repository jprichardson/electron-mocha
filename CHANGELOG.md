0.4.0 / 2015-10-16
------------------
- added `--compilers` flag. See: https://github.com/jprichardson/electron-mocha/pull/16

0.3.1 / 2015-08-27
------------------
- bugfix: incorrect stdin/stdout values (fail on Node v0.10): https://github.com/jprichardson/electron-mocha/pull/8

0.3.0 / 2015-07-30
------------------
- display an error about not being able locate `electron`
- change `process.stdout` hijacking https://github.com/jprichardson/electron-mocha/pull/6
- removed `node_modules` https://github.com/jprichardson/electron-mocha/pull/7

0.2.1 / 2015-07-22
------------------
- bugfix on finding `index.html` for `--renderer` tests

0.2.0 / 2015-07-15
------------------
- upgraded to `electron-window@0.5.0` (Electron removed `global` for non-node integration)

0.1.1 / 2015-07-10
-------------------
- forgot `fs` in `args.js`
- JavaScript Standard Style

0.1.0 / 2015-07-10
------------------
- initial release
