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

<!--- addressing intellij and tee console issue -->
[#48]: https://github.com/jprichardson/electron-mocha/pull/48
<!--- No console output on Windows -->
[#47]: https://github.com/jprichardson/electron-mocha/issues/47
<!--- npm install fails with npm@3.3.6 and node@5.0.0 -->
[#46]: https://github.com/jprichardson/electron-mocha/issues/46
<!--- Generate index.html for renderer tests, and pass relative paths to sc… -->
[#45]: https://github.com/jprichardson/electron-mocha/pull/45
<!--- Usage with Istanbul -->
[#44]: https://github.com/jprichardson/electron-mocha/issues/44
<!--- Add feature to test AMD modules using mocha -->
[#43]: https://github.com/jprichardson/electron-mocha/issues/43
<!--- Add LICENSE file -->
[#42]: https://github.com/jprichardson/electron-mocha/pull/42
<!--- This is really cool tool! I like it .... and just let you know that the LICENSE file is missing :-) -->
[#41]: https://github.com/jprichardson/electron-mocha/issues/41
<!--- Forward to main process.stdout not console.log -->
[#40]: https://github.com/jprichardson/electron-mocha/pull/40
<!--- process.stdout -->
[#39]: https://github.com/jprichardson/electron-mocha/issues/39
<!--- Electron demo app + tests (for main and renderer) -->
[#38]: https://github.com/jprichardson/electron-mocha/pull/38
<!--- Intermittent rmdir errors -->
[#37]: https://github.com/jprichardson/electron-mocha/issues/37
<!--- Add Travis instructions to README -->
[#36]: https://github.com/jprichardson/electron-mocha/pull/36
<!--- Examples of tests written to leverage electron-mocha -->
[#35]: https://github.com/jprichardson/electron-mocha/issues/35
<!--- Modify README with Travis Instructions -->
[#34]: https://github.com/jprichardson/electron-mocha/issues/34
<!--- Add -r/--require support for renderer tests -->
[#33]: https://github.com/jprichardson/electron-mocha/pull/33
<!--- Fix ipc require in renderer -->
[#32]: https://github.com/jprichardson/electron-mocha/pull/32
<!--- Update electron-window -->
[#31]: https://github.com/jprichardson/electron-mocha/pull/31
<!--- remove preferGlobal -->
[#30]: https://github.com/jprichardson/electron-mocha/issues/30
<!--- Cleaner require statements -->
[#29]: https://github.com/jprichardson/electron-mocha/pull/29
<!--- ELIFECYCLE with v0.35.2 on Travis CI -->
[#28]: https://github.com/jprichardson/electron-mocha/issues/28
<!--- Require ipcRenderer instead of ipcMain in the rendered context  -->
[#27]: https://github.com/jprichardson/electron-mocha/pull/27
<!--- Misc things + squash deprecation warning -->
[#26]: https://github.com/jprichardson/electron-mocha/pull/26
<!--- Add error reporting -->
[#25]: https://github.com/jprichardson/electron-mocha/pull/25
<!--- Squash deprecation warning for electron 0.35.0 -->
[#24]: https://github.com/jprichardson/electron-mocha/pull/24
<!--- test 3 fails on OS X  -->
[#23]: https://github.com/jprichardson/electron-mocha/issues/23
<!--- Fixed exit status on running command -->
[#22]: https://github.com/jprichardson/electron-mocha/pull/22
<!--- Add support for mocha.opts -->
[#21]: https://github.com/jprichardson/electron-mocha/pull/21
<!--- Expose mocha to window in renderer context -->
[#20]: https://github.com/jprichardson/electron-mocha/pull/20
<!--- electron-mocha and istanbul/isparta -->
[#19]: https://github.com/jprichardson/electron-mocha/issues/19
<!--- Support `-w, --watch` and `--watch-extensions` args -->
[#18]: https://github.com/jprichardson/electron-mocha/pull/18
<!--- End electron with correct exit code -->
[#17]: https://github.com/jprichardson/electron-mocha/pull/17
<!--- Support `--compilers` arg -->
[#16]: https://github.com/jprichardson/electron-mocha/pull/16
<!--- Support for --compilers js:babel/register -->
[#15]: https://github.com/jprichardson/electron-mocha/issues/15
<!--- Add option to show browser window and report there? -->
[#14]: https://github.com/jprichardson/electron-mocha/issues/14
<!--- --require option not apply to renderer process -->
[#13]: https://github.com/jprichardson/electron-mocha/issues/13
<!--- README clairifcation: jsdom as prerequisite for testing renderer? -->
[#12]: https://github.com/jprichardson/electron-mocha/issues/12
<!--- Cannot run in cygwin on Windows? -->
[#11]: https://github.com/jprichardson/electron-mocha/issues/11
<!--- Is there a way to run electron-mocha part of gulp build? -->
[#10]: https://github.com/jprichardson/electron-mocha/issues/10
<!--- Coffeescript support -->
[#9]: https://github.com/jprichardson/electron-mocha/pull/9
<!--- Prevent error 'Incorrect value for stdio stream: inherit' by using di… -->
[#8]: https://github.com/jprichardson/electron-mocha/pull/8
<!--- Don’t check in node_modules -->
[#7]: https://github.com/jprichardson/electron-mocha/pull/7
<!--- Fix socket errors -->
[#6]: https://github.com/jprichardson/electron-mocha/pull/6
<!--- Fix exit code -->
[#5]: https://github.com/jprichardson/electron-mocha/pull/5
<!--- allow local installs of electron-prebuilt -->
[#4]: https://github.com/jprichardson/electron-mocha/issues/4
<!--- Renderer test hang indefinitely -->
[#3]: https://github.com/jprichardson/electron-mocha/issues/3
<!--- Get this working in Travis-CI -->
[#2]: https://github.com/jprichardson/electron-mocha/issues/2
<!--- Set exit code (dependent upon Electron fix) -->
[#1]: https://github.com/jprichardson/electron-mocha/issues/1
