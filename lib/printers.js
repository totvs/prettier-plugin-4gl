const {
  doc: {
    builders: { concat },
  },
} = require("prettier");

function printJSON(path, options, print, args) {
  const node = path.getValue();

  return JSON.stringify(node);
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
    return concat(path.map(print));
  }

  // switch (node.type) {
  //   case "ws":
  //   case "nl":
  //     return node.value;
  //   case "keyword":
  //     return node.value.toLowerCase();
  //   case "word":
  //     return node.value.toUpperCase();
  //   case "operator":
  //     return node.value;
  //   case "string":
  //     return node.value;
  //   default:
  //     //throw new Error("unknown 4GL type: " + JSON.stringify(node));
  // }

  return JSON.stringify(node, null, 2);
}

module.exports = { printJSON: printJSON, printSource: printSource };
