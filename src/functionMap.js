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

const options4GLDef = require("./config").options;
const options4GL = {};
const OPERATORS_WHITOUT_SPACING = ["."];

function buildComment(path, print) {
  const node = path.getValue();

  return path.call(print, "value");
}

function buildWhitespace(path, print, { tabWidth, useTabs }) {
  const node = path.getValue();
  let value = node.value;

  if (useTabs) {
    value = value.replace(" ".repeat(tabWidth), "\t");
  } else {
    value = value.replace(/\\t/g, " ".repeat(tabWidth));
  }

  return concat(value);
}

function buildBlock(path, print) {
  const node = path.getValue();
  const value = path.map(print, "value");

  return indent(concat(value));
}

function buildCommand(path, print) {
  const node = path.getValue();

  return concat(path.map(print, "value"));
}

function buildKeyword(path, print, keywordsCase) {
  const node = path.getValue();
  let value = node.value;

  if (keywordsCase === "upper") {
    value = value.toUpperCase();
  } else if (keywordsCase === "lower") {
    value = value.toLowerCase();
  }

  return value;
}

function buildString(path, print, stringOption) {
  const node = path.getValue();
  const value = node.value.value[1];
  let result = undefined;

  if (stringOption === "none") {
    result = node.value.value.join("");
  } else if (stringOption === "single-quotes") {
    result = util.makeString(value, "'", true);
  } else {
    //double-quotes
    result = util.makeString(value, '"', true);
  }

  return result;
}

function buildIdentifier(path, print) {
  const node = path.getValue();

  return path.call(print, "value");
}

function buildBracket(path, print, bracketSpacing) {
  const node = path.getValue();
  const value = node.value;
  let result = value;

  if (bracketSpacing) {
    result = concat([" ", value, " "]);
  }

  return result;
}

function buildOperator(path, print, operatorSpacing) {
  const node = path.getValue();
  const value = node.value;
  let result = value;

  if (operatorSpacing && !OPERATORS_WHITOUT_SPACING.includes(value)) {
    result = concat([" ", value, " "]);
  }

  return result;
}

function buildList(path, print, operatorSpacing) {
  const node = path.getValue();
  const values = path.map(print, "value");

  if (operatorSpacing) {
    result = join(", ", values);
  } else {
    result = join(",", values);
  }

  return result;
}

function buildNumber(path, print, formatNumber) {
  const node = path.getValue();
  const value = node.value;
  let result = value.value;

  if (formatNumber) {
    result = result.toLocaleString("en");
  } else {
    result = result.toString();
  }

  return result;
}

function buildVariable(path, print, formatNumber) {
  const node = path.getValue();

  return path.call(print, "value");
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
  map.global = (path, print) => concat(path.map(print, "value"));
  map.main = (path, print) => concat(path.map(print, "value"));
  map.function = (path, print) => concat(path.map(print, "value"));
  map.keyword = (path, print) =>
    buildKeyword(path, print, options4GL.keywordsCase);
  map.comment = (path, print) => buildComment(path, print, options4GL);
  map.whitespace = (path, print) =>
    buildWhitespace(path, print, {
      tabWidth: options.tabWidth,
      useTabs: options.useTabs,
    });
  map.block = (path, print) => buildBlock(path, print);
  map.command = (path, print) => buildCommand(path, print);
  map.string = (path, print) =>
    buildString(path, print, options4GL.stringStyle);
  map.identifier = (path, print) => buildIdentifier(path, print);
  map.bracket = (path, print) =>
    buildBracket(path, print, options.bracketSpacing);
  map.number = (path, print) => buildNumber(path, print, options.formatNumber);
  map.variable = (path, print) =>
    buildVariable(path, print, options.formatNumber);
  map.operator = (path, print) =>
    buildOperator(path, print, options.operatorSpacing);
  map.list = (path, print) => buildList(path, print, options.operatorSpacing);

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
    concat(`< no build process [${node.kind}]>`);
  }

  return result;
}

module.exports = { printElement, resetFunctionMap };
