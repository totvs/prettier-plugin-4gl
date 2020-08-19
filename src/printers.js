const {
  doc: {
    builders: { concat, group },
  },
} = require("prettier");

function printJSON(path, options, print, args) {
  const node = path.getValue();

  return JSON.stringify(node, undefined, 2);
}

function keywordsCase(keywordsCase, node) {
  return keywordsCase === "upper"
    ? node.getValue().toUpperCase()
    : keywordsCase === "lower"
    ? node.getValue().toLowerCase()
    : node.getValue();
}

function printFunction(path, options, print) {
  const node = path.getValue();
  const value = node.value;

  return group(
    concat([
      node.kind,
      value.id,
      "(",
      JSON.stringify(value.arguments),
      ")",
      // indent(
      //   concat([
      //     line,
      //     join(
      //       concat([",", line]),
      //       path.map(print, "elements")
      //     )
      //   ])
      // ),
      // line,
      // "]"
    ])
  );
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

  let result;

  switch (node.kind) {
    case "keyword":
      result = keywordsCase(options.keywordsCase, node);
      break;
    case "program":
      result = concat(path.map(print, "value"));
      break;
    case "function":
      result = printFunction(path, options, print);
      break;
    default:
      result = JSON.stringify(node, undefined, 3);
  }

  return result;
}

module.exports = { printJSON, printSource };
