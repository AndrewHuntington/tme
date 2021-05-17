#!/usr/bin/env node

const Runner = require("./runner");
const runner = new Runner();

// A helper function to wrap the 'await' due to Node not having the ability
// to support top-level await statements. May no longer be necessary.
const run = async () => {
  await runner.collectFiles(process.cwd());

  console.log(runner.testFiles);
};

run();
