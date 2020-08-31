const { util } = require("prettier");

const {
  concat,
  join,
  line,
  ifBreak,
  group,
  hardline,
  fill,
  indent,
  trim,
} = require("prettier").doc.builders;

const { stripTrailingHardline, removeLines } = require("prettier").doc.utils;

const options4GLDef = require("./config").options;
const options4GL = {};
const OPERATORS_WHITOUT_SPACING = ["."];

function buildWhitespace(path, print, { tabWidth, useTabs }) {
  const node = path.getValue();
  let value = node.value;

  if (useTabs) {
    value = value.replace(" ".repeat(tabWidth), "\t");
  } else {
    value = value.replace(/\\t/g, " ".repeat(tabWidth));
  }

  value = stripTrailingHardline(concat(value));

  return value;
}

function buildBlock(path, print) {
  const node = path.getValue();
  const value = path.map(print, "value");
  const values = concat(value);

  return indent(values);
}

function buildCommand(path, print) {
  const node = path.getValue();
  const values = path.map(print, "value");

  return concat(values);
}

function buildKeyword(path, print, keywordsCase) {
  const node = path.getValue();
  let value = node.value;

  if (keywordsCase === "upper") {
    1;
    value = value.toUpperCase();
  } else if (keywordsCase === "lower") {
    value = value.toLowerCase();
  }

  return value;
}

function buildString(path, print, stringOption) {
  const node = path.getValue();
  const value = node.value;
  let result = undefined;

  if (stringOption === "none") {
    result = value.toString();
  } else if (stringOption === "single-quotes") {
    result = util.makeString(value.substring(1, value.length -1), "'", true);
  } else {
    //double-quotes
    result = util.makeString(value.substring(1, value.length -1), "\"", true);
  }

  return result;
}

function buildBracket(path, print, bracketSpacing) {
  const node = path.getValue();
  const value = node.value;
  let result = value;

  // if (bracketSpacing) {
  //   result = concat([" ", value, " "]);
  // }

  return result;
}

function buildOperator(path, print, operatorSpacing) {
  const node = path.getValue();
  const value = node.value;
  let result = value;

  // if (operatorSpacing && !OPERATORS_WHITOUT_SPACING.includes(value)) {
  //   result = concat([" ", value, " "]);
  // }

  return result;
}

function buildNumber(path, print, formatNumber) {
  const node = path.getValue();
  const value = node.value;
  let result = undefined;

  if (formatNumber) {
    result = value.toLocaleString("en");
  } else {
    result = value.toString();
  }

  return result;
}

let _builderMap;

function builderMap(options) {
  const map = {};

  Object.keys(options4GLDef).forEach((key) => {
    if (options[key]) {
      options4GL[key] = options[key];
    }
  });

  map.program = (path, print) => concat(path.map(print, "value"));
  map.globals = (path, print) => concat(path.map(print, "value"));
  map.main = (path, print) => concat(path.map(print, "value"));
  map.function = (path, print) => concat(path.map(print, "value"));
  map.comment = (path, print) => concat(path.map(print, "value"));
  map.whitespace = (path, print) =>
    buildWhitespace(path, print, {
      tabWidth: options.tabWidth,
      useTabs: options.useTabs,
    });
  map.keyword = (path, print) =>
    buildKeyword(path, print, options4GL.keywordsCase);
  map.block = (path, print) => buildBlock(path, print);
  map.command = (path, print) => buildCommand(path, print);
  map.string = (path, print) =>
    buildString(path, print, options4GL.stringStyle);
  map.identifier = (path, print) => path.call(print, "value");
  map.bracket = (path, print) =>
    buildBracket(path, print, options.bracketSpacing);
  map.number = (path, print) => buildNumber(path, print, options.formatNumber);
  map.variable = (path, print) => path.call(print, "value");
  map.operator = (path, print) =>
    buildOperator(path, print, options.operatorSpacing);
  map.list = (path, print) => join(", ", path.map(print, "value"));

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
  const buildProcess = _builderMap[node.kind];
  let result;

  if (buildProcess) {
    result = buildProcess(path, print, options);
  } else {
    result = concat(`< no build process [${node.kind}]>`);
  }

  return result;
}

module.exports = { printElement, resetFunctionMap };
