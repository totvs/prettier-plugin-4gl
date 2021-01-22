//import { util } from "prettier";
//const { printDocToDebug } = require("prettier").doc.debug;

import { util } from "prettier";

const {
  concat,
  join,
  line,
  ifBreak,
  group,
  hardline,
  softline,
  fill,
  indent,
  dedent,
  trim,
} = require("prettier").doc.builders;

const { stripTrailingHardline, removeLines } = require("prettier").doc.utils;

function buildWhitespace(path, print, { tabWidth, useTabs }) {
  const node = path.getValue();
  let value = node.value;

  if (value.startsWith("\n")) {
    value = softline;
  } else if (useTabs) {
    value = value.replace(" ".repeat(tabWidth), "\t");
  } else {
    value = value.replace(/\\t/g, " ".repeat(tabWidth));
  }

  return value;
}

function buildIdentifier(path, print, options) {
  const node = path.getValue();
  let value = node.value;

  return value;
}

function buildKeyword(path, print, options) {
  const node = path.getValue();
  let value = node.value;

  if (options.keywordsCase === "upper") {
    value = value.toUpperCase();
  } else if (options.keywordsCase === "lower") {
    value = value.toLowerCase();
  }

  return value;
}

function buildBeginBlock(path, print, options) {
  //return buildKeyword(path, print, options);
  return concat(buildKeyword(path, print, options), indent(), "XXXXXXXXXX>>>>");
}

function buildEndBlock(path, print, options) {
  //return buildKeyword(path, print, options);
  return concat(dedent(), "<<<<XXXXXXXXXX", buildKeyword(path, print, options));
}

function buildString(path, print, options) {
  const node = path.getValue();
  const value = node.value;
  let result = undefined;

  if (options.stringOption === "ignore") {
    result = value.toString();
  } else if (options.stringOption === "single-quotes") {
    result = util.makeString(value.substring(1, value.length - 1), "'", true);
  } else {
    //double-quotes
    result = util.makeString(value.substring(1, value.length - 1), '"', true);
  }

  return result;
}

function buildOperator(path, print, options) {
  const node = path.getValue();
  const value = node.value;
  let result = value;
  //options.operatorSpacing
  return result;
}

function buildOpenOperator(path, print, options) {
  return buildOperator(path, print, options);
}

function buildCloseOperator(path, print, options) {
  return buildOperator(path, print, options);
}

function buildNumber(path, print, options) {
  const node = path.getValue();
  const value = node.value;
  let result = undefined;

  if (options.formatNumber) {
    result = value.toLocaleString("en");
  } else {
    result = value.toString();
  }

  return result;
}

let _builderMap;

function builderMap(_options) {
  const options = _options;
  const map: {} = {};
  const options4GLDef: {} = require("./config").options;

  Object.keys(options4GLDef).forEach((key) => {
    if (options[key] == undefined) {
      options[key] = options4GLDef[key];
    }
  });

  map["string"] = (path, print) => buildString(path, print, options);
  map["whitespace"] = (path, print) => buildWhitespace(path, print, options);
  map["identifier"] = (path, print) => buildIdentifier(path, print, options);
  map["keyword"] = (path, print) => buildKeyword(path, print, options);
  map["beginBlock"] = (path, print) => buildBeginBlock(path, print, options);
  map["endBlock"] = (path, print) => buildEndBlock(path, print, options);
  map["number"] = (path, print) => buildNumber(path, print, options);
  map["operator"] = (path, print) => buildOperator(path, print, options);
  map["openOperator"] = (path, print) => buildOpenOperator(path, print, options);
  map["closeOperator"] = (path, print) => buildCloseOperator(path, print, options);
  map["comment"] = (path, print) => concat(path.map(print, "value"));

  // map.block = (path, print) => buildBlock(path, print, options);
  // map.bracket = (path, print) => buildBracket(path, print, options);
  // map.command = (path, print) => buildCommand(path, print, options);
  // map.double_operator = (path, print) => buildOperator(path, print, options);
  // map.function = (path, print) => buildFunction(path, print, options);
  // map.globals = (path, print) => concat(path.map(print, "value"));
  // map.list = (path, print) => join(", ", path.map(print, "value"));
  // map.main = (path, print) => buildFunction(path, print, options);
  // map.open_operator = (path, print) => buildOperator(path, print, options);
  // map.operator = (path, print) => buildOperator(path, print, options);
  // map.program = (path, print) => concat(path.map(print, "value"));
  // map.variable = (path, print) => path.call(print, "value");
  // map.constant = (path, print) => path.map(print, "value");
  // map.expression = (path, print) => path.map(print, "value");

  return map;
}

function resetFunctionMap() {
  _builderMap = undefined;
}

export function printElement(path, options, print) {
  if (!_builderMap) {
    _builderMap = builderMap(options);
  }

  const node = path.getValue();
  const builder = _builderMap[node.kind];
  let result: any = undefined;

  if (builder) {
    console.log(node.kind);
    result = builder(path, print, options);
  }

  return result;
}

module.exports = { printElement, resetFunctionMap };
