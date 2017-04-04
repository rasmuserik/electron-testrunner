(async function() {
  let remote = require('electron').remote;
  let argv = remote.process.argv;
  let filenames = argv.slice(2);
  let tests = [];

  for(let filename of filenames) {
    if(filename[0] !== '/') {
      filename = remote.process.cwd() + '/' + filename;
    }
    console.log('loading file: ' + filename);
    let module = require(filename);

    let visited = new Map();

    traverse(module);
    function traverse(o) {
      if(visited.get(o)) {
        return;
      }
      visited.set(o, true);

      var keys = Object.getOwnPropertyNames(o);
      keys.forEach(key => {
        traverse(o[key]);
        if(key.startsWith('TEST_')) {
          tests.push({
            name: key,
            fn: o[key]
          });
        }
      });
    }
  }

  console.log('tests: ' + tests.map(o => o.name).join(' '));
  let ok = true;
  for(let i = 0; i < tests.length; ++i) {
    let test = tests[i];
    console.log('Running ' + test.name);
    try {
      await Promise.resolve(test.fn);
      console.log(test.name + ' ok.');
    } catch (e) {
      console.log(e);
      console.log(test.name + ' error: ' + e.toString());
    }
  }
  remote.process.exit(ok ? 0 : 1);
})();
