const {
  concat,
  join,
  line,
  ifBreak,
  group,
  hardline,
} = require("prettier").doc.builders;

function forDebug(path, print) {
  const node = path.getValue();

  return node.value; //concat(path.map(print, "value"));
}

function builderFunction(path, print) {
  const node = path.getValue();

  return group(
    concat([
      path.call(print, "kind"),
      path.call(print, "id"),
      path.call(print, "arguments"),
      hardline,
      path.call(print, "block"),
      path.call(print, "endFunction"),
      hardline,
    ])
  );
}

function builderMain(path, print) {
  const node = path.getValue();

  return group(
    concat([
      path.call(print, "id"),
      path.call(print, "arguments"),
      hardline,
      path.call(print, "block"),
      path.call(print, "endFunction"),
      hardline,
    ])
  );
}

function buildComment(path, print) {
  const node = path.getValue();

  return node.value;
}

function buildCommand(path, print) {
  const node = path.getValue();

  return concat(path.map(print));
}

function buildBlock(path, print) {
  const node = path.getValue();

  return concat(path.map(print, "value"));
}

let _bracketBefore = ["(", "[", "{", "}", "]", ")"];
let _bracketAfter = ["(", "[", "{", "}", "]", ")"];

function buildOperator(open, path, close) {
  let value = path.getValue();

  return open + value + close;
}

let _builderMap;

function builderMap(options) {
  const map = {};

  if (options.keywordsCase === "upper") {
    map.keyword = (path) => {
      let value = typeof path === "string" ? path : path.getValue();
      if (value.value) {
        value = value.value;
      }
      return value.toUpperCase();
    };
  } else if (options.keywordsCase === "lower") {
    map.keyword = (path) => {
      let value = typeof path === "string" ? path : path.getValue();
      if (value.value) {
        value = value.value;
      }
      return value.toLowerCase();
    };
  } else {
    map.keyword = (path) => {
      let value = typeof path === "string" ? path : path.getValue();
      if (value.value) {
        value = value.value;
      }
      return value;
    };
  }

  map.program = (path, print) => concat(path.map(print, "value"));
  map.main = (path, print) => builderMain(path, print);
  map.function = (path, print) => builderFunction(path, print);
  map.comment = (path, print) => buildComment(path, print);
  map.command = (path, print) => buildCommand(path, print);
  map.block = (path, print) => buildBlock(path, print);
  map.bracket = options.bracketSpacing
    ? (path) => buildOperator(" ", path, " ")
    : (path) => buildOperator("", path, "");
  map.operator = options.bracketSpacing
    ? (path) => buildOperator(" ", path, " ")
    : (path) => buildOperator("", path, "");

  return map;
}

function resetFunctionMap() {
  _builderMap = undefined;
}

function printElement(path, options, print) {
  if (!_builderMap) {
    _builderMap = builderMap(options);
  }

  const node = path.getValue();

  if (!node) {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return concat(path.map(print)); /*print*/
  }

  const buildProcess = _builderMap[node.kind];
  if (buildProcess) {
    return buildProcess(path, print);
  }

  return undefined; //"< no build process >" + node.kind;
}

module.exports = { printElement, resetFunctionMap };
