const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const render = async (filename) => {
  const filePath = path.join(process.cwd(), filename);

  const dom = await JSDOM.fromFile(filePath, {
    runScripts: "dangerously",
    resources: "usable",
  });

  // Despite using await, JSDOM.fromFile() will resovle w/o waiting for the
  // embedded JS script to run. In order to make sure render doesn't return
  // anything until both the DOM has been loaded and the JS script run,
  // we return a Promise with the DOM info after all content has been loaded
  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener("DOMContentLoaded", () => {
      resolve(dom);
    });
  });
};

module.exports = render;
