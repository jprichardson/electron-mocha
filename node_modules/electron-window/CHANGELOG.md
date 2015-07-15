0.5.0 / 2015-07-15
------------------
- upgraed to `is-electron-renderer@2.0` (Electron removed `global` for non-node integration)

0.4.3 / 2015-07-13
------------------
- regression: `showUrl()` without window arguments wouldn't actually show window

0.4.2 / 2015-07-10
------------------
- made callback optional in `showUrl()`

0.4.1 / 2015-07-10
------------------
- bug fix: wrong `this context`

0.4.0 / 2015-07-09
------------------
- Removed passing defaults of `resizable: false` and `frame: true`.
- refactored, added tests

0.3.0 / 2015-05-27
------------------
- `showUrl()`: actually display window when contents loaded

0.2.1 / 2015-05-22
------------------
- fixed package.json main path bug

0.2.0 / 2015-05-22
------------------
- changed so `window.__args__` would be available right away
- changed examples
- exposed `parseArgs()` for renderer scripts

0.1.1 / 2015-05-22
------------------
- fix `package.json` Github repo

0.1.0 / 2015-05-22
------------------
- initial release
