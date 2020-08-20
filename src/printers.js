const {
  doc: {
    builders: { concat, group },
  },
} = require("prettier");

const printElement = require("./functionMap").printElement;

function printJSON(path, options, print, args) {
  const node = path.getValue();

  return JSON.stringify(node, undefined, 2);
}

function printSource(path, options, print, args) {
  let result = printElement(path, options, print);

  if (!result) {
    const node = path.getValue();
    result = JSON.stringify(node, undefined, 3);
  }

  return result;
}

module.exports = { printJSON, printSource };
