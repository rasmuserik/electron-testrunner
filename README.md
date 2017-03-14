# Electron Testrunner

**Quick hack**

```shell
npm install --save-dev electron@1.6.3 electron-testrunner
ELECTRON_ENABLE_LOGGING=1 ./node_modules/.bin/electron node_modules/electron-testrunner/ index.js
```

Recursively executes all exported functions called `TEST_*`, and returns with the correct exit code, depending on whether they threw an error. It also waits for promises.
