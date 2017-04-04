# Electron Testrunner

**Quick hack**

Simple testrunner with browser environment. This recursively traverses(cycle-safe) all exported functions, and runs those called `TEST_*`. The exit code then depends on whether any of the functions threw an error. It also works for asynchrous tests, i.e. it waits for promises.

It depends on `xvfb-run` being installed, as it executes via electron, and is intended to run on travis-ci.

```shell
npm install --save-dev electron@1.6.3 electron-testrunner
node_modules/.bin/electron-testrunner file1ToTest.js file2ToTest.js
```

To run with `npm run test`, just add
```json
{
  "scripts": {
     "test": "electron-testrunner filename.js"
  },
  "devDependencies": {
      "electron-testrunner": "^0.1.0",
  }
}
```
to `package.json`.


