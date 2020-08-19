const {
  doc: {
    builders: { concat },
  },
} = require("prettier");

function printJSON(path, options, print, args) {
  const node = path.getValue();

  return JSON.stringify(node, undefined, 2);
}

function keywordsCase(keywordsCase, node) {
  return keywordsCase === "upper"
    ? node.value.toUpperCase()
    : keywordsCase === "lower"
    ? node.value.toLowerCase()
    : node.value;
}

function printSource(path, options, print, args) {
  const node = path.getValue();

  if (!node) {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return concat(path.map(node));
  }

  switch (node.kind) {
    case "keyword":
      return keywordsCase(options.keywordsCase, node);
    default:
      return node.value;
  }
  //   case "ws":
  //   case "nl":
  //     return node.value;
  //   case "word":
  //     return node.value.toUpperCase();
  //   case "operator":
  //     return node.value;
  //   case "string":
  //     return node.value;

  return "";
}

function genericPrint(path, options, print) {
  const node = path.getValue();

  if (!node) {
    return "";
  } else if (typeof node === "string") {
    return node;
  }
}

module.exports = { printJSON: printJSON, printSource: printSource };