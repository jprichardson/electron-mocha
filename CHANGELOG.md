<!-- Github links generated with: https://github.com/jprichardson/issue-links -->

2.3.1 / 2016-07-13
------------------
- Listen and ignore 'window-all-closed' instead of aborting 'will-quit'
- Use fs.mkdtemp to create temporary workspace

2.3.0 / 2016-07-06
------------------
- Add --debug and --debug-brk options. See: [#70][#70]

2.2.1 / 2016-06-22
------------------
- Close test window after --renderer tests have finished

2.2.0 / 2016-05-30
------------------
- Add --no-colors option

2.1.0 / 2016-05-17
------------------
- Don't stop early if tests open/close windows

2.0.0 / 2016-05-12
------------------
- Fixed incorrect exit code after Renderer failures See: [#60][#60]
- Removed Electron 0.x checks / compatibility

1.3.0 / 2016-05-11
------------------
- Electron 1.0 compatibility
- Update dependencies

1.2.3 / 2016-05-06
------------------
- Update dependencies

1.2.2 / 2016-04-20
------------------
- Load compiler before require options. See: [#57][#57]

1.2.1 / 2016-04-19
------------------
- window destroyed on exit. See: [#56][#56]

1.2.0 / 2016-04-12
------------------
- fallback to local `electron-prebuilt` if can't find `electron` in the `$PATH` [#55][#55]

1.1.0 / 2016-04-10
------------------
- Add --preload option. See: [#45][#45]

1.0.3 / 2016-04-07
------------------
- Update to latest mocha

1.0.2 / 2016-04-04
------------------
- Ensure backwards compatibility of previous version

1.0.1 / 2016-04-04
------------------
- Update BrowserWindow options syntax for Electron >= 0.37.4. Removes deprecation warnings.

1.0.0 / 2016-03-21
------------------
- console piping issue [#48][#48]

0.8.0 / 2016-01-14
------------------
- Fix remote output w/ line breaks. See [#40][#40]

0.7.0 / 2015-12-15
------------------
- update `electron-window` dep. (For electron >= `0.35`). Removes deprecation warnings. See: https://github.com/jprichardson/electron-mocha/pull/31
- clean up require statements (Electron modules). See: https://github.com/jprichardson/electron-mocha/pull/29
- `--require` support fixed in Renderer. See: https://github.com/jprichardson/electron-mocha/pull/33

0.6.3 / 2015-11-26
------------------
- fix for deprecation warnings in Electron `v0.35`. See: https://github.com/jprichardson/electron-mocha/pull/26

0.6.2 / 2015-11-21
------------------
- report error if in mocha: See: https://github.com/jprichardson/electron-mocha/pull/25

0.6.1 / 2015-11-05
------------------
- fix exit code on `bin/electron-mocha`: See: https://github.com/jprichardson/electron-mocha/pull/22

0.6.0 / 2015-11-05
------------------
- add support for mocha opts: See: https://github.com/jprichardson/electron-mocha/pull/21

0.5.1 / 2015-10-30
------------------
- bugfix: expose `mocha` to `window` as Mocha does. See: https://github.com/jprichardson/electron-mocha/pull/20

0.5.0 / 2015-10-21
------------------
- end Electron with proper exit code now. See: https://github.com/jprichardson/electron-mocha/pull/17

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


[#70]: https://github.com/jprichardson/electron-mocha/pull/70      "Add debugger support"
[#63]: https://github.com/jprichardson/electron-mocha/pull/63      "Remove Electron 0.x API calls / checks"
[#62]: https://github.com/jprichardson/electron-mocha/pull/62      "Exits via app.exit()"
[#61]: https://github.com/jprichardson/electron-mocha/issues/61    "npm test on windows"
[#60]: https://github.com/jprichardson/electron-mocha/pull/60      "Fix exit code"
[#59]: https://github.com/jprichardson/electron-mocha/issues/59    "Integration with Karma"
[#58]: https://github.com/jprichardson/electron-mocha/pull/58      "Handle --compiler before --require options"
[#57]: https://github.com/jprichardson/electron-mocha/issues/57    "Unexpected token import"
[#56]: https://github.com/jprichardson/electron-mocha/pull/56      "window must be destroyed before electron exit"
[#55]: https://github.com/jprichardson/electron-mocha/pull/55      "Fallback to local install of electron-prebuilt"
[#54]: https://github.com/jprichardson/electron-mocha/pull/54      "Add tests for mocha.opts, --require, and --preload"
[#53]: https://github.com/jprichardson/electron-mocha/pull/53      "Add option to preload script tags"
[#52]: https://github.com/jprichardson/electron-mocha/pull/52      "Add arbitrary scripts to renderer html page with --scripts option"
[#51]: https://github.com/jprichardson/electron-mocha/issues/51    "Electron 0.37.4 -- Renderer hangs"
[#50]: https://github.com/jprichardson/electron-mocha/pull/50      "Suppress 0.37+ deprecation warnings"
[#49]: https://github.com/jprichardson/electron-mocha/issues/49    "Deleting temp data directory is causing errors in windows"
[#48]: https://github.com/jprichardson/electron-mocha/pull/48      "addressing intellij and tee console issue"
[#47]: https://github.com/jprichardson/electron-mocha/issues/47    "No console output on Windows"
[#46]: https://github.com/jprichardson/electron-mocha/issues/46    "npm install fails with npm@3.3.6 and node@5.0.0"
[#45]: https://github.com/jprichardson/electron-mocha/pull/45      "Generate index.html for renderer tests, and pass relative paths to sc…"
[#44]: https://github.com/jprichardson/electron-mocha/issues/44    "Usage with Istanbul"
[#43]: https://github.com/jprichardson/electron-mocha/issues/43    "Add feature to test AMD modules using mocha"
[#42]: https://github.com/jprichardson/electron-mocha/pull/42      "Add LICENSE file"
[#41]: https://github.com/jprichardson/electron-mocha/issues/41    "This is really cool tool! I like it .... and just let you know that the LICENSE file is missing :-)"
[#40]: https://github.com/jprichardson/electron-mocha/pull/40      "Forward to main process.stdout not console.log"
[#39]: https://github.com/jprichardson/electron-mocha/issues/39    "process.stdout"
[#38]: https://github.com/jprichardson/electron-mocha/pull/38      "Electron demo app + tests (for main and renderer)"
[#37]: https://github.com/jprichardson/electron-mocha/issues/37    "Intermittent rmdir errors"
[#36]: https://github.com/jprichardson/electron-mocha/pull/36      "Add Travis instructions to README"
[#35]: https://github.com/jprichardson/electron-mocha/issues/35    "Examples of tests written to leverage electron-mocha"
[#34]: https://github.com/jprichardson/electron-mocha/issues/34    "Modify README with Travis Instructions"
[#33]: https://github.com/jprichardson/electron-mocha/pull/33      "Add -r/--require support for renderer tests"
[#32]: https://github.com/jprichardson/electron-mocha/pull/32      "Fix ipc require in renderer"
[#31]: https://github.com/jprichardson/electron-mocha/pull/31      "Update electron-window"
[#30]: https://github.com/jprichardson/electron-mocha/issues/30    "remove preferGlobal"
[#29]: https://github.com/jprichardson/electron-mocha/pull/29      "Cleaner require statements"
[#28]: https://github.com/jprichardson/electron-mocha/issues/28    "ELIFECYCLE with v0.35.2 on Travis CI"
[#27]: https://github.com/jprichardson/electron-mocha/pull/27      "Require ipcRenderer instead of ipcMain in the rendered context "
[#26]: https://github.com/jprichardson/electron-mocha/pull/26      "Misc things + squash deprecation warning"
[#25]: https://github.com/jprichardson/electron-mocha/pull/25      "Add error reporting"
[#24]: https://github.com/jprichardson/electron-mocha/pull/24      "Squash deprecation warning for electron 0.35.0"
[#23]: https://github.com/jprichardson/electron-mocha/issues/23    "test 3 fails on OS X "
[#22]: https://github.com/jprichardson/electron-mocha/pull/22      "Fixed exit status on running command"
[#21]: https://github.com/jprichardson/electron-mocha/pull/21      "Add support for mocha.opts"
[#20]: https://github.com/jprichardson/electron-mocha/pull/20      "Expose mocha to window in renderer context"
[#19]: https://github.com/jprichardson/electron-mocha/issues/19    "electron-mocha and istanbul/isparta"
[#18]: https://github.com/jprichardson/electron-mocha/pull/18      "Support `-w, --watch` and `--watch-extensions` args"
[#17]: https://github.com/jprichardson/electron-mocha/pull/17      "End electron with correct exit code"
[#16]: https://github.com/jprichardson/electron-mocha/pull/16      "Support `--compilers` arg"
[#15]: https://github.com/jprichardson/electron-mocha/issues/15    "Support for --compilers js:babel/register"
[#14]: https://github.com/jprichardson/electron-mocha/issues/14    "Add option to show browser window and report there?"
[#13]: https://github.com/jprichardson/electron-mocha/issues/13    "--require option not apply to renderer process"
[#12]: https://github.com/jprichardson/electron-mocha/issues/12    "README clairifcation: jsdom as prerequisite for testing renderer?"
[#11]: https://github.com/jprichardson/electron-mocha/issues/11    "Cannot run in cygwin on Windows?"
[#10]: https://github.com/jprichardson/electron-mocha/issues/10    "Is there a way to run electron-mocha part of gulp build?"
[#9]: https://github.com/jprichardson/electron-mocha/pull/9        "Coffeescript support"
[#8]: https://github.com/jprichardson/electron-mocha/pull/8        "Prevent error 'Incorrect value for stdio stream: inherit' by using di…"
[#7]: https://github.com/jprichardson/electron-mocha/pull/7        "Don’t check in node_modules"
[#6]: https://github.com/jprichardson/electron-mocha/pull/6        "Fix socket errors"
[#5]: https://github.com/jprichardson/electron-mocha/pull/5        "Fix exit code"
[#4]: https://github.com/jprichardson/electron-mocha/issues/4      "allow local installs of electron-prebuilt"
[#3]: https://github.com/jprichardson/electron-mocha/issues/3      "Renderer test hang indefinitely"
[#2]: https://github.com/jprichardson/electron-mocha/issues/2      "Get this working in Travis-CI"
[#1]: https://github.com/jprichardson/electron-mocha/issues/1      "Set exit code (dependent upon Electron fix)"
